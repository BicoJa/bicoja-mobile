import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { PrimaryButton } from '../components/PrimaryButton';

type ProfileScreenProps = {
  role: 'trabalhador' | 'contratante';
  onOpenJobs: () => void;
  onOpenMyJobs: () => void;
  onSignOut: () => void;
};

type ProfileAction = 'edit' | 'terms' | null;

export function ProfileScreen({
  role,
  onOpenJobs,
  onOpenMyJobs,
  onSignOut,
}: ProfileScreenProps) {
  const [activeAction, setActiveAction] = useState<ProfileAction>(null);
  const isWorker = role === 'trabalhador';
  const accountType = isWorker ? 'Prestador de serviços' : 'Cliente';

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>BICO JÁ</Text>
        <Text style={styles.pageTitle}>Meu perfil</Text>

        <View style={styles.profileCard}>
          <View
            accessibilityLabel={`Avatar de ${accountType}`}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{isWorker ? 'PS' : 'CL'}</Text>
          </View>
          <Text style={styles.name}>{isWorker ? 'Prestador de serviços' : 'Cliente Bico Já'}</Text>
          <Text style={styles.accountType}>{accountType}</Text>
          <View style={styles.ratingRow}>
            <Text accessibilityLabel="Ainda sem avaliações" style={styles.stars}>☆☆☆☆☆</Text>
            <Text style={styles.ratingText}>Sem avaliações</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de contacto</Text>
          <View style={styles.infoCard}>
            <ProfileInfo label="E-mail" value="Adicione o seu e-mail" />
            <View style={styles.divider} />
            <ProfileInfo label="Telemóvel" value="Adicione o seu telemóvel" />
            <View style={styles.divider} />
            <ProfileInfo label="Localização" value="João Pessoa, PB" />
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Editar Perfil"
            onPress={() => setActiveAction('edit')}
          />
          <PrimaryButton
            title="Termos de Serviço"
            variant="secondary"
            onPress={() => setActiveAction('terms')}
          />
          <PrimaryButton
            title="Terminar Sessão"
            variant="quiet"
            onPress={onSignOut}
          />
        </View>
      </ScrollView>

      <BottomNavigation
        active="profile"
        onJobsPress={onOpenJobs}
        onMyJobsPress={onOpenMyJobs}
        onProfilePress={() => undefined}
      />

      <ProfileActionModal
        action={activeAction}
        onClose={() => setActiveAction(null)}
      />
    </View>
  );
}

type ProfileInfoProps = {
  label: string;
  value: string;
};

function ProfileInfo({ label, value }: ProfileInfoProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

type ProfileActionModalProps = {
  action: ProfileAction;
  onClose: () => void;
};

function ProfileActionModal({ action, onClose }: ProfileActionModalProps) {
  if (!action) {
    return null;
  }

  const isEditAction = action === 'edit';

  return (
    <Modal
      accessibilityViewIsModal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible
    >
      <View style={styles.modalOverlay}>
        <View accessibilityRole="alert" style={styles.modalCard}>
          <Text accessibilityRole="header" style={styles.modalTitle}>
            {isEditAction ? 'Editar Perfil' : 'Termos de Serviço'}
          </Text>
          <Text style={styles.modalMessage}>
            {isEditAction
              ? 'A edição dos dados do perfil estará disponível quando a conta estiver conectada.'
              : 'O Bico Já conecta prestadores de serviços e clientes. O preço do serviço é definido após visita técnica e orçamento presencial.'}
          </Text>
          <PrimaryButton
            title="Fechar"
            variant="secondary"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 24,
  },
  eyebrow: {
    color: '#E9570B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  pageTitle: {
    color: '#222222',
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '900',
    marginTop: 4,
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0E4',
    borderWidth: 2,
    borderColor: '#FF6410',
  },
  avatarText: {
    color: '#D94D08',
    fontSize: 22,
    fontWeight: '900',
  },
  name: {
    color: '#222222',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    marginTop: 13,
    textAlign: 'center',
  },
  accountType: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 11,
  },
  stars: {
    color: '#E9570B',
    fontSize: 18,
    letterSpacing: 1,
  },
  ratingText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#292929',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  infoCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  infoRow: {
    paddingVertical: 13,
  },
  infoLabel: {
    color: '#777777',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
  },
  infoValue: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9E9E9',
  },
  actions: {
    gap: 10,
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(25, 25, 25, 0.6)',
  },
  modalCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FF6410',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  modalTitle: {
    color: '#222222',
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '800',
  },
  modalMessage: {
    color: '#5A5A5A',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 20,
  },
});
