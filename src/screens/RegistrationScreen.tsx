import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';
import { PrimaryButton } from '../components/PrimaryButton';

type RegistrationScreenProps = {
  role: 'trabalhador' | 'contratante';
  onBack: () => void;
  onContinue: (selectedServices: string[]) => void;
};

const SERVICES = [
  { label: 'Eletricista', icon: '⚡' },
  { label: 'Encanador', icon: '🔧' },
  { label: 'Pedreiro', icon: '🧱' },
  { label: 'Gesseiro', icon: '🏠' },
  { label: 'Pintor', icon: '🎨' },
];

export function RegistrationScreen({
  role,
  onBack,
  onContinue,
}: RegistrationScreenProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const isContractor = role === 'contratante';

  const servicesError = submitted && selectedServices.length === 0;

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : isContractor
          ? [service]
          : [...current, service],
    );
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (selectedServices.length === 0) {
      return;
    }
    onContinue(selectedServices);
  };

  return (
    <LinearGradient
      colors={['#FF4F00', '#FF7900', '#FFE956']}
      locations={[0, 0.56, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para a escolha de perfil"
            onPress={onBack}
            hitSlop={10}
            style={styles.backButton}
          >
            <Text style={styles.backLabel}>‹ Voltar</Text>
          </Pressable>

          <View style={styles.brand}>
            <BrandWordmark />
          </View>

          <View style={styles.heading}>
            <Text style={styles.title}>Vamos criar seu perfil</Text>
            <Text style={styles.roleTitle}>
              {isContractor ? 'Contratante' : 'Profissional'}
            </Text>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>
              {isContractor
                ? 'Qual serviço você quer contratar?'
                : 'Qual serviço você faz?'}
            </Text>
            <Text style={styles.sectionHint}>
              {isContractor
                ? 'Selecione o serviço desejado.'
                : 'Selecione uma ou mais opções.'}
            </Text>
            <View style={styles.serviceGrid}>
              {SERVICES.map(({ label, icon }) => {
                const selected = selectedServices.includes(label);
                return (
                  <Pressable
                    key={label}
                    accessibilityRole={isContractor ? 'radio' : 'checkbox'}
                    accessibilityState={
                      isContractor
                        ? { selected }
                        : { checked: selected }
                    }
                    onPress={() => toggleService(label)}
                    style={[
                      styles.serviceCard,
                      selected && styles.serviceCardSelected,
                    ]}
                  >
                    <Text style={styles.serviceIcon}>{icon}</Text>
                    <Text
                      style={[
                        styles.serviceLabel,
                        selected && styles.serviceLabelSelected,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {servicesError && (
              <Text accessibilityRole="alert" style={styles.errorText}>
                Selecione pelo menos um serviço.
              </Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title="Próximo" onPress={handleContinue} />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 30,
    justifyContent: 'center',
  },
  backLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  brand: {
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  roleTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 2,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  servicesSection: {
    marginTop: 18,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  sectionHint: {
    color: '#FFF5E8',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  serviceCard: {
    width: '48%',
    minHeight: 78,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  serviceCardSelected: {
    borderColor: '#A73C0D',
    backgroundColor: '#FFF0D8',
  },
  serviceIcon: {
    fontSize: 26,
  },
  serviceLabel: {
    color: '#75503D',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  serviceLabelSelected: {
    color: '#A73C0D',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
});
