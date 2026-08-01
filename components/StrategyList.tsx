import { Strategy } from '@/lib/types';
import { Lightbulb, CheckCircle } from 'lucide-react';

interface StrategyListProps {
  strategies: Strategy[];
}

export default function StrategyList({ strategies }: StrategyListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        <h3 className="text-2xl font-bold text-gray-900">交易心法</h3>
      </div>

      {strategies.map((strategy, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow"
        >
          <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-red-500">{index + 1}.</span>
            {strategy.title}
          </h4>
          <p className="text-gray-600 leading-relaxed mb-4">{strategy.description}</p>

          {strategy.examples && strategy.examples.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-gray-700">实战要点</span>
              </div>
              <ul className="space-y-2">
                {strategy.examples.map((example, exampleIndex) => (
                  <li key={exampleIndex} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-400 mt-1.5">•</span>
                    <span className="text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}