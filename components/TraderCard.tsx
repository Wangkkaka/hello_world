import Link from 'next/link';
import { ArrowRight, TrendingUp, Calendar, Coins } from 'lucide-react';
import { Trader } from '@/lib/types';

interface TraderCardProps {
  trader: Trader;
}

export default function TraderCard({ trader }: TraderCardProps) {
  return (
    <Link href={`/trader/${trader.id}`}>
      <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-red-500">
        {/* 头部 */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-red-500 transition-colors">
              {trader.name}
            </h2>
            <p className="text-red-500 font-medium text-lg">{trader.nickname}</p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-red-500 transition-colors group-hover:translate-x-1" />
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trader.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {trader.tags.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{trader.tags.length - 4}
            </span>
          )}
        </div>

        {/* 关键信息 */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 text-red-400" />
            <span className="text-sm">{trader.era}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Coins className="h-4 w-4 text-red-400" />
            <span className="text-sm font-semibold text-green-600">{trader.capital}</span>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <TrendingUp className="h-4 w-4 text-red-400 mt-0.5" />
            <p className="text-sm line-clamp-2">{trader.background}</p>
          </div>
        </div>

        {/* 心法预览 */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">💡 核心心法</div>
          <div className="space-y-2">
            {trader.strategies.slice(0, 2).map((strategy, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <p className="text-sm text-gray-600 line-clamp-1">{strategy.title}</p>
              </div>
            ))}
            {trader.strategies.length > 2 && (
              <p className="text-xs text-gray-400">
                ...还有 {trader.strategies.length - 2} 条心法
              </p>
            )}
          </div>
        </div>

        {/* 经典语录预览 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 italic line-clamp-2">
            "{trader.quotes[0]}"
          </p>
        </div>
      </div>
    </Link>
  );
}