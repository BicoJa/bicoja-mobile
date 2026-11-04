import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { JobDetailSection } from '../components/JobDetailSection';
import { PrimaryButton } from '../components/PrimaryButton';
import { VisitRequestModal } from '../components/VisitRequestModal';
import { Job } from '../types';

type JobDetailsScreenProps = {
  job: Job;
  onBack: () => void;
  onOpenMyJobs: () => void;
  onOpenProfile: () => void;
  onOpenChat: () => void;
  activeNavigation: 'jobs' | 'myJobs';
};

export function JobDetailsScreen({
  job,
  onBack,
  onOpenMyJobs,
  onOpenProfile,
  onOpenChat,
  activeNavigation,
}: JobDetailsScreenProps) {
  const [successVisible, setSuccessVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar para o mural de vagas"
              onPress={onBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            >
              <Text style={styles.backText}>‹</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Detalhes do serviço</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={styles.category}>{job.category}</Text>
          <Text style={styles.title}>{job.title}</Text>
          <View style={styles.postedRow}>
            <Text style={styles.contractor}>Publicado por {job.contractor}</Text>
            <Text style={styles.postedAt}>{job.postedAt}</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.imageFrame}>
            <Image
              accessibilityLabel={`Imagem da oportunidade: ${job.title}`}
              source={{ uri: job.imageUrl }}
              style={styles.image}
            />
          </View>

          <View style={styles.highlightCard}>
            <View style={styles.quoteNotice}>
              <Text style={styles.highlightLabel}>MODALIDADE DE ATENDIMENTO</Text>
              <Text style={styles.quoteText}>
                O orçamento é definido após a visita técnica e avaliação do serviço no local.
              </Text>
            </View>
            <View style={styles.scheduleSection}>
              <Text style={styles.highlightLabel}>HORÁRIO</Text>
              <Text style={styles.schedule}>{job.schedule}</Text>
            </View>
          </View>

          <JobDetailSection title="Descrição do serviço">
            <Text style={styles.body}>{job.description}</Text>
          </JobDetailSection>

          <JobDetailSection title="Morada da visita">
            <Text style={styles.location}>{job.location}</Text>
            <Text style={styles.distance}>Distância aproximada: {job.distance}</Text>
          </JobDetailSection>

          <JobDetailSection title="Dados do cliente">
            <Text style={styles.subsectionTitle}>Contratante</Text>
            <Text style={styles.location}>{job.contractor}</Text>
            <Text style={styles.distance}>
              Combine os detalhes do atendimento com o cliente após a visita técnica.
            </Text>
          </JobDetailSection>

          <View style={styles.application}>
            <PrimaryButton
              title="Combinar visita técnica"
              onPress={() => setSuccessVisible(true)}
            />
            <View style={styles.chatAction}>
              <PrimaryButton
                title="Conversar por texto"
                variant="secondary"
                onPress={onOpenChat}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation
        active={activeNavigation}
        onJobsPress={onBack}
        onMyJobsPress={onOpenMyJobs}
        onProfilePress={onOpenProfile}
      />
      <VisitRequestModal
        visible={successVisible}
        jobTitle={job.title}
        clientName={job.contractor}
        location={job.location}
        onClose={() => setSuccessVisible(false)}
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
    paddingBottom: 20,
  },
  hero: {
    backgroundColor: '#FF6410',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 35,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  headerSpacer: {
    width: 40,
  },
  category: {
    color: '#FFF2E8',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    marginTop: 4,
  },
  contractor: {
    flex: 1,
    color: '#FFF2E8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  postedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postedAt: {
    color: '#FFF2E8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginLeft: 8,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  imageFrame: {
    overflow: 'hidden',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#D7C4B2',
  },
  image: {
    width: '100%',
    height: 180,
  },
  highlightCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginTop: 14,
  },
  quoteNotice: {
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6410',
    backgroundColor: '#F7F7F7',
    padding: 12,
  },
  highlightLabel: {
    color: '#5A5A5A',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    fontWeight: '800',
  },
  quoteText: {
    color: '#333333',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    marginTop: 5,
  },
  scheduleSection: {
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    marginTop: 12,
    paddingTop: 11,
  },
  schedule: {
    color: '#171717',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginTop: 5,
  },
  body: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 21,
  },
  location: {
    color: '#171717',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
  },
  distance: {
    color: '#5A5A5A',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  subsectionTitle: {
    color: '#5A5A5A',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
  },
  application: {
    marginTop: 22,
    marginBottom: 12,
  },
  chatAction: {
    marginTop: 10,
  },
  pressed: {
    opacity: 0.82,
  },
});
