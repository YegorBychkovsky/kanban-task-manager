import React from 'react';

interface HighlightedTextProps {
  text: string;
  query: string;
  className?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, query, className }) => {
  if (!query.trim()) {
    return <span className={className}>{text}</span>;
  }

  
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  
  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
  
  
  if (queryWords.length === 1) {
    const regex = new RegExp(`(${queryWords[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (regex.test(part)) {
            return (
              <mark 
                key={index} 
                className="highlighted-text enhanced"
              >
                {part}
              </mark>
            );
          }
          return part;
        })}
      </span>
    );
  }
  
  
  let highlightedText = text;
  queryWords.forEach((word) => {
    if (word.length > 0) {
      const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlightedText = highlightedText.replace(regex, (match) => {
        return `<mark class="highlighted-text enhanced">${match}</mark>`;
      });
    }
  });
  
  return <span className={className} dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

export default HighlightedText;
