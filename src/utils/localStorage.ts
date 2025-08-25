import type { AppState } from '../types';
import { createDefaultState } from './stateManagement';

export const loadStateFromStorage = (): AppState => {
  console.log('🔄 Starting to load data from localStorage...');
  
  try {
    const savedState = localStorage.getItem('todoAppState');
    console.log('📦 Raw localStorage data:', savedState);
    
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      console.log('🔍 Parsed state:', parsedState);
      
      if (parsedState && parsedState.columns && Array.isArray(parsedState.columns) && parsedState.columns.length > 0) {
        const stateWithDates = {
          columns: parsedState.columns.map((column: any, index: number) => {
            const validTasks = Array.isArray(column.tasks) ? column.tasks.filter((task: any) => 
              task && task.id && task.title && typeof task.title === 'string'
            ).map((task: any, taskIndex: number) => ({
              ...task,
              createdAt: new Date(task.createdAt),
              order: task.order || taskIndex,
              completed: Boolean(task.completed),
              title: String(task.title || ''),
              description: task.description ? String(task.description) : undefined
            })) : [];
            
            return {
              ...column,
              createdAt: new Date(column.createdAt),
              order: column.order || index,
              tasks: validTasks,
              selectedTasks: new Set<string>(),
              isSelectionMode: false,
              sortBy: column.sortBy || 'none',
              sortOrder: column.sortOrder || 'asc'
            };
          })
        };
        
        console.log('✅ Final state with dates:', stateWithDates);
        console.log('📊 Tasks loaded:', stateWithDates.columns.reduce((total: number, col: any) => total + col.tasks.length, 0));
        stateWithDates.columns.forEach((col: any, idx: number) => {
          console.log(`📋 Column ${idx + 1} (${col.title}):`, col.tasks.length, 'tasks');
        });
        
        console.log('✅ Data loaded from localStorage successfully');
        return stateWithDates;
      } else {
        console.log('⚠️ Invalid data structure, creating default state');
        return createDefaultState();
      }
    } else {
      console.log('ℹ️ No saved data found, creating default state');
      return createDefaultState();
    }
  } catch (error) {
    console.error('❌ Error loading from localStorage:', error);
    console.log('🔄 Creating default state due to error');
    return createDefaultState();
  }
};

export const saveStateToStorage = (appState: AppState): void => {
  try {
    const dataToSave = JSON.stringify(appState);
    localStorage.setItem('todoAppState', dataToSave);
    console.log('💾 Saving to localStorage:', dataToSave);
    console.log('✅ Data saved to localStorage successfully');
  } catch (error) {
    console.error('❌ Error saving to localStorage:', error);
  }
};
