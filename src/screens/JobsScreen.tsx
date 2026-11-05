import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { JobCard } from '../components/JobCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { getJobs } from '../services/jobs';
import { Job } from '../types';

type UserRole = 'trabalhador' | 'contratante';

type JobsScreenProps = {
  role: UserRole;
  userName: string;
  userId: number | null;
  onSelectJob: (job: Job) => void;
  onOpenMyJobs: () => void;
  onOpenProfile: () => void;
};

export function JobsScreen({
  role,
  userName,
  userId,
  onSelectJob,
  onOpenMyJobs,
  onOpenProfile,
}: JobsScreenProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      setJobs(await getJobs(userId, role));
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
  }, [userId, role]);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.topBar}>
            <Text accessibilityLabel="Bico Já" style={styles.brand}>BICO<Text style={styles.brandAccent}>JÁ</Text></Text>
          </View>
          <Text style={styles.greeting}>Olá, {userName}!</Text>
          <Text style={styles.subtitle}>
            {role === 'trabalhador'
              ? 'Pronto para encontrar sua próxima oportunidade?'
              : 'Pronto para encontrar profissionais para sua obra?'}
          </Text>
        </View>

        <View style={styles.listArea}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              {role === 'trabalhador' ? 'Vagas perto de você' : 'Profissionais perto de você'}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => void loadJobs()}
              hitSlop={8}
            >
              <Text style={styles.seeAll}>Ver todas</Text>
            </Pressable>
          </View>

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

          {!loading && !error && jobs.length === 0 && (
            <View style={styles.messageCard}>
              <Text style={styles.messageTitle}>Nenhuma oportunidade por perto</Text>
              <Text style={styles.messageCopy}>Volte mais tarde para conferir novas oportunidades.</Text>
            </View>
          )}

          {!loading && !error && jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onPress={onSelectJob}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNavigation
        active="jobs"
        onJobsPress={() => undefined}
        onMyJobsPress={onOpenMyJobs}
        onProfilePress={onOpenProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#484848',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  hero: {
    backgroundColor: '#FF5A00',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 22,
    letterSpacing: -1,
    fontWeight: '900',
  },
  brandAccent: {
    color: '#193C83',
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  listArea: {
    flexGrow: 1,
    backgroundColor: '#484848',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: -16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '800',
  },
  seeAll: {
    color: '#FF5A00',
    fontSize: 11,
    fontWeight: '700',
  },
  messageCard: {
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#FF6410',
    backgroundColor: '#FFFFFF',
    padding: 22,
    marginBottom: 12,
  },
  loadingDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6410',
    marginBottom: 12,
  },
  errorIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    color: '#FFFFFF',
    backgroundColor: '#C64500',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  messageTitle: {
    color: '#171717',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  messageCopy: {
    color: '#5A5A5A',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  retry: {
    width: '100%',
    marginTop: 16,
  },
});
