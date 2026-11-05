import { Job, JobCategory } from '../types';
import {
  buscarVagasPorProfissional,
  buscarVagasPorContratante,
} from './api';

type UserRole = 'trabalhador' | 'contratante';

type VagaResponseDTO = {
  id: number;
  titulo: string;
  descricao: string;
  habilidade: string;
  endereco?: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
  };
  status: string;
  tempoPublicacao: string;
  nomeContratante: string;
  telefoneContratante: string;
  tempoEncerramento?: string;
  tempoCancelamento?: string;
};

function converterCategoria(habilidade: string): JobCategory {
  const categorias: Record<string, JobCategory> = {
    pedreiro: 'Pedreiro',
    encanador: 'Encanador',
    eletricista: 'Eletricista',
    gesseiro: 'Gesseiro',
    pintor: 'Pintor',
  };

  const categoria = categorias[habilidade.trim().toLowerCase()];

  if (!categoria) {
    throw new Error(
      `Categoria de vaga não reconhecida: ${habilidade}`,
    );
  }

  return categoria;
}

function converterVaga(vaga: VagaResponseDTO): Job {
  const endereco = vaga.endereco;

  const location = [
    endereco?.logradouro,
    endereco?.numero,
    endereco?.bairro,
    endereco?.cidade,
    endereco?.uf,
  ]
    .filter(Boolean)
    .join(', ');

  return {
    id: String(vaga.id),
    title: vaga.titulo,
    category: converterCategoria(vaga.habilidade),
    contractor: vaga.nomeContratante,
    location: location || 'Endereço não informado',
    distance: 'Não informado',
    schedule: 'Não informado',
    description: vaga.descricao,
    benefits: [],
    postedAt: vaga.tempoPublicacao || 'Data não informada',
    imageUrl: '',
  };
}

export async function getJobs(
  userId: number | null,
  role: UserRole,
): Promise<Job[]> {
  if (userId === null) {
    throw new Error('ID do usuário não informado.');
  }

  const vagas =
    role === 'trabalhador'
      ? await buscarVagasPorProfissional(userId)
      : await buscarVagasPorContratante(userId, 'ABERTA');

  return vagas.map((vaga) =>
    converterVaga(vaga as VagaResponseDTO),
  );
}