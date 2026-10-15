import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { JobCard } from '../components/JobCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { getJobs } from '../services/jobs';
import { Job, JobCategory } from '../types';

type UserRole = 'trabalhador' | 'contratante';
type Filter = 'Todas' | JobCategory;

type JobsScreenProps = {
  role: UserRole;
  onSelectJob: (job: Job) => void;
  onOpenProfile: () => void;
};

const FILTERS: Filter[] = ['Todas', 'Pedreiro', 'Ajudante', 'Eletricista', 'Pintor'];

export function JobsScreen({ role, onSelectJob, onOpenProfile }: JobsScreenProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<Filter>('Todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      setJobs(await getJobs());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Ocorreu um erro inesperado ao carregar as vagas.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadJobs();
  }, []);

  const visibleJobs = useMemo(
    () => (filter === 'Todas' ? jobs : jobs.filter((job) => job.category === filter)),
    [filter, jobs],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! Bom dia 👋</Text>
            <Text style={styles.location}>João Pessoa, PB <Text style={styles.locationArrow}>⌄</Text></Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
            onPress={onOpenProfile}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{role === 'trabalhador' ? 'TR' : 'CO'}</Text>
          </Pressable>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerEyebrow}>OPORTUNIDADES PERTO</Text>
          <Text style={styles.bannerTitle}>
            {role === 'trabalhador' ? 'Seu próximo bico começa aqui.' : 'Sua próxima equipe começa aqui.'}
          </Text>
          <Text style={styles.bannerCopy}>
            {role === 'trabalhador'
              ? 'Vagas da construção civil na sua região.'
              : 'Conheça profissionais disponíveis para sua obra.'}
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Mural de vagas</Text>
          <Text style={styles.jobCount}>
            {loading ? ' ' : `${visibleJobs.length} ${visibleJobs.length === 1 ? 'vaga' : 'vagas'}`}
          </Text>
        </View>

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
                style={[styles.filter, selected && styles.selectedFilter]}
              >
                <Text style={[styles.filterText, selected && styles.selectedFilterText]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {loading && (
          <View accessibilityRole="progressbar" style={styles.messageCard}>
            <View style={styles.loadingDot} />
            <Text style={styles.messageTitle}>Carregando oportunidades...</Text>
            <Text style={styles.messageCopy}>Só um instante, estamos buscando vagas perto de você.</Text>
          </View>
        )}

        {!loading && error && (
          <View accessibilityRole="alert" style={styles.messageCard}>
            <Text style={styles.errorIcon}>!</Text>
            <Text style={styles.messageTitle}>Não foi possível carregar as vagas</Text>
            <Text style={styles.messageCopy}>{error}</Text>
            <View style={styles.retry}>
              <PrimaryButton title="Tentar novamente" onPress={() => void loadJobs()} />
            </View>
          </View>
        )}

        {!loading && !error && visibleJobs.length === 0 && (
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Nenhuma vaga nesta categoria</Text>
            <Text style={styles.messageCopy}>Escolha outra área para ver mais oportunidades.</Text>
          </View>
        )}

        {!loading && !error && visibleJobs.map((job) => (
          <JobCard key={job.id} job={job} onPress={onSelectJob} />
        ))}
      </ScrollView>

      <BottomNavigation active="jobs" onJobsPress={() => undefined} onProfilePress={onOpenProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingTop: 26,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    color: '#8A786E',
    fontSize: 13,
  },
  location: {
    color: '#30241D',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 3,
  },
  locationArrow: {
    color: '#C64F1D',
    fontSize: 19,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E6D8',
  },
  avatarText: {
    color: '#A64C25',
    fontSize: 13,
    fontWeight: '800',
  },
  banner: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: '#2F3C35',
    marginBottom: 25,
  },
  bannerEyebrow: {
    color: '#F5B483',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: 8,
    maxWidth: 280,
  },
  bannerCopy: {
    color: '#E2E6E2',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  sectionTitle: {
    color: '#30241D',
    fontSize: 20,
    fontWeight: '800',
  },
  jobCount: {
    color: '#8A786E',
    fontSize: 12,
  },
  filters: {
    gap: 8,
    paddingBottom: 16,
  },
  filter: {
    minHeight: 36,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E9DCD1',
    borderRadius: 20,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  selectedFilter: {
    backgroundColor: '#E66A2E',
    borderColor: '#E66A2E',
  },
  filterText: {
    color: '#6F574A',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  messageCard: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1E8E0',
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginTop: 2,
  },
  loadingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5B483',
    marginBottom: 14,
  },
  errorIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    color: '#A63D27',
    backgroundColor: '#FCE7E2',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  messageTitle: {
    color: '#30241D',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  messageCopy: {
    color: '#8A786E',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  retry: {
    width: '100%',
    marginTop: 18,
  },
});
