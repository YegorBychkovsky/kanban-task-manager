import React from 'react';
import type { Column } from '../../../types';
import ColumnComponent from '../../Column';
import styles from './index.module.scss';

interface ColumnsContainerProps {
  columns: Column[];
  isDraggingColumn: boolean;
  onUpdateColumn: (columnId: string, updates: Partial<Column>) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, task: any) => void;
  onUpdateTask: (columnId: string, taskId: string, updates: Partial<any>) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onToggleTaskComplete: (columnId: string, taskId: string) => void;
  dragOverColumnId: string | null;
  searchQuery: string;
  onAddColumn: () => void;
}

const ColumnsContainer: React.FC<ColumnsContainerProps> = ({
  columns,
  isDraggingColumn,
  onUpdateColumn,
  onDeleteColumn,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTaskComplete,
  dragOverColumnId,
  searchQuery,
  onAddColumn
}) => {
  return (
    <div className={`${styles.columnsContainer} ${isDraggingColumn ? styles.dragging : ''}`}>
      {columns.map(column => (
        <ColumnComponent
          key={column.id}
          column={column}
          onUpdateColumn={onUpdateColumn}
          onDeleteColumn={onDeleteColumn}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onToggleTaskComplete={onToggleTaskComplete}
          isDragOver={dragOverColumnId === column.id}
          searchQuery={searchQuery}
        />
      ))}

      <button 
        onClick={onAddColumn}
        className={styles.addColumnBtn}
        title="Add new column"
      >
        +
      </button>
    </div>
  );
};

export default ColumnsContainer;
