import React from 'react';
import styles from './index.module.scss';

interface AddColumnModalProps {
  isVisible: boolean;
  columnTitle: string;
  onTitleChange: (title: string) => void;
  onAddColumn: () => void;
  onCancel: () => void;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({
  isVisible,
  columnTitle,
  onTitleChange,
  onAddColumn,
  onCancel
}) => {
  if (!isVisible) return null;

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Add New Column</h3>
        <input
          type="text"
          value={columnTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className={styles.modalInput}
          placeholder="Enter column title"
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onAddColumn();
            }
          }}
        />
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={`${styles.btn} ${styles.btnSecondary}`}>
            Cancel
          </button>
          <button onClick={onAddColumn} className={`${styles.btn} ${styles.btnPrimary}`}>
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddColumnModal;
