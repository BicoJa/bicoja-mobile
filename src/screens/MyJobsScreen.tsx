import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { PrimaryButton } from '../components/PrimaryButton';

type MyJobsScreenProps = {
  onOpenJobs: () => void;
  onOpenProfile: () => void;
};

export function MyJobsScreen({ onOpenJobs, onOpenProfile }: MyJobsScreenProps) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>BICO JÁ · JOÃO PESSOA / PB</Text>
        <Text accessibilityRole="header" style={styles.title}>Meus bicos</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seus serviços</Text>
          <Text style={styles.cardDescription}>
            Os serviços agendados e concluídos aparecerão aqui quando estiverem associados à sua
            conta.
          </Text>
          <Text style={styles.quoteNotice}>
            O orçamento é definido após a visita técnica ao local.
          </Text>
          <View style={styles.action}>
            <PrimaryButton title="Ver oportunidades" onPress={onOpenJobs} />
          </View>
        </View>
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
    backgroundColor: '#F2F2F2',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  eyebrow: {
    color: '#A53B08',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#222222',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    padding: 18,
  },
  cardTitle: {
    color: '#222222',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '800',
  },
  cardDescription: {
    color: '#5A5A5A',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  quoteNotice: {
    color: '#8A3A13',
    backgroundColor: '#FFF1E8',
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 18,
    padding: 11,
    marginTop: 14,
  },
  action: {
    marginTop: 16,
  },
});
