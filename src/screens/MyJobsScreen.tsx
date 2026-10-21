import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/BottomNavigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { Job } from '../types';

type MyJobsScreenProps = {
  onSelectJob: (job: Job) => void;
  onOpenChat: (job: Job) => void;
  onOpenJobs: () => void;
  onOpenProfile: () => void;
};

type JobStatus = 'scheduled' | 'inProgress' | 'completed';

type MyJob = Job & {
  status: JobStatus;
  visitDate: string;
};

type TabId = 'active' | 'history';

const DEMO_JOBS: MyJob[] = [
  {
    id: 'my-job-pedreiro-manaira',
    title: 'Reparo de alvenaria',
    category: 'Pedreiro',
    contractor: 'Construtora Horizonte',
    location: 'Manaíra, João Pessoa - PB',
    distance: 'Manaíra, João Pessoa - PB',
    schedule: '22 out 2026, às 9h',
    description: 'Visita técnica para avaliação de serviço de alvenaria.',
    benefits: [],
    requirements: ['Alinhar os detalhes do serviço durante a visita técnica'],
    tools: [],
    postedAt: 'Agendamento demonstrativo',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    status: 'scheduled',
    visitDate: '22 out 2026 · 9h',
  },
  {
    id: 'my-job-encanador-tambau',
    title: 'Instalação hidráulica',
    category: 'Encanador',
    contractor: 'Marcos Construções',
    location: 'Tambaú, João Pessoa - PB',
    distance: 'Tambaú, João Pessoa - PB',
    schedule: '23 out 2026, às 14h',
    description: 'Visita técnica para avaliação de serviço de instalação hidráulica.',
    benefits: [],
    requirements: ['Alinhar os detalhes do serviço durante a visita técnica'],
    tools: [],
    postedAt: 'Agendamento demonstrativo',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
    status: 'inProgress',
    visitDate: '23 out 2026 · 14h',
  },
  {
    id: 'my-job-eletricista-bancarios',
    title: 'Revisão elétrica',
    category: 'Eletricista',
    contractor: 'Equipe Nova Casa',
    location: 'Bancários, João Pessoa - PB',
    distance: 'Bancários, João Pessoa - PB',
    schedule: '15 out 2026, às 10h',
    description: 'Visita técnica concluída para avaliação de serviço elétrico.',
    benefits: [],
    requirements: [],
    tools: [],
    postedAt: 'Agendamento demonstrativo',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80',
    status: 'completed',
    visitDate: '15 out 2026 · 10h',
  },
];

const TABS: { id: TabId; label: string }[] = [
  { id: 'active', label: 'Agendados / Em andamento' },
  { id: 'history', label: 'Histórico / Concluídos' },
];

export function MyJobsScreen({
  onSelectJob,
  onOpenChat,
  onOpenJobs,
  onOpenProfile,
}: MyJobsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [interestJob, setInterestJob] = useState<MyJob | null>(null);
  const insets = useSafeAreaInsets();
  const jobs = DEMO_JOBS.filter((job) =>
    activeTab === 'active' ? job.status !== 'completed' : job.status === 'completed',
  );

  return (
    <View style={[styles.screen, { marginTop: -insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: 24 + insets.top }]}>
          <View style={styles.headerText}>
            <Text numberOfLines={1} style={styles.eyebrow}>
              BICO JÁ
            </Text>
            <Text accessibilityRole="header" style={styles.title}>
              Meus Bicos
            </Text>
            <Text style={styles.subtitle}>
              Acompanhe suas visitas técnicas e serviços.
            </Text>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.demoNotice}>
            Agendamentos demonstrativos para acompanhar serviços na região.
          </Text>

          <View accessibilityRole="tablist" style={styles.tabs}>
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  onPress={() => setActiveTab(tab.id)}
                  style={[styles.tab, selected && styles.selectedTab]}
                >
                  <Text style={[styles.tabText, selected && styles.selectedTabText]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>
            {activeTab === 'active' ? 'Seus próximos atendimentos' : 'Atendimentos concluídos'}
          </Text>

          {jobs.map((job) => (
            <View key={job.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{job.category}</Text>
                </View>
                <Text style={styles.status}>{getStatusLabel(job.status)}</Text>
              </View>

              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.client}>Cliente: {job.contractor}</Text>
              <Text style={styles.location}>{job.location}</Text>

              <View style={styles.visitCard}>
                <Text style={styles.visitLabel}>VISITA TÉCNICA</Text>
                <Text style={styles.visitDate}>{job.visitDate}</Text>
              </View>

              <Text style={styles.quoteNotice}>
                O orçamento será definido após a visita técnica ao local.
              </Text>

              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Ver detalhes de ${job.title}`}
                  onPress={() => onSelectJob(job)}
                  style={({ pressed }) => [styles.detailsButton, pressed && styles.pressed]}
                >
                  <Text style={styles.detailsButtonText}>Ver detalhes</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir chat de texto com ${job.contractor}`}
                  onPress={() => onOpenChat(job)}
                  style={({ pressed }) => [styles.chatButton, pressed && styles.pressed]}
                >
                  <Text style={styles.chatButtonText}>Chat de texto</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Demonstrar interesse em ${job.title}`}
                  onPress={() => setInterestJob(job)}
                  style={({ pressed }) => [styles.interestButton, pressed && styles.pressed]}
                >
                  <Text style={styles.interestButtonText}>TENHO INTERESSE</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation
        active="myJobs"
        onJobsPress={onOpenJobs}
        onMyJobsPress={() => undefined}
        onProfilePress={onOpenProfile}
      />

      <Modal
        accessibilityViewIsModal
        animationType="fade"
        onRequestClose={() => setInterestJob(null)}
        transparent
        visible={interestJob !== null}
      >
        <View style={styles.modalOverlay}>
          <View accessibilityRole="alert" style={styles.modalCard}>
            <View style={styles.successMark}>
              <Text style={styles.successCheck}>✓</Text>
            </View>
            <Text accessibilityRole="header" style={styles.modalTitle}>
              Interesse registrado
            </Text>
            <Text style={styles.modalMessage}>
              Seu interesse em{' '}
              <Text style={styles.modalJobTitle}>{interestJob?.title}</Text> foi registrado nesta
              demonstração.
            </Text>
            <Text style={styles.modalNote}>
              A contratante ainda não foi notificada. O envio de candidaturas não está conectado
              ao backend.
            </Text>
            <PrimaryButton
              title="Voltar ao mural"
              onPress={() => {
                setInterestJob(null);
                onOpenJobs();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getStatusLabel(status: JobStatus) {
  switch (status) {
    case 'scheduled':
      return 'Agendado';
    case 'inProgress':
      return 'Em andamento';
    case 'completed':
      return 'Concluído';
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FF6410',
    paddingHorizontal: 20,
    paddingBottom: 23,
  },
  headerText: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  eyebrow: {
    color: '#FFF1E8',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: 5,
  },
  subtitle: {
    color: '#FFF1E8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  main: {
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  demoNotice: {
    color: '#666666',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFFFFF',
  },
  selectedTab: {
    borderColor: '#FF6410',
    backgroundColor: '#FF6410',
  },
  tabText: {
    color: '#555555',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    color: '#222222',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
    marginBottom: 11,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryBadge: {
    borderRadius: 12,
    backgroundColor: '#FFF1E8',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  categoryText: {
    color: '#A53B08',
    fontSize: 11,
    fontWeight: '800',
  },
  status: {
    color: '#555555',
    fontSize: 11,
    fontWeight: '700',
  },
  jobTitle: {
    color: '#222222',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '800',
    marginTop: 9,
  },
  client: {
    color: '#444444',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  location: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
  visitCard: {
    borderRadius: 11,
    backgroundColor: '#F7F7F7',
    padding: 11,
    marginTop: 12,
  },
  visitLabel: {
    color: '#A53B08',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  visitDate: {
    color: '#333333',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    marginTop: 3,
  },
  quoteNotice: {
    color: '#555555',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 14,
  },
  detailsButton: {
    flex: 1,
    minWidth: 0,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#FF6410',
    paddingHorizontal: 4,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  chatButton: {
    flex: 1,
    minWidth: 0,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
  },
  chatButtonText: {
    color: '#444444',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  interestButton: {
    flex: 1,
    minWidth: 0,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#FF6410',
    paddingHorizontal: 4,
  },
  interestButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.82,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23, 23, 23, 0.64)',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 22,
  },
  successMark: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#FF6410',
    marginBottom: 16,
  },
  successCheck: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '900',
  },
  modalTitle: {
    color: '#171717',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  modalMessage: {
    color: '#5A5A5A',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  modalJobTitle: {
    color: '#333333',
    fontWeight: '800',
  },
  modalNote: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
