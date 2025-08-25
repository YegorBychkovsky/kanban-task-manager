import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from '../../TaskItem';
import type { Task } from '../../../types';
import styles from './index.module.scss';

interface ColumnTasksProps {
  tasks: Task[];
  columnId: string;
  onToggleComplete: (columnId: string, taskId: string) => void;
  onDelete: (columnId: string, taskId: string) => void;
  onUpdate: (columnId: string, taskId: string, updates: Partial<Task>) => void;
  onToggleSelection: (taskId: string) => void;
  selectedTasks: Set<string>;
  searchQuery: string;
}

const ColumnTasks: React.FC<ColumnTasksProps> = ({
  tasks,
  columnId,
  onToggleComplete,
  onDelete,
  onUpdate,
  onToggleSelection,
  selectedTasks,
  searchQuery
}) => {
  return (
    <SortableContext
      items={tasks.map(task => ({ id: task.id, type: 'task' }))}
      strategy={verticalListSortingStrategy}
    >
      <div className={styles.columnTasks}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            columnId={columnId}
            onToggleComplete={(taskId: string) => onToggleComplete(columnId, taskId)}
            onDelete={(taskId: string) => onDelete(columnId, taskId)}
            onUpdate={(taskId: string, updates: Partial<Task>) => onUpdate(columnId, taskId, updates)}
            isSelected={selectedTasks.has(task.id)}
            onToggleSelection={() => onToggleSelection(task.id)}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default ColumnTasks;
