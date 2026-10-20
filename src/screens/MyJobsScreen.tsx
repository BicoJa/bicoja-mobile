import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { Job } from '../types';

type MyJobStatus = 'Pendente / Agendado' | 'Em andamento' | 'Concluído';
type StatusFilter = 'Todos' | MyJobStatus;

type MyJob = {
  id: string;
  job: Job;
  clientName: string;
  status: MyJobStatus;
  statusMessage: string;
};

type MyJobsScreenProps = {
  onSelectJob: (job: Job) => void;
  onOpenJobs: () => void;
  onOpenProfile: () => void;
};

const FILTERS: StatusFilter[] = [
  'Todos',
  'Pendente / Agendado',
  'Em andamento',
  'Concluído',
];

const MY_JOBS: MyJob[] = [
  {
    id: 'historico-pedreiro-01',
    clientName: 'Mariana Costa',
    status: 'Pendente / Agendado',
    statusMessage: 'Visita técnica a combinar',
    job: {
      id: 'historico-pedreiro-01',
      title: 'Pedreiro',
      category: 'Pedreiro',
      contractor: 'Mariana Costa',
      location: 'Manaíra, João Pessoa',
      distance: '1,2 km de você',
      schedule: 'Data a combinar após visita',
      description:
        'Serviço de alvenaria residencial. O preço será definido após visita técnica e orçamento presencial.',
      benefits: [],
      requirements: ['Experiência em alvenaria'],
      tools: [],
      postedAt: 'Solicitação recente',
      imageUrl:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    },
  },
  {
    id: 'historico-encanador-02',
    clientName: 'Rafael Almeida',
    status: 'Em andamento',
    statusMessage: 'Serviço em execução',
    job: {
      id: 'historico-encanador-02',
      title: 'Encanador',
      category: 'Encanador',
      contractor: 'Rafael Almeida',
      location: 'Tambaú, João Pessoa',
      distance: '2,3 km de você',
      schedule: 'Agendado com o cliente',
      description:
        'Avaliação e serviço de instalação hidráulica. Escopo e preço definidos após visita ao local.',
      benefits: [],
      requirements: ['Experiência em instalação hidráulica'],
      tools: [],
      postedAt: 'Serviço em andamento',
      imageUrl:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
    },
  },
  {
    id: 'historico-eletricista-03',
    clientName: 'Joana Ribeiro',
    status: 'Concluído',
    statusMessage: 'Serviço finalizado',
    job: {
      id: 'historico-eletricista-03',
      title: 'Eletricista',
      category: 'Eletricista',
      contractor: 'Joana Ribeiro',
      location: 'Bancários, João Pessoa',
      distance: '1,9 km de você',
      schedule: 'Concluído',
      description:
        'Serviço de instalação elétrica. O orçamento foi alinhado presencialmente antes do início.',
      benefits: [],
      requirements: ['Experiência comprovada'],
      tools: [],
      postedAt: 'Serviço concluído',
      imageUrl:
        'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80',
    },
  },
];

const STATUS_COLORS: Record<MyJobStatus, { background: string; text: string }> = {
  'Pendente / Agendado': { background: '#FFF0E4', text: '#B94A1C' },
  'Em andamento': { background: '#E8EEF5', text: '#3E5C7A' },
  Concluído: { background: '#E8F2EA', text: '#3D7048' },
};

export function MyJobsScreen({
  onSelectJob,
  onOpenJobs,
  onOpenProfile,
}: MyJobsScreenProps) {
  const [filter, setFilter] = useState<StatusFilter>('Todos');

  const visibleJobs = useMemo(
    () =>
      filter === 'Todos'
        ? MY_JOBS
        : MY_JOBS.filter((item) => item.status === filter),
    [filter],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>ACOMPANHAMENTO</Text>
        <Text style={styles.title}>Meus bicos</Text>
        <Text style={styles.subtitle}>
          Acompanhe os serviços e combine a visita para definir o orçamento.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((item) => {
            const selected = filter === item;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={item}
                onPress={() => setFilter(item)}
                style={[
                  styles.filter,
                  selected && styles.selectedFilter,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.filterText, selected && styles.selectedFilterText]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.resultCount}>
          {visibleJobs.length} {visibleJobs.length === 1 ? 'serviço' : 'serviços'}
        </Text>

        {visibleJobs.length > 0 ? (
          visibleJobs.map((item) => {
            const statusStyle = STATUS_COLORS[item.status];
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${item.job.title}, ${item.job.location}, cliente ${item.clientName}, estado ${item.status}. Abrir detalhes.`}
                key={item.id}
                onPress={() => onSelectJob(item.job)}
                style={({ pressed }) => [styles.card, pressed && styles.pressed]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.titleGroup}>
                    <Text style={styles.jobTitle}>{item.job.title}</Text>
                    <Text style={styles.location}>{item.job.location}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.background }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                  <View style={styles.clientBlock}>
                    <Text style={styles.label}>CLIENTE</Text>
                    <Text style={styles.clientName}>{item.clientName}</Text>
                    <Text style={styles.statusMessage}>{item.statusMessage}</Text>
                  </View>
                  <Text style={styles.openDetails}>Detalhes ›</Text>
                </View>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Nenhum serviço nesta etapa</Text>
            <Text style={styles.emptyMessage}>
              Os serviços desta categoria aparecerão aqui quando estiverem disponíveis.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNavigation
        active="myJobs"
        onJobsPress={onOpenJobs}
        onMyJobsPress={() => undefined}
        onProfilePress={onOpenProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 18,
  },
  eyebrow: {
    color: '#E9570B',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  title: {
    color: '#222222',
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '900',
    marginTop: 4,
  },
  subtitle: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  filters: {
    gap: 8,
    paddingTop: 20,
    paddingBottom: 15,
  },
  filter: {
    height: 36,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },
  selectedFilter: {
    backgroundColor: '#FF6410',
  },
  filterText: {
    color: '#555555',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  resultCount: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 9,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 9,
  },
  titleGroup: {
    flex: 1,
  },
  jobTitle: {
    color: '#252525',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  location: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  statusBadge: {
    maxWidth: 136,
    borderRadius: 13,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },
  clientBlock: {
    flex: 1,
  },
  label: {
    color: '#888888',
    fontSize: 9,
    lineHeight: 13,
    letterSpacing: 0.7,
    fontWeight: '800',
  },
  clientName: {
    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  statusMessage: {
    color: '#777777',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  openDetails: {
    color: '#D94D08',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '800',
  },
  emptyCard: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 22,
    marginTop: 4,
  },
  emptyTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyMessage: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 6,
  },
  pressed: {
    opacity: 0.82,
  },
});
