declare module 'virtual:articles' {
  export interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    series?: string;
    issue?: number;
    tags: string[];
    originalUrl?: string;
    translatedFrom?: string;
    cover?: string;
    coverAlt?: string;
    draft: boolean;
  }
  const articles: ArticleMeta[];
  export default articles;
}
