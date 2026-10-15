import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { PrimaryButton } from '../components/PrimaryButton';

type ProfileScreenProps = {
  role: 'trabalhador' | 'contratante';
  onOpenJobs: () => void;
  onSignOut: () => void;
};

const PROFILE_METRICS = [
  { label: 'Pontualidade', value: '4,9' },
  { label: 'Capricho', value: '4,8' },
  { label: 'Confiança', value: '5,0' },
];

export function ProfileScreen({ role, onOpenJobs, onSignOut }: ProfileScreenProps) {
  const isWorker = role === 'trabalhador';

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>MEU ESPAÇO</Text>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{isWorker ? 'TR' : 'CO'}</Text>
          </View>
          <Text style={styles.name}>{isWorker ? 'Seu perfil profissional' : 'Seu perfil de contratante'}</Text>
          <Text style={styles.role}>{isWorker ? 'Trabalhador da construção civil' : 'Empreiteiro / construtor'}</Text>
          <View style={styles.locationPill}>
            <Text style={styles.location}>João Pessoa, PB</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reputação</Text>
          <Text style={styles.rating}>★ 4,9</Text>
        </View>
        <Text style={styles.sectionCopy}>
          Uma boa reputação ajuda a construir relações de trabalho mais confiáveis.
        </Text>

        <View style={styles.metrics}>
          {PROFILE_METRICS.map((metric) => (
            <View key={metric.label} style={styles.metric}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Seu perfil está começando</Text>
          <Text style={styles.infoCopy}>
            Conclua seus primeiros trabalhos para receber avaliações de quem trabalhou com você.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <PrimaryButton title="Voltar para as vagas" onPress={onOpenJobs} />
          <PrimaryButton title="Sair do perfil" variant="quiet" onPress={onSignOut} />
        </View>
      </ScrollView>
      <BottomNavigation active="profile" onJobsPress={onOpenJobs} onProfilePress={() => undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  eyebrow: {
    color: '#BC5428',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  title: {
    color: '#30241D',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F1E8E0',
    backgroundColor: '#FFFFFF',
    padding: 22,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0E4',
  },
  avatarText: {
    color: '#B94A1C',
    fontSize: 21,
    fontWeight: '800',
  },
  name: {
    color: '#30241D',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 13,
  },
  role: {
    color: '#8A786E',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  locationPill: {
    backgroundColor: '#F8F4EF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },
  location: {
    color: '#6F574A',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  sectionTitle: {
    color: '#30241D',
    fontSize: 17,
    fontWeight: '800',
  },
  rating: {
    color: '#B95B22',
    fontSize: 14,
    fontWeight: '800',
  },
  sectionCopy: {
    color: '#8A786E',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  metrics: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1E8E0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginTop: 15,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F1E8E0',
  },
  metricValue: {
    color: '#30241D',
    fontSize: 17,
    fontWeight: '800',
  },
  metricLabel: {
    color: '#8A786E',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  infoCard: {
    borderRadius: 18,
    padding: 17,
    backgroundColor: '#F2F5EF',
    marginTop: 17,
  },
  infoTitle: {
    color: '#385944',
    fontSize: 14,
    fontWeight: '800',
  },
  infoCopy: {
    color: '#5C6D5F',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  buttonGroup: {
    gap: 8,
    marginTop: 24,
  },
});
