import type { AppState, Column, Task } from '../types';
import { generateId } from './helpers';

export const createDefaultState = (): AppState => {
  const defaultColumn: Column = {
    id: generateId(),
    title: 'To Do',
    tasks: [],
    createdAt: new Date(),
    order: 0,
    selectedTasks: new Set<string>(),
    isSelectionMode: false,
    sortBy: 'none',
    sortOrder: 'asc'
  };
  
  return { 
    columns: [defaultColumn]
  };
};

export const addColumn = (prevState: AppState, title: string): AppState => {
  const newColumn: Column = {
    id: generateId(),
    title: title.trim(),
    tasks: [],
    createdAt: new Date(),
    order: prevState.columns.length,
    selectedTasks: new Set<string>(),
    isSelectionMode: false,
    sortBy: 'none',
    sortOrder: 'asc'
  };
  
  return {
    ...prevState,
    columns: [...prevState.columns, newColumn]
  };
};

export const updateColumn = (prevState: AppState, columnId: string, updates: Partial<Column>): AppState => {
  return {
    ...prevState,
    columns: prevState.columns.map(column =>
      column.id === columnId ? { ...column, ...updates } : column
    )
  };
};

export const deleteColumn = (prevState: AppState, columnId: string): AppState => {
  return {
    ...prevState,
    columns: prevState.columns.filter(column => column.id !== columnId)
  };
};

export const addTask = (prevState: AppState, columnId: string, task: Task): AppState => {
  const column = prevState.columns.find(col => col.id === columnId);
  const newTask = {
    ...task,
    order: column ? column.tasks.length : 0
  };
  
  return {
    ...prevState,
    columns: prevState.columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    )
  };
};

export const updateTask = (prevState: AppState, columnId: string, taskId: string, updates: Partial<Task>): AppState => {
  return {
    ...prevState,
    columns: prevState.columns.map(column =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map(task =>
              task.id === taskId ? { ...task, ...updates } : task
            )
          }
        : column
    )
  };
};

export const deleteTask = (prevState: AppState, columnId: string, taskId: string): AppState => {
  return {
    ...prevState,
    columns: prevState.columns.map(column =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
          }
        : column
    )
  };
};

export const toggleTaskComplete = (prevState: AppState, columnId: string, taskId: string): AppState => {
  return {
    ...prevState,
    columns: prevState.columns.map(column =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : column
    )
  };
};

export const moveTaskBetweenColumns = (prevState: AppState, taskId: string, fromColumnId: string, toColumnId: string): AppState => {
  if (fromColumnId === toColumnId) return prevState;

  const fromColumn = prevState.columns.find(col => col.id === fromColumnId);
  const toColumn = prevState.columns.find(col => col.id === toColumnId);
  
  if (!fromColumn || !toColumn) return prevState;

  const taskToMove = fromColumn.tasks.find(task => task.id === taskId);
  if (!taskToMove) return prevState;

  const updatedFromColumn = {
    ...fromColumn,
    tasks: fromColumn.tasks.filter(task => task.id !== taskId)
  };

  const updatedToColumn = {
    ...toColumn,
    tasks: [...toColumn.tasks, { ...taskToMove, order: toColumn.tasks.length }]
  };

  const reorderedFromTasks = updatedFromColumn.tasks.map((task, index) => ({
    ...task,
    order: index
  }));

  return {
    ...prevState,
    columns: prevState.columns.map(col => {
      if (col.id === fromColumnId) {
        return { ...updatedFromColumn, tasks: reorderedFromTasks };
      }
      if (col.id === toColumnId) {
        return updatedToColumn;
      }
      return col;
    })
  };
};

export const reorderTasksInColumn = (prevState: AppState, columnId: string, activeTaskId: string, overTaskId: string): AppState => {
  const column = prevState.columns.find(col => col.id === columnId);
  if (!column) return prevState;

  const activeTaskIndex = column.tasks.findIndex(task => task.id === activeTaskId);
  const overTaskIndex = column.tasks.findIndex(task => task.id === overTaskId);

  if (activeTaskIndex === -1 || overTaskIndex === -1) return prevState;

  const newTasks = [...column.tasks];
  const [removed] = newTasks.splice(activeTaskIndex, 1);
  newTasks.splice(overTaskIndex, 0, removed);

  const updatedTasks = newTasks.map((task, index) => ({
    ...task,
    order: index
  }));

  return {
    ...prevState,
    columns: prevState.columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: updatedTasks }
        : col
    )
  };
};

export const reorderColumns = (prevState: AppState, activeColumnId: string, overColumnId: string): AppState => {
  const activeColumnIndex = prevState.columns.findIndex(col => col.id === activeColumnId);
  const overColumnIndex = prevState.columns.findIndex(col => col.id === overColumnId);

  if (activeColumnIndex === -1 || overColumnIndex === -1) return prevState;

  const newColumns = [...prevState.columns];
  const [removed] = newColumns.splice(activeColumnIndex, 1);
  
  let insertIndex: number;
  
  insertIndex = overColumnIndex;
  
  if (overColumnIndex === 0) {
    insertIndex = 0;
  } else if (overColumnIndex === prevState.columns.length - 1) {
    insertIndex = prevState.columns.length;
  }
  
  newColumns.splice(insertIndex, 0, removed);

  const updatedColumns = newColumns.map((col, index) => ({
    ...col,
    order: index
  }));

  return {
    ...prevState,
    columns: updatedColumns
  };
};
