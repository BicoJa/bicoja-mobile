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
  dailyRate: number;
  schedule: string;
  description: string;
  benefits: string[];
  postedAt: string;
  imageUrl: string;
};
