import { Job, JobCategory } from '../types';

declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

const DEMO_JOBS: Job[] = [
  {
    id: 'alvenaria-01',
    title: 'Pedreiro para alvenaria',
    category: 'Pedreiro',
    contractor: 'Construtora Horizonte',
    location: 'Manaíra, João Pessoa',
    distance: '1,2 km de você',
    dailyRate: 250,
    schedule: 'Seg a sex, das 7h às 17h',
    description:
      'Vaga para pedreiro com experiência em alvenaria. Obra organizada, início imediato e pagamento combinado por diária.',
    benefits: ['Almoço no local', 'Ferramentas inclusas', 'Pagamento por diária'],
    postedAt: 'Há 25 min',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'instalacao-hidraulica-02',
    title: 'Encanador',
    category: 'Encanador',
    contractor: 'Marcos Construções',
    location: 'Tambaú, João Pessoa',
    distance: '2,3 km de você',
    dailyRate: 150,
    schedule: 'Seg a sex, das 8h às 17h',
    description:
      'Serviço de instalação hidráulica em obra residencial. Procuramos profissional responsável e com experiência na função.',
    benefits: ['Material no local', 'Pagamento por diária', 'Obra residencial'],
    postedAt: 'Há 1 h',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'instalacao-eletrica-03',
    title: 'Eletricista',
    category: 'Eletricista',
    contractor: 'Equipe Nova Casa',
    location: 'Bancários, João Pessoa',
    distance: '1,9 km de você',
    dailyRate: 200,
    schedule: 'Seg a sex, horário comercial',
    description:
      'Serviço de instalação elétrica em apartamento. Buscamos profissional responsável, com experiência comprovada e disponibilidade para começar esta semana.',
    benefits: ['Ferramentas inclusas', 'Pagamento por diária', 'Obra de pequeno porte'],
    postedAt: 'Há 3 h',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80',
  },
];

const isJobCategory = (value: unknown): value is JobCategory =>
  value === 'Pedreiro' ||
  value === 'Encanador' ||
  value === 'Ajudante' ||
  value === 'Eletricista' ||
  value === 'Gesseiro' ||
  value === 'Pintor';

const isJob = (value: unknown): value is Job => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const job = value as Record<string, unknown>;
  return (
    typeof job.id === 'string' &&
    typeof job.title === 'string' &&
    isJobCategory(job.category) &&
    typeof job.contractor === 'string' &&
    typeof job.location === 'string' &&
    typeof job.distance === 'string' &&
    typeof job.dailyRate === 'number' &&
    typeof job.schedule === 'string' &&
    typeof job.description === 'string' &&
    Array.isArray(job.benefits) &&
    job.benefits.every((benefit) => typeof benefit === 'string') &&
    typeof job.postedAt === 'string' &&
    typeof job.imageUrl === 'string'
  );
};

const wait = (duration: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, duration));

export async function getJobs(): Promise<Job[]> {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (!apiBaseUrl) {
    await wait(700);
    return DEMO_JOBS;
  }

  const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/jobs`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar as vagas agora.');
  }

  const payload: unknown = await response.json();
  const jobs = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === 'object' &&
        'jobs' in payload &&
        Array.isArray(payload.jobs)
      ? payload.jobs
      : null;

  if (!jobs || !jobs.every(isJob)) {
    throw new Error('A resposta do serviço de vagas está em um formato inválido.');
  }

  return jobs;
}
