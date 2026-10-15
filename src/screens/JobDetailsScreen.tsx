import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { Job } from '../types';

type JobDetailsScreenProps = {
  job: Job;
  onBack: () => void;
  onOpenProfile: () => void;
};

export function JobDetailsScreen({ job, onBack, onOpenProfile }: JobDetailsScreenProps) {
  const [interested, setInterested] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para o mural de vagas"
            onPress={onBack}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes da vaga</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Image source={{ uri: job.imageUrl }} style={styles.image} />
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{job.category}</Text>
          <Text style={styles.postedAt}>{job.postedAt}</Text>
        </View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.contractor}>{job.contractor}</Text>

        <View style={styles.highlightCard}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>DIÁRIA</Text>
            <Text style={styles.rate}>R$ {job.dailyRate}</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>DISTÂNCIA</Text>
            <Text style={styles.highlightValue}>{job.distance}</Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.sectionTitle}>Sobre a oportunidade</Text>
          <Text style={styles.body}>{job.description}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.sectionTitle}>Quando</Text>
          <Text style={styles.body}>{job.schedule}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.sectionTitle}>O que está incluído</Text>
          <View style={styles.benefits}>
            {job.benefits.map((benefit) => (
              <View key={benefit} style={styles.benefit}>
                <Text style={styles.check}>✓</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.locationLabel}>LOCAL DA OBRA</Text>
          <Text style={styles.location}>{job.location}</Text>
        </View>
        <PrimaryButton
          title={interested ? 'Interesse registrado' : 'Tenho interesse'}
          variant={interested ? 'secondary' : 'primary'}
          onPress={() => setInterested(true)}
        />
        <Text accessibilityLiveRegion="polite" style={styles.actionNote}>
          {interested
            ? 'Seu interesse foi registrado neste protótipo. A contratante poderá entrar em contato em uma próxima etapa.'
            : 'Demonstre interesse para avançar na conversa com a contratante.'}
        </Text>
      </ScrollView>
      <BottomNavigation active="jobs" onJobsPress={onBack} onProfilePress={onOpenProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1E8E0',
  },
  backText: {
    color: '#30241D',
    fontSize: 32,
    lineHeight: 35,
  },
  headerTitle: {
    color: '#30241D',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 42,
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 22,
    backgroundColor: '#F4E3D6',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  category: {
    color: '#B94A1C',
    backgroundColor: '#FFF0E4',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  postedAt: {
    color: '#8A786E',
    fontSize: 12,
  },
  title: {
    color: '#30241D',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '800',
    marginTop: 12,
  },
  contractor: {
    color: '#6F574A',
    fontSize: 15,
    marginTop: 5,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1E8E0',
    padding: 16,
    marginTop: 20,
  },
  highlightItem: {
    flex: 1,
  },
  highlightLabel: {
    color: '#8A786E',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
  },
  rate: {
    color: '#30241D',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 5,
  },
  highlightValue: {
    color: '#30241D',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  highlightDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F1E8E0',
    marginHorizontal: 14,
  },
  infoBlock: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#30241D',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  body: {
    color: '#6F574A',
    fontSize: 14,
    lineHeight: 22,
  },
  benefits: {
    gap: 10,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  check: {
    color: '#42825A',
    fontSize: 17,
    fontWeight: '800',
  },
  benefitText: {
    color: '#6F574A',
    fontSize: 14,
  },
  locationCard: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1E8E0',
    marginTop: 24,
    marginBottom: 18,
  },
  locationLabel: {
    color: '#8A786E',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
  },
  location: {
    color: '#30241D',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  actionNote: {
    color: '#8A786E',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 10,
  },
});
