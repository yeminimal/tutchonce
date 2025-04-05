
export interface CareerPost {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  qualifications?: string;
  benefits?: string;
  salary?: string;
  applicationProcess?: string;
  date: string;
  status: 'active' | 'draft' | 'closed';
}

export type ViewMode = 'list' | 'editor';
