export interface HistoryItem {
  id: string;
  userId: string;
  type: 'generate' | 'scan';
  content: string;
  timestamp: number;
  settings?: {
    fgColor: string;
    bgColor: string;
    size: number;
    level: string;
  };
}

export function saveHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>) {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  };
  history.unshift(newItem);
  localStorage.setItem('qr_history', JSON.stringify(history));
  return newItem;
}

export function getHistory(): HistoryItem[] {
  const stored = localStorage.getItem('qr_history');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getUserHistory(userId: string): HistoryItem[] {
  return getHistory().filter((item) => item.userId === userId);
}

export function deleteHistoryItem(id: string) {
  const history = getHistory();
  const filtered = history.filter((item) => item.id !== id);
  localStorage.setItem('qr_history', JSON.stringify(filtered));
}