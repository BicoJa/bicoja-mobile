export type JobCategory =
  | 'Pedreiro'
  | 'Encanador'
  | 'Eletricista'
  | 'Gesseiro'
  | 'Ajudante'
  | 'Pintor';

export type Job = {
  id: string;
  title: string;
  category: JobCategory;
  contractor: string;
  location: string;
  distance: string;
  schedule: string;
  description: string;
  benefits: string[];
  requirements?: string[];
  tools?: string[];
  postedAt: string;
  imageUrl: string;
};
