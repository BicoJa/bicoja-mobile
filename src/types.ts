export type JobCategory = 
  | 'Pedreiro'
  | 'Encanador'
  | 'Eletricista'
  | 'Gesseiro'
  | 'Ajudante'
  | 'Pintor';

export type Endereco = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type Job = {
  id: string;
  title: string;
  category: JobCategory;
  contractor: string;
  endereco: Endereco; // Substitui o antigo 'location: string'
  distance: string;
  schedule: string;
  description: string;
  benefits: string[];
  requirements?: string[];
  tools?: string[];
  postedAt: string;
  imageUrl: string;
};