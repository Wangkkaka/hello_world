// 游资相关类型定义

export interface Strategy {
  title: string;
  description: string;
  examples?: string[];
}

export interface Trader {
  id: string;
  name: string;
  nickname: string;
  avatar?: string;
  era: string;
  capital: string;
  background: string;
  story: string;
  strategies: Strategy[];
  quotes: string[];
  tags: string[];
}