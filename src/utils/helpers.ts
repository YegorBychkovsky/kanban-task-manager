export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Функция для нечеткого поиска (fuzzy search)
export const fuzzySearch = (text: string, query: string): boolean => {
  if (!query.trim()) return true;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  // Точное совпадение
  if (lowerText.includes(lowerQuery)) return true;
  
  // Поиск по словам (разбиваем на слова)
  const textWords = lowerText.split(/\s+/);
  const queryWords = lowerQuery.split(/\s+/);
  
  // Проверяем, содержатся ли все слова запроса в тексте
  const allWordsFound = queryWords.every(queryWord => 
    textWords.some(textWord => textWord.includes(queryWord))
  );
  
  if (allWordsFound) return true;
  
  // Нечеткий поиск с допущением ошибок
  return fuzzyMatch(lowerText, lowerQuery);
};

// Алгоритм нечеткого поиска с допущением ошибок
const fuzzyMatch = (text: string, query: string): boolean => {
  if (query.length === 0) return true;
  if (query.length > text.length) return false;
  
  let queryIndex = 0;
  let textIndex = 0;
  let errors = 0;
  const maxErrors = Math.floor(query.length * 0.3); // Допускаем 30% ошибок
  
  while (queryIndex < query.length && textIndex < text.length) {
    if (query[queryIndex] === text[textIndex]) {
      queryIndex++;
      textIndex++;
    } else {
      // Пропускаем символ в тексте (опечатка)
      textIndex++;
      errors++;
      
      if (errors > maxErrors) return false;
    }
  }
  
  return queryIndex === query.length;
};

// Функция для расчета релевантности результата поиска
export const calculateRelevance = (text: string, query: string): number => {
  if (!query.trim()) return 0;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  let score = 0;
  
  // Точное совпадение - высший балл
  if (lowerText.includes(lowerQuery)) {
    score += 100;
  }
  
  // Поиск по словам
  const textWords = lowerText.split(/\s+/);
  const queryWords = lowerQuery.split(/\s+/);
  
  // Каждое найденное слово добавляет баллы
  queryWords.forEach(queryWord => {
    if (textWords.some(textWord => textWord.includes(queryWord))) {
      score += 50;
    }
  });
  
  // Бонус за начало слова
  queryWords.forEach(queryWord => {
    if (textWords.some(textWord => textWord.startsWith(queryWord))) {
      score += 25;
    }
  });
  
  // Бонус за близость слов
  if (queryWords.length > 1) {
    const queryWordPositions = queryWords.map(queryWord => {
      const pos = textWords.findIndex(textWord => textWord.includes(queryWord));
      return pos >= 0 ? pos : -1;
    }).filter(pos => pos >= 0);
    
    if (queryWordPositions.length > 1) {
      const distance = Math.max(...queryWordPositions) - Math.min(...queryWordPositions);
      score += Math.max(0, 20 - distance);
    }
  }
  
  return score;
};

// Функция для нормализации текста для поиска
export const normalizeTextForSearch = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Убираем диакритические знаки
    .replace(/[^\w\s]/g, ' ') // Заменяем спецсимволы на пробелы
    .replace(/\s+/g, ' ') // Убираем лишние пробелы
    .trim();
};
