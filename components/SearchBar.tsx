'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { getAllTags } from '@/lib/search';

interface SearchBarProps {
  onSearch: (query: string) => void;
  selectedTag?: string;
  onTagSelect?: (tag: string) => void;
}

export default function SearchBar({ onSearch, selectedTag, onTagSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showTags, setShowTags] = useState(false);
  const tags = getAllTags();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    if (selectedTag) {
      onTagSelect?.('');
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (selectedTag) {
      onTagSelect?.('');
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery('');
    onSearch('');
    onTagSelect?.(tag === selectedTag ? '' : tag);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* 搜索框 */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="搜索游资姓名、心法、标签..."
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all bg-white shadow-lg"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* 标签筛选 */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setShowTags(!showTags)}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          {showTags ? '收起标签' : '按标签筛选 ▼'}
        </button>
      </div>

      {showTags && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleTagClick('')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              !selectedTag
                ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTag === tag
                  ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {selectedTag && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm">
            当前筛选: <strong>{selectedTag}</strong>
            <button
              onClick={() => handleTagClick('')}
              className="hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}