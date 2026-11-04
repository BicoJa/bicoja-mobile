// ============================================
// CONFIGURAÇÃO DA API
// ============================================

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim();

if (!API_URL) {
  throw new Error('Configure EXPO_PUBLIC_API_URL no arquivo .env');
}


// ============================================
// TIPOS E STATUS
// ============================================

export type StatusVaga = 'ABERTA' | 'ENCERRADA' | 'CANCELADA';

export type StatusCandidatura =
  | 'PENDENTE'
  | 'ACEITA'
  | 'RECUSADA'
  | 'CANCELADA';

export type StatusContratacao =
  | 'AGUARDANDO_ACEITE'
  | 'ACEITA'
  | 'RECUSADA';

export type VagaRequestDTO = Record<string, unknown>;

export type AtualizarStatusVagaDTO = Record<string, unknown>;

export type CandidaturaResponseDTO = {
  id: number;
  idVaga: number;
  idProfissional: number;
  nomeProfissional: string;
  avaliacao: number | null;
  status: StatusCandidatura;
};

export type ContratacaoResponseDTO = {
  id: number;
  idVaga: number;
  tituloVaga: string;
  nomeContratante: string;
  telefoneContratante: string;
  idProfissional: number;
  nomeProfissional: string;
  status: StatusContratacao;
  dataContratacao: string;
};

export type AvaliacaoProfissionalRequestDTO = {
  nota: number;
  comentario?: string;
};

export type AvaliacaoProfissionalResponseDTO = {
  id: number;
  idContratacao: number;
  idAvaliador: number;
  nomeAvaliador: string;
  idProfissional: number;
  nomeProfissional: string;
  nota: number;
  comentario: string | null;
};


// ============================================
// FUNÇÃO CENTRAL DE REQUISIÇÕES
// ============================================

async function requestJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...init?.headers,
      },
    }
  );

  if (!response.ok) {
    const mensagem = await response.text();

    throw new Error(
      mensagem || `Erro na API: HTTP ${response.status}`
    );
  }

  if (
    response.status === 204 ||
    response.status === 205
  ) {
    return undefined as T;
  }

  const texto = await response.text();

  if (!texto) {
    return undefined as T;
  }

  return JSON.parse(texto) as T;
}


// ============================================
// VAGAS
// ============================================

// Criar vaga
export function criarVaga(
  dados: VagaRequestDTO
): Promise<void> {
  return requestJson<void>('/vaga', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}


// Buscar vagas por profissional
export function buscarVagasPorProfissional(
  idUsuario: number
): Promise<any[]> {
  return requestJson<any[]>(
    `/vaga/profissional/${idUsuario}`
  );
}


// Buscar vagas por contratante
export function buscarVagasPorContratante(
  idUsuario: number,
  status: StatusVaga
): Promise<any[]> {

  const params = new URLSearchParams({
    status,
  });

  return requestJson<any[]>(
    `/vaga/contratante/${idUsuario}?${params.toString()}`
  );
}


// Atualizar status da vaga
export function atualizarStatusVaga(
  id: number,
  dados: AtualizarStatusVagaDTO
): Promise<void> {
  return requestJson<void>(`/vaga/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(dados),
  });
}


// ============================================
// CANDIDATURAS
// ============================================

// Criar candidatura
export function criarCandidatura(
  idVaga: number,
  idUsuario: number
): Promise<CandidaturaResponseDTO> {

  const params = new URLSearchParams({
    idVaga: String(idVaga),
    idUsuario: String(idUsuario),
  });

  return requestJson<CandidaturaResponseDTO>(
    `/candidatura?${params.toString()}`,
    {
      method: 'POST',
    }
  );
}


// Listar candidaturas de um profissional
export function listarCandidaturasPorProfissional(
  idUsuario: number
): Promise<CandidaturaResponseDTO[]> {

  return requestJson<CandidaturaResponseDTO[]>(
    `/candidatura/profissional/${idUsuario}`
  );
}


// Listar profissionais de uma vaga
export function listarCandidaturasPorVaga(
  idVaga: number
): Promise<CandidaturaResponseDTO[]> {

  return requestJson<CandidaturaResponseDTO[]>(
    `/candidatura/vaga/${idVaga}`
  );
}


// Atualizar status da candidatura
export function atualizarStatusCandidatura(
  id: number,
  idUsuario: number,
  status: StatusCandidatura
): Promise<CandidaturaResponseDTO> {

  return requestJson<CandidaturaResponseDTO>(
    `/candidatura/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        idUsuario,
        status,
      }),
    }
  );
}


// Listar candidaturas de profissional por status
export function listarCandidaturasPorProfissionalEStatus(
  idUsuario: number,
  status: StatusCandidatura
): Promise<CandidaturaResponseDTO[]> {

  const params = new URLSearchParams({
    status,
  });

  return requestJson<CandidaturaResponseDTO[]>(
    `/candidatura/profissional/${idUsuario}/status?${params.toString()}`
  );
}


// Listar candidaturas de vaga por status
export function listarCandidaturasPorVagaEStatus(
  idVaga: number,
  status: StatusCandidatura
): Promise<CandidaturaResponseDTO[]> {

  const params = new URLSearchParams({
    status,
  });

  return requestJson<CandidaturaResponseDTO[]>(
    `/candidatura/vaga/${idVaga}/status?${params.toString()}`
  );
}


// Cancelar candidatura
export function cancelarCandidatura(
  id: number,
  idUsuario: number
): Promise<CandidaturaResponseDTO> {

  const params = new URLSearchParams({
    idUsuario: String(idUsuario),
  });

  return requestJson<CandidaturaResponseDTO>(
    `/candidatura/${id}/cancelar?${params.toString()}`,
    {
      method: 'PATCH',
    }
  );
}


// ============================================
// CONTRATAÇÕES
// ============================================

// Listar contratações de um profissional
export function listarContratacoesPorProfissional(
  idUsuario: number
): Promise<ContratacaoResponseDTO[]> {

  return requestJson<ContratacaoResponseDTO[]>(
    `/contratacao/profissional/${idUsuario}`
  );
}


// Consultar contratação específica
export function buscarContratacaoPorId(
  id: number,
  idUsuario: number
): Promise<ContratacaoResponseDTO> {

  const params = new URLSearchParams({
    idUsuario: String(idUsuario),
  });

  return requestJson<ContratacaoResponseDTO>(
    `/contratacao/${id}?${params.toString()}`
  );
}


// Aceitar ou recusar contratação
export function atualizarStatusContratacao(
  id: number,
  idUsuario: number,
  status: StatusContratacao
): Promise<ContratacaoResponseDTO> {

  const params = new URLSearchParams({
    idUsuario: String(idUsuario),
    status,
  });

  return requestJson<ContratacaoResponseDTO>(
    `/contratacao/${id}/status?${params.toString()}`,
    {
      method: 'PATCH',
    }
  );
}


// Listar contratações por status
export function listarContratacoesPorStatus(
  idUsuario: number,
  status: StatusContratacao
): Promise<ContratacaoResponseDTO[]> {

  const params = new URLSearchParams({
    status,
  });

  return requestJson<ContratacaoResponseDTO[]>(
    `/contratacao/profissional/${idUsuario}/status?${params.toString()}`
  );
}


// ============================================
// AVALIAÇÃO PROFISSIONAL
// ============================================

// Avaliar profissional
export function avaliarProfissional(
  idContratacao: number,
  idUsuario: number,
  dados: AvaliacaoProfissionalRequestDTO
): Promise<AvaliacaoProfissionalResponseDTO> {

  const params = new URLSearchParams({
    idUsuario: String(idUsuario),
  });

  return requestJson<AvaliacaoProfissionalResponseDTO>(
    `/avaliacao-profissional/${idContratacao}?${params.toString()}`,
    {
      method: 'POST',
      body: JSON.stringify(dados),
    }
  );
}