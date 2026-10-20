declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

export type AppointmentStatus = 'scheduled' | 'inProgress' | 'completed';

export type Appointment = {
  id: string;
  jobId: string;
  jobTitle: string;
  contractor: string;
  location: string;
  visitAt: string;
  status: AppointmentStatus;
};

export type ChatMessage = {
  id: string;
  jobId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export type ProfessionalProfile = {
  id: string;
  name: string;
  role: 'trabalhador' | 'contratante';
  email?: string;
  phone?: string;
  location: string;
  specialties: string[];
  serviceAreas: string[];
};

export type ProfileUpdate = Partial<
  Pick<ProfessionalProfile, 'name' | 'email' | 'phone' | 'location' | 'specialties' | 'serviceAreas'>
>;

export function isApiConfigured(): boolean {
  return Boolean(process.env.EXPO_PUBLIC_API_URL?.trim());
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (!baseUrl) {
    throw new Error('Configure EXPO_PUBLIC_API_URL para conectar ao serviço.');
  }

  const response = await fetch(
    `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`,
    {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...init?.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`A solicitação à API falhou (HTTP ${response.status}).`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function getJobsFromApi(): Promise<unknown> {
  return requestJson<unknown>('/jobs');
}

export function getAppointments(): Promise<Appointment[]> {
  return requestJson<Appointment[]>('/appointments');
}

export function getChatMessages(jobId: string): Promise<ChatMessage[]> {
  return requestJson<ChatMessage[]>(`/jobs/${encodeURIComponent(jobId)}/messages`);
}

export function sendChatMessage(jobId: string, text: string): Promise<ChatMessage> {
  const message = text.trim();
  if (!message) {
    return Promise.reject(new Error('A mensagem não pode estar vazia.'));
  }

  return requestJson<ChatMessage>(`/jobs/${encodeURIComponent(jobId)}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text: message }),
  });
}

export function getProfile(): Promise<ProfessionalProfile> {
  return requestJson<ProfessionalProfile>('/profile');
}

export function updateProfile(profile: ProfileUpdate): Promise<ProfessionalProfile> {
  return requestJson<ProfessionalProfile>('/profile', {
    method: 'PATCH',
    body: JSON.stringify(profile),
  });
}
