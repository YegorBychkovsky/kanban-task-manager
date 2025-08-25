import { useState, useEffect } from 'react';
import type { AppState, Column, Task } from '../types';
import { loadStateFromStorage, saveStateToStorage } from '../utils/localStorage';
import * as stateManagement from '../utils/stateManagement';

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>({ columns: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      const loadedState = loadStateFromStorage();
      setAppState(loadedState);
      setIsLoading(false);
    };

    loadState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveStateToStorage(appState);
    }
  }, [appState, isLoading]);

  const addColumn = (title: string) => {
    setAppState(prev => stateManagement.addColumn(prev, title));
  };

  const updateColumn = (columnId: string, updates: Partial<Column>) => {
    setAppState(prev => stateManagement.updateColumn(prev, columnId, updates));
  };

  const deleteColumn = (columnId: string) => {
    setAppState(prev => stateManagement.deleteColumn(prev, columnId));
  };

  const addTask = (columnId: string, task: Task) => {
    setAppState(prev => stateManagement.addTask(prev, columnId, task));
  };

  const updateTask = (columnId: string, taskId: string, updates: Partial<Task>) => {
    setAppState(prev => stateManagement.updateTask(prev, columnId, taskId, updates));
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setAppState(prev => stateManagement.deleteTask(prev, columnId, taskId));
  };

  const toggleTaskComplete = (columnId: string, taskId: string) => {
    setAppState(prev => stateManagement.toggleTaskComplete(prev, columnId, taskId));
  };

  const moveTaskBetweenColumns = (taskId: string, fromColumnId: string, toColumnId: string) => {
    setAppState(prev => stateManagement.moveTaskBetweenColumns(prev, taskId, fromColumnId, toColumnId));
  };

  const reorderTasksInColumn = (columnId: string, activeTaskId: string, overTaskId: string) => {
    setAppState(prev => stateManagement.reorderTasksInColumn(prev, columnId, activeTaskId, overTaskId));
  };

  const reorderColumns = (activeColumnId: string, overColumnId: string) => {
    setAppState(prev => stateManagement.reorderColumns(prev, activeColumnId, overColumnId));
  };

  return {
    appState,
    isLoading,
    addColumn,
    updateColumn,
    deleteColumn,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    moveTaskBetweenColumns,
    reorderTasksInColumn,
    reorderColumns,
  };
};
