import React from 'react';
import { DeleteButton } from '../../ui';
import styles from './index.module.scss';

interface ColumnHeaderProps {
  title: string;
  onEditClick: () => void;
  onDelete: () => void;
  onAddTaskClick: () => void;
  isAddingTask: boolean;
  dragHandleProps: any;
  dragHandleListeners: any;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  title,
  onEditClick,
  onDelete,
  onAddTaskClick,
  isAddingTask,
  dragHandleProps,
  dragHandleListeners
}) => {
  return (
    <div className={styles.columnHeader}>
      <div className={styles.columnTitleDisplay}>
        <div 
          className={styles.columnDragHandle}
          title="Drag to move column"
          {...dragHandleProps}
          {...dragHandleListeners}
        >
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
        
        <h3 
          className={styles.columnTitle}
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          title="Click to edit column title"
        >
          {title}
        </h3>
        
        <div className={styles.columnActions}>
          {!isAddingTask && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddTaskClick();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={styles.btnAddTaskSmall}
              title="Add new task"
            >
              + Add Task
            </button>
          )}
          <DeleteButton
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete();
            }}
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
            size="small"
            variant="danger"
            title="Delete column"
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnHeader;
