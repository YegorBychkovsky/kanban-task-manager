import React from 'react';
import styles from './index.module.scss';

interface SortSelectorProps {
  sortBy: 'none' | 'status' | 'title' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'none' | 'status' | 'title' | 'createdAt') => void;
  onOrderChange: (sortOrder: 'asc' | 'desc') => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  onOrderChange
}) => {
  return (
    <div className={styles.sortSelector}>
      <div className={styles.sortType}>
        <label htmlFor="sortType">Sort by:</label>
        <select
          id="sortType"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'none' | 'status' | 'title' | 'createdAt')}
          className={styles.sortSelect}
        >
          <option value="none">No sorting</option>
          <option value="status">By status</option>
          <option value="title">By title</option>
          <option value="createdAt">By creation date</option>
        </select>
      </div>
      
      {sortBy !== 'none' && (
        <div className={styles.sortOrder}>
          <button
            type="button"
            onClick={() => onOrderChange('asc')}
            className={`${styles.orderBtn} ${sortOrder === 'asc' ? styles.active : ''}`}
            title="Ascending order"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onOrderChange('desc')}
            className={`${styles.orderBtn} ${sortOrder === 'desc' ? styles.active : ''}`}
            title="Descending order"
          >
            ↓
          </button>
        </div>
      )}
    </div>
  );
};

export default SortSelector;
