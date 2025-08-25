import type { Task } from '../types';
import { fuzzySearch, calculateRelevance, normalizeTextForSearch } from './helpers';

export const filterTasksBySearch = (tasks: Task[], query: string): Task[] => {
  if (!query.trim()) return tasks;
  
  const normalizedQuery = normalizeTextForSearch(query);
  
  const matchingTasks = tasks.filter(task => {
    const titleMatch = fuzzySearch(task.title, normalizedQuery);
    const descriptionMatch = task.description ? fuzzySearch(task.description, normalizedQuery) : false;
    
    return titleMatch || descriptionMatch;
  });
  
  return matchingTasks.sort((a, b) => {
    const aScore = Math.max(
      calculateRelevance(a.title, normalizedQuery),
      a.description ? calculateRelevance(a.description, normalizedQuery) : 0
    );
    const bScore = Math.max(
      calculateRelevance(b.title, normalizedQuery),
      b.description ? calculateRelevance(b.description, normalizedQuery) : 0
    );
    
    return bScore - aScore; 
  });
};

export const hasMatchingTasks = (tasks: Task[], query: string): boolean => {
  if (!query.trim()) return true;
  
  const normalizedQuery = normalizeTextForSearch(query);
  return tasks.some(task => {
    const titleMatch = fuzzySearch(task.title, normalizedQuery);
    const descriptionMatch = task.description ? fuzzySearch(task.description, normalizedQuery) : false;
    
    return titleMatch || descriptionMatch;
  });
};

export const prepareColumnsForSearch = (columns: any[], searchQuery: string) => {
  return columns
    .filter(column => hasMatchingTasks(column.tasks, searchQuery))
    .map(column => ({
      ...column,
      tasks: filterTasksBySearch(
        [...column.tasks].sort((a: any, b: any) => (a.order || 0) - (b.order || 0)),
        searchQuery
      )
    }));
};
