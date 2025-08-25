import React from 'react';
import styles from './index.module.scss';

interface ColumnTitleEditorProps {
  title: string;
  onSave: () => void;
  onCancel: () => void;
  onTitleChange: (title: string) => void;
}

const ColumnTitleEditor: React.FC<ColumnTitleEditorProps> = ({
  title,
  onSave,
  onCancel,
  onTitleChange
}) => {
  return (
    <div className={styles.columnTitleEdit}>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className={styles.columnTitleInput}
        placeholder="Column title"
        autoFocus
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <button 
        onClick={onSave} 
        className={`${styles.btn} ${styles.btnPrimary}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        ✓
      </button>
      <button 
        onClick={onCancel} 
        className={`${styles.btn} ${styles.btnSecondary}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        ✗
      </button>
    </div>
  );
};

export default ColumnTitleEditor;
