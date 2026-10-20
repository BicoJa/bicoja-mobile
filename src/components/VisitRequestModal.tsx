import { Modal, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';

type VisitRequestModalProps = {
  visible: boolean;
  jobTitle: string;
  clientName: string;
  location: string;
  onClose: () => void;
};

export function VisitRequestModal({
  visible,
  jobTitle,
  clientName,
  location,
  onClose,
}: VisitRequestModalProps) {
  return (
    <Modal
      accessibilityViewIsModal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <View accessibilityRole="alert" style={styles.card}>
          <View style={styles.successMark}>
            <Text style={styles.check}>!</Text>
          </View>
          <Text accessibilityRole="header" style={styles.title}>
            Combine a visita técnica
          </Text>
          <Text style={styles.message}>
            O atendimento de <Text style={styles.jobTitle}>{jobTitle}</Text> será orçado após a
            visita em <Text style={styles.jobTitle}>{location}</Text>. O cliente é{' '}
            <Text style={styles.jobTitle}>{clientName}</Text>.
          </Text>
          <Text style={styles.note}>
            Os dados de contacto ainda não estão disponíveis neste protótipo. A solicitação não
            foi enviada ao cliente.
          </Text>
          <PrimaryButton title="Entendi" onPress={onClose} />
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
    borderWidth: 1,
    borderColor: '#E4E4E4',
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
    backgroundColor: '#FF6410',
    marginBottom: 16,
  },
  check: {
    color: '#FFFFFF',
    fontSize: 28,
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
    marginBottom: 10,
  },
  jobTitle: {
    color: '#333333',
    fontWeight: '800',
  },
  note: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
