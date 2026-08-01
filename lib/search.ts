import Fuse from 'fuse.js';
import { Trader } from './types';
import traders from '@/data/traders';

// 配置 Fuse.js 搜索选项
const fuseOptions = {
  keys: [
    { name: 'name', weight: 3 },
    { name: 'nickname', weight: 2 },
    { name: 'tags', weight: 2 },
    { name: 'strategies.title', weight: 1.5 },
    { name: 'strategies.description', weight: 1 },
    { name: 'background', weight: 1 },
    { name: 'story', weight: 1 },
    { name: 'quotes', weight: 1 }
  ],
  threshold: 0.3, // 匹配阈值，越低越严格
  includeScore: true,
  minMatchCharLength: 1
};

// 创建 Fuse 实例
let fuseInstance: Fuse<Trader> | null = null;

function getFuseInstance(): Fuse<Trader> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(traders, fuseOptions);
  }
  return fuseInstance;
}

/**
 * 搜索游资
 * @param query 搜索关键词
 * @returns 匹配的游资列表
 */
export function searchTraders(query: string): Trader[] {
  if (!query.trim()) {
    return traders;
  }

  const fuse = getFuseInstance();
  const results = fuse.search(query);

  return results.map(result => result.item);
}

/**
 * 根据标签筛选游资
 * @param tag 标签
 * @returns 匹配的游资列表
 */
export function filterByTag(tag: string): Trader[] {
  if (!tag) {
    return traders;
  }

  return traders.filter(trader =>
    trader.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

/**
 * 获取所有标签
 * @returns 所有去重后的标签列表
 */
export function getAllTags(): string[] {
  const allTags = traders.flatMap(trader => trader.tags);
  return Array.from(new Set(allTags)).sort();
}

export default traders;