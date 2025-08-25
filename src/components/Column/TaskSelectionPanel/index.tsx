import React from 'react';
import styles from './index.module.scss';

interface TaskSelectionPanelProps {
  selectedCount: number;
  onMarkComplete: (completed: boolean) => void;
  onDelete: () => void;
  onClearSelection: () => void;
}

const TaskSelectionPanel: React.FC<TaskSelectionPanelProps> = ({
  selectedCount,
  onMarkComplete,
  onDelete,
  onClearSelection
}) => {
  return (
    <div className={styles.columnSelectionPanel}>
      <div className={styles.selectionInfo}>
        <span className={styles.selectedCount}>
          {selectedCount} task{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>
      <div className={styles.selectionActions}>
        <button
          onClick={() => onMarkComplete(true)}
          className={styles.btnAction}
          title="Mark selected tasks as completed"
        >
          ✅ Mark Done
        </button>
        <button
          onClick={() => onMarkComplete(false)}
          className={styles.btnAction}
          title="Mark selected tasks as not completed"
        >
          ⏳ Mark Todo
        </button>
        <button
          onClick={onDelete}
          className={`${styles.btnAction} ${styles.btnDelete}`}
          title="Delete selected tasks"
        >
          🗑️ Delete
        </button>
        <button
          onClick={onClearSelection}
          className={styles.btnAction}
          title="Clear selection"
        >
          ✖️ Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskSelectionPanel;
