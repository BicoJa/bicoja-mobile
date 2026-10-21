import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';
import { PrimaryButton } from '../components/PrimaryButton';

type ProfessionalRegistrationScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

const SERVICES = [
  { label: 'Eletricista', icon: '⚡' },
  { label: 'Encanador', icon: '🔧' },
  { label: 'Pedreiro', icon: '🧱' },
  { label: 'Gesseiro', icon: '🏠' },
  { label: 'Pintor', icon: '🎨' },
];

export function ProfessionalRegistrationScreen({
  onBack,
  onContinue,
}: ProfessionalRegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const phoneDigits = phone.replace(/\D/g, '');
  const nameError = submitted && fullName.trim().length === 0;
  const phoneError =
    submitted && phoneDigits.length !== 10 && phoneDigits.length !== 11;
  const servicesError = submitted && selectedServices.length === 0;

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (
      fullName.trim().length === 0 ||
      (phoneDigits.length !== 10 && phoneDigits.length !== 11) ||
      selectedServices.length === 0
    ) {
      return;
    }
    onContinue();
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
            <Text style={styles.roleTitle}>Profissional</Text>
          </View>

          <View style={styles.fields}>
            <View style={styles.field}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                accessibilityLabel="Nome Completo"
                autoCapitalize="words"
                autoComplete="name"
                onChangeText={setFullName}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#8A786D"
                returnKeyType="next"
                style={[styles.input, nameError && styles.inputError]}
                value={fullName}
              />
              {nameError && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  Informe seu nome completo.
                </Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                accessibilityLabel="Telefone"
                autoComplete="tel"
                keyboardType="phone-pad"
                maxLength={16}
                onChangeText={setPhone}
                placeholder="(83) 99999-9999"
                placeholderTextColor="#8A786D"
                returnKeyType="done"
                style={[styles.input, phoneError && styles.inputError]}
                value={phone}
              />
              {phoneError && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  Informe um telefone válido com DDD.
                </Text>
              )}
            </View>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Qual serviço você faz?</Text>
            <Text style={styles.sectionHint}>Selecione uma ou mais opções.</Text>
            <View style={styles.serviceGrid}>
              {SERVICES.map(({ label, icon }) => {
                const selected = selectedServices.includes(label);
                return (
                  <Pressable
                    key={label}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: selected }}
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
  fields: {
    gap: 12,
  },
  field: {
    gap: 6,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    color: '#3D2A20',
    fontSize: 15,
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: '#9F1D13',
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
