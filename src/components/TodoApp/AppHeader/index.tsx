import React from 'react';
import styles from './index.module.scss';

const AppHeader: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <h1 className={styles.appTitle}>📋 Todo List</h1>
      <p className={styles.appSubtitle}>Manage your tasks with columns</p>
    </header>
  );
};

export default AppHeader;
