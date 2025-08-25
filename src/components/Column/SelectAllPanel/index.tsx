import React from 'react';
import styles from './index.module.scss';

interface SelectAllPanelProps {
  onSelectAll: () => void;
}

const SelectAllPanel: React.FC<SelectAllPanelProps> = ({ onSelectAll }) => {
  return (
    <div className={styles.selectAllPanel}>
      <button
        onClick={onSelectAll}
        className={styles.btnSelectAll}
        title="Select all tasks in this column"
      >
        ☑️ Select All Tasks
      </button>
    </div>
  );
};

export default SelectAllPanel;
