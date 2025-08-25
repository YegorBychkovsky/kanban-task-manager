import React, { useState } from 'react';
import type { Task } from '../types';
import { formatDate } from '../utils/helpers';
import { Tooltip, HighlightedText, DeleteButton } from './ui';
import styles from './TaskItem.module.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: Task;
  columnId: string;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  isSelected: boolean;
  onToggleSelection: () => void;
  searchQuery?: string;
}

  const TaskItem: React.FC<TaskItemProps> = ({
    task,
    columnId,
    onToggleComplete,
    onDelete,
    onUpdate,
    isSelected,
    onToggleSelection,
    searchQuery = ''
  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    content: '',
    position: { x: 0, y: 0 }
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      columnId: columnId,
      taskId: task.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleShowTooltip = (event: React.MouseEvent, content: string) => {
    setTooltipState({
      isVisible: true,
      content,
      position: { x: event.clientX, y: event.clientY }
    });
  };

  const handleHideTooltip = () => {
    setTooltipState(prev => ({ ...prev, isVisible: false }));
  };

  if (isEditing) {
    return (
      <div className={`${styles.taskItem} ${styles.editing}`}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className={styles.taskTitleInput}
          placeholder="Task title"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className={styles.taskDescriptionInput}
          placeholder="Task description (optional)"
          rows={2}
        />
        <div className={styles.taskActions}>
          <button onClick={handleSave} className={`${styles.btn} ${styles.btnPrimary}`}>Save</button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.btnSecondary}`}>Cancel</button>
        </div>
      </div>
    );
  }

    return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''} ${isDragging ? styles.dragging : ''}`}
    >
      {/* Drag Handle для задачи (6 точек) */}
      <div className={styles.taskDragHandle} {...attributes} {...listeners}>
        <div className={styles.dragHandleDots}>
          <div className={styles.dragHandleRow}>
            <div className={styles.dragHandleDot}></div>
            <div className={styles.dragHandleDot}></div>
            <div className={styles.dragHandleDot}></div>
          </div>
          <div className={styles.dragHandleRow}>
            <div className={styles.dragHandleDot}></div>
            <div className={styles.dragHandleDot}></div>
            <div className={styles.dragHandleDot}></div>
          </div>
        </div>
      </div>

      <div className={styles.taskHeader}>
        <div className={styles.taskHeaderTop}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelection}
            className={styles.taskCheckbox}
            title="Select task"
            onClick={(e) => e.stopPropagation()}
          />
          <h4 className={styles.taskTitle}>
            <HighlightedText 
              text={task.title} 
              query={searchQuery} 
              className={styles.taskTitleText}
            />
          </h4>
          <DeleteButton
            onClick={() => onDelete(task.id)}
            size="small"
            variant="default"
            title="Delete task"
          />
        </div>
        <div className={styles.taskHeaderBottom}>
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`${styles.taskStatusBtn} ${task.completed ? styles.done : styles.todo}`}
          >
            {task.completed ? 'DONE' : 'TO DO'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className={styles.btnEdit}
            title="Edit task"
          >
            Edit
          </button>
        </div>
      </div>
      {task.description && (
        <p 
          className={styles.taskDescription}
          onMouseEnter={(e) => handleShowTooltip(e, task.description!)}
          onMouseLeave={handleHideTooltip}
        >
          <HighlightedText 
            text={task.description} 
            query={searchQuery} 
            className={styles.taskDescriptionText}
          />
        </p>
      )}
      <div className={styles.taskFooter}>
        <small className={styles.taskDate}>{formatDate(task.createdAt)}</small>
      </div>
      
      {/* Tooltip для описания задачи */}
      <Tooltip
        content={tooltipState.content}
        isVisible={tooltipState.isVisible}
        position={tooltipState.position}
        onClose={handleHideTooltip}
      />
    </div>
  );
};

export default TaskItem;
