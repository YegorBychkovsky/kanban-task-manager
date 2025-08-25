import React, { useState } from 'react';
import styles from './index.module.scss';
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCenter,
  type DragEndEvent, type DragOverEvent, type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import AppHeader from './AppHeader';
import SearchSection from './SearchSection';
import ColumnsContainer from './ColumnsContainer';
import AddColumnModal from './AddColumnModal';
import EmptyState from './EmptyState';
import DragOverlayComponent from './DragOverlay';

import { useAppState } from '../../hooks/useAppState';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { prepareColumnsForSearch } from '../../utils/search';

const TodoApp: React.FC = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    appState,
    isLoading,
    addColumn: addColumnToState,
    updateColumn,
    deleteColumn,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    moveTaskBetweenColumns,
  } = useAppState();

  const {
    activeDragItem,
    dragOverColumnId,
    isDraggingColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop(moveTaskBetweenColumns);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumnToState(newColumnTitle);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  const handleCancelAddColumn = () => {
    setNewColumnTitle('');
    setIsAddingColumn(false);
  };

  const handleDragStartEvent = (event: DragStartEvent) => {
    handleDragStart(event.active);
  };

  const handleDragOverEvent = (event: DragOverEvent) => {
    handleDragOver(event.active, event.over);
  };

  const handleDragEndEvent = (event: DragEndEvent) => {
    handleDragEnd(event.active, event.over);
  };

  const sortedColumns = [...appState.columns].sort((a, b) => (a.order || 0) - (b.order || 0));
  const columnsWithSortedTasks = prepareColumnsForSearch(sortedColumns, searchQuery);

  if (isLoading) {
    return (
      <div className={styles.todoApp}>
        <div className={styles.loading}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStartEvent}
      onDragOver={handleDragOverEvent}
      onDragEnd={handleDragEndEvent}
    >
      <div className={styles.todoApp}>
        <AppHeader />

        <main>
          <SearchSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery('')}
            searchResultsCount={columnsWithSortedTasks.reduce((total, col) => total + col.tasks.length, 0)}
            columnsCount={columnsWithSortedTasks.length}
          />
          
          <SortableContext
            items={columnsWithSortedTasks.map(col => ({ id: col.id, type: 'column' }))}
            strategy={horizontalListSortingStrategy}
          >
            <ColumnsContainer
              columns={columnsWithSortedTasks}
              isDraggingColumn={isDraggingColumn}
              onUpdateColumn={updateColumn}
              onDeleteColumn={deleteColumn}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleTaskComplete={toggleTaskComplete}
              dragOverColumnId={dragOverColumnId}
              searchQuery={searchQuery}
              onAddColumn={() => setIsAddingColumn(true)}
            />
          </SortableContext>
        </main>

        <AddColumnModal
          isVisible={isAddingColumn}
          columnTitle={newColumnTitle}
          onTitleChange={setNewColumnTitle}
          onAddColumn={handleAddColumn}
          onCancel={handleCancelAddColumn}
        />

        {appState.columns.length === 0 && (
          <EmptyState onAddColumn={() => setIsAddingColumn(true)} />
        )}
      </div>

      <DragOverlay>
        <DragOverlayComponent activeDragItem={activeDragItem} />
      </DragOverlay>
    </DndContext>
  );
};

export default TodoApp;
