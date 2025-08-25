import React from 'react';
import styles from './index.module.scss';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  searchResultsCount: number;
  columnsCount: number;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchResultsCount,
  columnsCount
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery.trim() && (
        <div className={styles.searchResults}>
          <div className={styles.searchInfo}>
            <span className={styles.searchResultsText}>
              Found {searchResultsCount} tasks in {columnsCount} columns
            </span>
            <span className={styles.smartSearchIndicator}>
              🔍 Smart search enabled
            </span>
          </div>
          <button
            onClick={onClearSearch}
            className={styles.clearSearchBtn}
            title="Clear search"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
