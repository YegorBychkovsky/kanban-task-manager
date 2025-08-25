export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  order?: number; // Для сортировки задач
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: Date;
  order?: number; // Для сортировки колонок
  selectedTasks: Set<string>; // Выбранные задачи в этой колонке
  isSelectionMode: boolean; // Режим выбора задач в этой колонке
  sortBy: 'none' | 'status' | 'title' | 'createdAt'; // Тип сортировки
  sortOrder: 'asc' | 'desc'; // Порядок сортировки
}

export interface AppState {
  columns: Column[];
}

// Drag & Drop типы
export interface DragItem {
  id: string;
  type: 'task' | 'column';
  columnId?: string;
  taskId?: string;
}

export interface DropResult {
  active: DragItem;
  over: {
    id: string;
    type: 'task' | 'column';
    columnId?: string;
  } | null;
}
