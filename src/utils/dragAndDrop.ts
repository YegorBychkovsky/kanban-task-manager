import type { DragItem } from '../types';

export const createDragItem = (active: any): DragItem => {
  return {
    id: active.id as string,
    type: active.data.current?.type || 'task',
    columnId: active.data.current?.columnId,
    taskId: active.data.current?.taskId,
  };
};

export const handleTaskDragOver = (
  active: any, 
  over: any, 
  setDragOverColumnId: (id: string | null) => void
): void => {
  const activeType = active.data.current?.type;
  const overType = over.data.current?.type;

  if (activeType === 'task' && overType === 'column') {
    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.id;

    if (activeColumnId !== overColumnId) {
      setDragOverColumnId(overColumnId);
    }
  } else if (activeType === 'task' && overType === 'task') {
    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;
    
    if (activeColumnId !== overColumnId) {
      setDragOverColumnId(overColumnId);
    }
  } else {
    setDragOverColumnId(null);
  }
};

export const handleColumnDragOver = (
  active: any, 
  over: any, 
  setDragOverColumnId: (id: string | null) => void
): void => {
  const activeId = active.id as string;
  const overId = over.id as string;
  
  if (activeId !== overId) {
    setDragOverColumnId(overId);
  }
};

export const handleTaskDragEnd = (
  active: any,
  over: any,
  moveTaskBetweenColumns: (taskId: string, fromColumnId: string, toColumnId: string) => void
): void => {
  const activeId = active.id as string;
  const overId = over.id as string;
  const activeType = active.data.current?.type;
  const overType = over.data.current?.type;

  if (activeType === 'task' && overType === 'task') {
    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    if (activeColumnId !== overColumnId) {
      moveTaskBetweenColumns(activeId, activeColumnId!, overColumnId!);
    }
  }

  if (activeType === 'task' && overType === 'column') {
    const activeColumnId = active.data.current?.columnId;
    const overColumnId = overId;

    if (activeColumnId !== overColumnId) {
      moveTaskBetweenColumns(activeId, activeColumnId!, overColumnId!);
    }
  }
};

export const handleColumnDragEnd = (
  active: any,
  over: any
): void => {
  const activeId = active.id as string;
  const overId = over.id as string;
  const activeType = active.data.current?.type;
  const overType = over.data.current?.type;

  if (activeType === 'column' && overType === 'column' && activeId !== overId) {
    console.log('🔄 Column drag ended - reordering will be handled by the parent component');
  }
};
