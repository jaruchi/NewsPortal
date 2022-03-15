export interface News {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url?: string;
  category?: string;
  language?: string;
  country: string;
}

export interface TopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: News[];
}

export interface SourcesResponse {
  status: string;
  sources: Source[];
}
