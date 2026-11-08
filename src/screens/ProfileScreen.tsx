import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { PrimaryButton } from '../components/PrimaryButton';

type ProfileScreenProps = {
  role: 'trabalhador' | 'contratante';
  profession: string;
  onOpenJobs: () => void;
  onOpenMyJobs: () => void;
  onSignOut: () => void;
  onChangePhone: () => void;
  onEditSkills: () => void;
  onOpenNotifications: () => void;
  onCreateJob: () => void;
};

type ProfileAction = 'edit' | 'privacy' | 'terms' | null;

export function ProfileScreen({
  role,
  profession,
  onOpenJobs,
  onOpenMyJobs,
  onSignOut,
  onChangePhone,
  onEditSkills,
  onOpenNotifications,
  onCreateJob,
}: ProfileScreenProps) {
  const [activeAction, setActiveAction] = useState<ProfileAction>(null);
  const isWorker = role === 'trabalhador';

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>BICO JÁ · JOÃO PESSOA / PB</Text>
        <Text accessibilityRole="header" style={styles.pageTitle}>Perfil profissional</Text>

        <View style={styles.profileCard}>
          <View accessibilityLabel="Avatar demonstrativo do prestador" style={styles.avatar}>
            <Text style={styles.avatarText}>{isWorker ? 'PS' : 'CL'}</Text>
          </View>
          <Text style={styles.name}>
            {isWorker ? profession : 'Cliente Bico Já'}
          </Text>
          <View style={styles.ratingRow}>
            <Text accessibilityLabel="Ainda sem avaliações" style={styles.stars}>☆☆☆☆☆</Text>
            <Text style={styles.ratingText}>Sem avaliações</Text>
          </View>
        </View>

        <ProfileSection title="Dados da conta">
          <View style={styles.infoCard}>
            <ProfileInfo label="Senha" value="••••••••" />
            <View style={styles.divider} />
            <ProfileInfo label="Telefone" value="Não informado" />
          </View>
        </ProfileSection>

        <ProfileSection title="Definições da conta">
          <View style={styles.settingsCard}>
            <SettingsAction
              label="Editar perfil"
              description="Atualize os seus dados de perfil"
              onPress={() => setActiveAction('edit')}
            />
            {isWorker && (
              <>
                <View style={styles.divider} />
                <SettingsAction
                  label="Alterar habilidades"
                  description="Atualize os serviços que oferece"
                  onPress={onEditSkills}
                />
              </>
            )}
            <View style={styles.divider} />
            <SettingsAction
              label="Privacidade e segurança"
              description="Consulte as opções da sua conta"
              onPress={() => setActiveAction('privacy')}
            />
            <View style={styles.divider} />
            <SettingsAction
              label="Notificações"
              description="Acompanhe novidades sobre seus serviços"
              onPress={onOpenNotifications}
            />
            <View style={styles.divider} />
            <SettingsAction
              label="Publicar serviço"
              description="Encontre profissionais para o seu serviço"
              onPress={onCreateJob}
            />
            <View style={styles.divider} />
            <SettingsAction
              label="Alterar telefone"
              description="Atualize o número associado à sua conta"
              onPress={onChangePhone}
            />
            <View style={styles.divider} />
            <SettingsAction
              label="Termos de serviço"
              description="Leia as regras de utilização do Bico Já"
              onPress={() => setActiveAction('terms')}
            />
          </View>
        </ProfileSection>

        <View style={styles.signOutAction}>
          <PrimaryButton title="Terminar sessão" variant="quiet" onPress={onSignOut} />
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

type ProfileSectionProps = {
  title: string;
  children: React.ReactNode;
};

function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
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

type SettingsActionProps = {
  label: string;
  description: string;
  onPress: () => void;
};

function SettingsAction({ label, description, onPress }: SettingsActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.settingsAction, pressed && styles.pressed]}
    >
      <View style={styles.settingsCopy}>
        <Text style={styles.settingsLabel}>{label}</Text>
        <Text style={styles.settingsDescription}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
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

  const modalContent = {
    edit: {
      title: 'Editar perfil',
      message: 'A edição dos dados estará disponível quando a conta estiver conectada.',
    },
    privacy: {
      title: 'Privacidade e segurança',
      message: 'As definições de privacidade estarão disponíveis quando a conta estiver conectada.',
    },
    terms: {
      title: 'Termos de serviço',
      message:
        'O Bico Já conecta profissionais e clientes. O orçamento do serviço é definido após visita técnica e avaliação no local.',
    },
  }[action];

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
          <Text accessibilityRole="header" style={styles.modalTitle}>{modalContent.title}</Text>
          <Text style={styles.modalMessage}>{modalContent.message}</Text>
          <PrimaryButton title="Fechar" variant="secondary" onPress={onClose} />
        </View>
      </View>
    </Modal>
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
    paddingTop: 28,
    paddingBottom: 24,
  },
  eyebrow: {
    color: '#A53B08',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  pageTitle: {
    color: '#222222',
    fontSize: 27,
    lineHeight: 35,
    fontWeight: '900',
    marginTop: 5,
    marginBottom: 18,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#FF6410',
    backgroundColor: '#FFF1E8',
  },
  avatarText: {
    color: '#A53B08',
    fontSize: 22,
    fontWeight: '900',
  },
  name: {
    color: '#222222',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
  },
  stars: {
    color: '#D94D08',
    fontSize: 18,
    letterSpacing: 1,
  },
  ratingText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#292929',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
    marginBottom: 9,
  },
  infoCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  infoRow: {
    paddingVertical: 11,
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
  settingsCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
  },
  settingsAction: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingsCopy: {
    flex: 1,
    paddingVertical: 10,
  },
  settingsLabel: {
    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  settingsDescription: {
    color: '#777777',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  chevron: {
    color: '#A53B08',
    fontSize: 24,
    fontWeight: '600',
  },
  signOutAction: {
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(25, 25, 25, 0.6)',
  },
  modalCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  pressed: {
    opacity: 0.82,
  },
});
