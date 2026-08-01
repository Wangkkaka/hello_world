'use client';

import { useState, useMemo } from 'react';
import { searchTraders, filterByTag } from '@/lib/search';
import SearchBar from '@/components/SearchBar';
import TraderCard from '@/components/TraderCard';
import { TrendingUp, Users, Lightbulb, Target } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredTraders = useMemo(() => {
    if (selectedTag) {
      return filterByTag(selectedTag);
    }
    return searchTraders(searchQuery);
  }, [searchQuery, selectedTag]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      {/* 头部 */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                A股游资传奇
              </h1>
              <p className="text-gray-600 mt-1">学习顶级游资的交易心法</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 hidden sm:flex">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                <span>{filteredTraders.length} 位游资</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 搜索区域 */}
      <div className="container mx-auto px-4 py-8">
        <SearchBar
          onSearch={setSearchQuery}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      </div>

      {/* 统计卡片 */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">10+</div>
            <div className="text-sm text-gray-500">顶级游资</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">30+</div>
            <div className="text-sm text-gray-500">交易心法</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-500">经典语录</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1000倍</div>
            <div className="text-sm text-gray-500">平均收益</div>
          </div>
        </div>
      </div>

      {/* 游资列表 */}
      <div className="container mx-auto px-4 pb-16">
        {filteredTraders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">没有找到匹配的游资</p>
            <p className="text-sm text-gray-400 mt-2">试试其他关键词或标签</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders.map(trader => (
              <TraderCard key={trader.id} trader={trader} />
            ))}
          </div>
        )}
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">
            <span className="text-red-500 font-medium">A股游资传奇</span> -
            向顶级游资学习，提升交易水平
          </p>
          <p className="text-xs text-gray-400">
            本网站仅供学习参考，不构成投资建议
          </p>
        </div>
      </footer>
    </main>
  );
}