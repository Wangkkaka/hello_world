import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Calendar, Coins, BookOpen, Quote } from 'lucide-react';
import StrategyList from '@/components/StrategyList';
import QuoteCard from '@/components/QuoteCard';
import traders from '@/data/traders';

export default async function TraderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const trader = traders.find(t => t.id === id);

  if (!trader) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      {/* 头部导航 */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            返回首页
          </Link>
        </div>
      </header>

      {/* 游资头部信息 */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{trader.name}</h1>
              <p className="text-2xl text-red-500 font-medium">{trader.nickname}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {trader.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <Calendar className="h-6 w-6 text-red-400" />
              <div>
                <p className="text-sm text-gray-500">活跃时期</p>
                <p className="font-semibold text-gray-900">{trader.era}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
              <Coins className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">资金增长</p>
                <p className="font-semibold text-green-600">{trader.capital}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-yellow-50 rounded-xl p-4">
              <TrendingUp className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">交易风格</p>
                <p className="font-semibold text-gray-900">{trader.tags.slice(0, 2).join('、')}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">背景介绍</h3>
                <p className="text-gray-600 leading-relaxed">{trader.background}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 传奇故事 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">传奇故事</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            {trader.story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 交易心法 */}
        <StrategyList strategies={trader.strategies} />

        {/* 经典语录 */}
        <div className="mt-8">
          <QuoteCard quotes={trader.quotes} />
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-8">
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
    </div>
  );
}