
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image?: string;
  author?: string;
  tags?: string[];
  readingTime?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}
