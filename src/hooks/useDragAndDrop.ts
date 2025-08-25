import { useState } from 'react';
import type { DragItem } from '../types';
import * as dragAndDropUtils from '../utils/dragAndDrop';

export const useDragAndDrop = (
  moveTaskBetweenColumns: (taskId: string, fromColumnId: string, toColumnId: string) => void
) => {
  const [activeDragItem, setActiveDragItem] = useState<DragItem | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const [isDraggingColumn, setIsDraggingColumn] = useState(false);

  const handleDragStart = (active: any) => {
    const dragItem = dragAndDropUtils.createDragItem(active);
    setActiveDragItem(dragItem);
    
    if (active.data.current?.type === 'column') {
      setIsDraggingColumn(true);
    }
    
    console.log('🚀 Drag started:', dragItem);
  };

  const handleDragOver = (active: any, over: any) => {
    if (!over) {
      setDragOverColumnId(null);
      return;
    }

    const activeType = active.data.current?.type;

    if (activeType === 'task') {
      dragAndDropUtils.handleTaskDragOver(active, over, setDragOverColumnId);
    } else if (activeType === 'column') {
      dragAndDropUtils.handleColumnDragOver(active, over, setDragOverColumnId);
    }
  };

  const handleDragEnd = (active: any, over: any) => {
    if (!over) {
      setActiveDragItem(null);
      setDragOverColumnId(null);
      setIsDraggingColumn(false);
      return;
    }

    const activeType = active.data.current?.type;

    if (activeType === 'task') {
      dragAndDropUtils.handleTaskDragEnd(active, over, moveTaskBetweenColumns);
    } else if (activeType === 'column') {
      dragAndDropUtils.handleColumnDragEnd(active, over);
    }

    setActiveDragItem(null);
    setDragOverColumnId(null);
    setIsDraggingColumn(false);
  };

  return {
    activeDragItem,
    dragOverColumnId,
    isDraggingColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
