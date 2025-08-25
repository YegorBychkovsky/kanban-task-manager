import React from 'react';
import type { DragItem } from '../../../types';
import styles from './index.module.scss';

interface DragOverlayProps {
  activeDragItem: DragItem | null;
}

const DragOverlay: React.FC<DragOverlayProps> = ({ activeDragItem }) => {
  if (!activeDragItem) return null;

  return (
    <div className={styles.dragOverlay}>
      {activeDragItem.type === 'task' ? (
        <div className={styles.dragTaskOverlay}>
          📝 Task
        </div>
      ) : (
        <div className={styles.dragColumnOverlay}>
          📋 Column
        </div>
      )}
    </div>
  );
};

export default DragOverlay;
