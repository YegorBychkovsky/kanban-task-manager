import React, { useState, useMemo } from 'react';
import type { Column as ColumnType, Task } from '../../types';
import { generateId } from '../../utils/helpers';
import { SortSelector } from '../ui';
import ColumnHeader from './ColumnHeader';
import ColumnTitleEditor from './ColumnTitleEditor';
import TaskSelectionPanel from './TaskSelectionPanel';
import SelectAllPanel from './SelectAllPanel';
import AddTaskForm from './AddTaskForm';
import ColumnTasks from './ColumnTasks';
import styles from './index.module.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ColumnProps {
  column: ColumnType;
  onUpdateColumn: (columnId: string, updates: Partial<ColumnType>) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, task: Task) => void;
  onUpdateTask: (columnId: string, taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onToggleTaskComplete: (columnId: string, taskId: string) => void;
  isDragOver?: boolean;
  searchQuery?: string;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onUpdateColumn,
  onDeleteColumn,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTaskComplete,
  isDragOver = false,
  searchQuery = ''
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      onUpdateColumn(column.id, { title: editTitle.trim() });
      setIsEditingTitle(false);
    }
  };

  const handleCancelTitle = () => {
    setEditTitle(column.title);
    setIsEditingTitle(false);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: generateId(),
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined,
        completed: false,
        createdAt: new Date(),
        order: column.tasks.length
      };
      onAddTask(column.id, newTask);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
    }
  };

  const handleCancelAddTask = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAddingTask(false);
  };

  const toggleTaskSelection = (taskId: string) => {
    const newSelectedTasks = new Set(column.selectedTasks);
    if (newSelectedTasks.has(taskId)) {
      newSelectedTasks.delete(taskId);
    } else {
      newSelectedTasks.add(taskId);
    }
    
    const isSelectionMode = newSelectedTasks.size > 0;
    onUpdateColumn(column.id, { selectedTasks: newSelectedTasks, isSelectionMode });
  };

  const selectAllTasksInColumn = () => {
    const allTaskIds = new Set(column.tasks.map(task => task.id));
    onUpdateColumn(column.id, { selectedTasks: allTaskIds, isSelectionMode: true });
  };

  const clearTaskSelection = () => {
    onUpdateColumn(column.id, { selectedTasks: new Set<string>(), isSelectionMode: false });
  };

  const deleteSelectedTasks = () => {
    const newTasks = column.tasks.filter(task => !column.selectedTasks.has(task.id));
    onUpdateColumn(column.id, { 
      tasks: newTasks,
      selectedTasks: new Set<string>(), 
      isSelectionMode: false 
    });
  };

  const toggleSelectedTasksCompletion = (completed: boolean) => {
    const newTasks = column.tasks.map(task => 
      column.selectedTasks.has(task.id) 
        ? { ...task, completed }
        : task
    );
    onUpdateColumn(column.id, { tasks: newTasks });
  };

  const handleSortChange = (sortBy: 'none' | 'status' | 'title' | 'createdAt') => {
    onUpdateColumn(column.id, { sortBy });
  };

  const handleOrderChange = (sortOrder: 'asc' | 'desc') => {
    onUpdateColumn(column.id, { sortOrder });
  };

  const sortedTasks = useMemo(() => {
    if (column.sortBy === 'none') {
      return column.tasks;
    }

    const sorted = [...column.tasks].sort((a, b) => {
      let comparison = 0;

      switch (column.sortBy) {
        case 'status':
          comparison = Number(a.completed) - Number(b.completed);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        default:
          return 0;
      }

      return column.sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [column.tasks, column.sortBy, column.sortOrder]);

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`${styles.column} ${isDragging ? styles.dragging : ''} ${isDragOver ? styles.dragOver : ''}`}
    >
      {isEditingTitle ? (
        <ColumnTitleEditor
          title={editTitle}
          onSave={handleSaveTitle}
          onCancel={handleCancelTitle}
          onTitleChange={setEditTitle}
        />
      ) : (
        <ColumnHeader
          title={column.title}
          onEditClick={() => setIsEditingTitle(true)}
          onDelete={() => onDeleteColumn(column.id)}
          onAddTaskClick={() => setIsAddingTask(true)}
          isAddingTask={isAddingTask}
          dragHandleProps={attributes}
          dragHandleListeners={listeners}
        />
      )}

      <SortSelector
        sortBy={column.sortBy}
        sortOrder={column.sortOrder}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />

      {column.isSelectionMode && (
        <TaskSelectionPanel
          selectedCount={column.selectedTasks.size}
          onMarkComplete={toggleSelectedTasksCompletion}
          onDelete={deleteSelectedTasks}
          onClearSelection={clearTaskSelection}
        />
      )}

      {!column.isSelectionMode && column.tasks.length > 0 && (
        <SelectAllPanel onSelectAll={selectAllTasksInColumn} />
      )}

      {isAddingTask && (
        <AddTaskForm
          title={newTaskTitle}
          description={newTaskDescription}
          onTitleChange={setNewTaskTitle}
          onDescriptionChange={setNewTaskDescription}
          onAdd={handleAddTask}
          onCancel={handleCancelAddTask}
        />
      )}

      <ColumnTasks
        tasks={sortedTasks}
        columnId={column.id}
        onToggleComplete={onToggleTaskComplete}
        onDelete={onDeleteTask}
        onUpdate={onUpdateTask}
        onToggleSelection={toggleTaskSelection}
        selectedTasks={column.selectedTasks}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Column;
