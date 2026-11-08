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

export type ChangePhoneValues = {
  currentPassword: string;
  newPhone: string;
};

type ChangePhoneScreenProps = {
  onSave: (values: ChangePhoneValues) => void;
  onCancel: () => void;
};

type ChangePhoneField = 'currentPassword' | 'newPhone' | 'confirmPhone';
type FormErrors = Partial<Record<ChangePhoneField, string>>;

export function ChangePhoneScreen({ onSave, onCancel }: ChangePhoneScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    const phoneDigits = newPhone.replace(/\D/g, '');
    const confirmationDigits = confirmPhone.replace(/\D/g, '');

    if (!currentPassword) {
      errors.currentPassword = 'Informe sua palavra-passe atual.';
    }
    if (!newPhone.trim()) {
      errors.newPhone = 'Informe o novo número de telemóvel.';
    } else if (phoneDigits.length < 8) {
      errors.newPhone = 'Informe um número de telemóvel válido.';
    }
    if (!confirmPhone.trim()) {
      errors.confirmPhone = 'Confirme o novo número de telemóvel.';
    } else if (phoneDigits !== confirmationDigits) {
      errors.confirmPhone = 'Os números de telemóvel não coincidem.';
    }

    return errors;
  };

  const errors = submitted ? validate() : {};

  const handleSubmit = () => {
    setSubmitted(true);
    if (Object.keys(validate()).length > 0) {
      return;
    }

    onSave({
      currentPassword,
      newPhone: newPhone.trim(),
    });
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandWrap}>
            <BrandWordmark />
          </View>

          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.title}>
              Alterar telefone
            </Text>
            <Text style={styles.subtitle}>
              Confirme sua identidade e informe o novo número
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Palavra-passe atual</Text>
              <TextInput
                accessibilityLabel="Palavra-passe atual"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setCurrentPassword}
                placeholder="Digite sua palavra-passe"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                secureTextEntry
                style={styles.input}
                value={currentPassword}
              />
              {errors.currentPassword && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {errors.currentPassword}
                </Text>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Novo telemóvel / WhatsApp</Text>
              <TextInput
                accessibilityLabel="Novo número de telemóvel ou WhatsApp"
                keyboardType="phone-pad"
                onChangeText={setNewPhone}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                style={styles.input}
                value={newPhone}
              />
              {errors.newPhone && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {errors.newPhone}
                </Text>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirme o novo telemóvel</Text>
              <TextInput
                accessibilityLabel="Confirme o novo número de telemóvel"
                keyboardType="phone-pad"
                onChangeText={setConfirmPhone}
                onSubmitEditing={handleSubmit}
                placeholder="Digite novamente"
                placeholderTextColor="#8A8A8A"
                returnKeyType="done"
                style={styles.input}
                value={confirmPhone}
              />
              {errors.confirmPhone && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {errors.confirmPhone}
                </Text>
              )}
            </View>

            <PrimaryButton
              title="Atualizar telefone"
              onPress={handleSubmit}
              backgroundColor="#FF6410"
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cancelar e voltar ao perfil"
              onPress={onCancel}
              style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FF5A00',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  brandWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFF1E8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 14,
    shadowColor: '#1B1B1B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 4,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#26344B',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    color: '#1D1D1D',
    fontSize: 15,
    fontWeight: '600',
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: '#B3261E',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginTop: 8,
  },
  cancelText: {
    color: '#FF6410',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
