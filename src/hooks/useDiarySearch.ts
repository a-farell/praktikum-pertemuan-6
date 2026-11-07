import { useEffect, useMemo, useState } from 'react';
import { DiaryEntry } from '../context/DiaryContext';

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesQuery = !q || 
        entry.title.toLowerCase().includes(q) || 
        entry.preview.toLowerCase().includes(q) || 
        entry.date.toLowerCase().includes(q);
      const matchesMood = !moodFilter || entry.mood === moodFilter;
      
      return matchesQuery && matchesMood;
    });
  }, [entries, debouncedQuery, moodFilter]);

  const resetFilter = () => {
    setQuery('');
    setMoodFilter('');
  };

  return { 
    query, 
    setQuery, 
    moodFilter, 
    setMoodFilter, 
    resetFilter, 
    filteredEntries, 
    resultCount: filteredEntries.length 
  };
}