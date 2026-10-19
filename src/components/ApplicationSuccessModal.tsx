import { Modal, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';

type ApplicationSuccessModalProps = {
  visible: boolean;
  jobTitle: string;
  onReturnToJobs: () => void;
};

export function ApplicationSuccessModal({
  visible,
  jobTitle,
  onReturnToJobs,
}: ApplicationSuccessModalProps) {
  return (
    <Modal
      accessibilityViewIsModal
      animationType="fade"
      onRequestClose={onReturnToJobs}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <View accessibilityRole="alert" style={styles.card}>
          <View style={styles.successMark}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text accessibilityRole="header" style={styles.title}>
            Interesse enviado com sucesso!
          </Text>
          <Text style={styles.message}>
            A contratante foi notificada do seu interesse em{' '}
            <Text style={styles.jobTitle}>{jobTitle}</Text> e poderá entrar em contato.
          </Text>
          <PrimaryButton title="Voltar ao mural" onPress={onReturnToJobs} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23, 23, 23, 0.64)',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF6410',
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
    backgroundColor: '#FFF0E4',
    marginBottom: 16,
  },
  check: {
    color: '#E9570B',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  title: {
    color: '#171717',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  message: {
    color: '#5A5A5A',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  jobTitle: {
    color: '#333333',
    fontWeight: '800',
  },
});
