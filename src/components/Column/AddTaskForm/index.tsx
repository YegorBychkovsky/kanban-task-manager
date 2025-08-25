import React from 'react';
import styles from './index.module.scss';

interface AddTaskFormProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onAdd,
  onCancel
}) => {
  return (
    <div className={styles.addTaskForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        className={styles.taskTitleInput}
        placeholder="Task title"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        className={styles.taskDescriptionInput}
        placeholder="Task description (optional)"
        rows={2}
      />
      <div className={styles.taskActions}>
        <button 
          onClick={onAdd} 
          onMouseDown={(e) => e.stopPropagation()}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Add
        </button>
        <button 
          onClick={onCancel} 
          onMouseDown={(e) => e.stopPropagation()}
          className={`${styles.btn} ${styles.btnSecondary}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
