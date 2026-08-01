import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quotes: string[];
}

export default function QuoteCard({ quotes }: QuoteCardProps) {
  return (
    <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Quote className="h-6 w-6 text-red-500" />
        <h3 className="text-2xl font-bold text-gray-900">经典语录</h3>
      </div>

      <div className="space-y-6">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
          >
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-red-200" />
            <p className="text-gray-700 leading-relaxed pl-4 italic text-lg">
              "{quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}