import React from 'react';
import styles from './index.module.scss';

interface EmptyStateProps {
  onAddColumn: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddColumn }) => {
  return (
    <div className={styles.loading}>
      <h2>Start by creating your first column</h2>
      <p>Create a column to organize your tasks</p>
      <button 
        onClick={onAddColumn}
        className={`${styles.btn} ${styles.btnPrimary}`}
      >
        Create Column
      </button>
    </div>
  );
};

export default EmptyState;
