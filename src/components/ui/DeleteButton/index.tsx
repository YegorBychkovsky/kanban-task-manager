import React from 'react';
import styles from './index.module.scss';

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'danger' | 'subtle';
  disabled?: boolean;
  title?: string;
  className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  onMouseDown,
  size = 'medium',
  variant = 'default',
  disabled = false,
  title = 'Delete',
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      onClick(e);
    }
  };

  const buttonClasses = [
    styles.deleteButton,
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      title={title}
      type="button"
    >
      <span className={styles.icon}>×</span>
    </button>
  );
};

export default DeleteButton;
