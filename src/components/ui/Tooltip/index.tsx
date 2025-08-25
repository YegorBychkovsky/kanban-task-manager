import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';


let tooltipRootUsageCount = 0;
let globalTooltipRoot: HTMLElement | null = null;

interface TooltipProps {
  content: string;
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ content, isVisible, position, onClose }) => {
  const [tooltipRoot, setTooltipRoot] = useState<HTMLElement | null>(null);
  const [isRootCreated, setIsRootCreated] = useState(false);

  useEffect(() => {
    
    if (!globalTooltipRoot) {
      globalTooltipRoot = document.createElement('div');
      globalTooltipRoot.id = 'tooltip-root';
      globalTooltipRoot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
      `;
      document.body.appendChild(globalTooltipRoot);
    }
    
    tooltipRootUsageCount++;
    setTooltipRoot(globalTooltipRoot);
    setIsRootCreated(true);

    
    return () => {
      tooltipRootUsageCount--;
      
      
      if (tooltipRootUsageCount === 0 && globalTooltipRoot && globalTooltipRoot.parentNode) {
        try {
          globalTooltipRoot.parentNode.removeChild(globalTooltipRoot);
          globalTooltipRoot = null;
          setIsRootCreated(false);
        } catch (error) {
          
          console.warn('Tooltip root cleanup warning:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !tooltipRoot || !isRootCreated) return null;

  return createPortal(
    <div
      className={styles.tooltip}
      style={{
        left: position.x + 15,
        top: position.y - 40,
      }}
      onMouseEnter={() => {
        
      }}
      onMouseLeave={() => {
        
        onClose();
      }}
    >
      <div className={styles.tooltipContent}>
        {content}
      </div>
    </div>,
    tooltipRoot
  );
};

export default Tooltip;
