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

export type RegisterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

type RegisterScreenProps = {
  onRegister: (values: RegisterFormValues) => void;
  onLogin: () => void;
};

type RegisterField = keyof RegisterFormValues | 'confirmPassword';
type FormErrors = Partial<Record<RegisterField, string>>;

export function RegisterScreen({ onRegister, onLogin }: RegisterScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errors: FormErrors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Informe seu nome completo.';
    }
    if (!email.trim()) {
      errors.email = 'Informe seu e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Informe um e-mail válido.';
    }
    if (!phone.trim()) {
      errors.phone = 'Informe seu telefone ou WhatsApp.';
    }
    if (!password) {
      errors.password = 'Informe uma palavra-passe.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirme sua palavra-passe.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'As palavras-passe não coincidem.';
    }

    return errors;
  };

  const errors = submitted ? validate() : {};

  const handleSubmit = () => {
    setSubmitted(true);
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    onRegister({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
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
              Criar conta
            </Text>
            <Text style={styles.subtitle}>Preencha seus dados para começar</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                accessibilityLabel="Nome completo"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={setFullName}
                placeholder="Seu nome completo"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                style={styles.input}
                value={fullName}
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                accessibilityLabel="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="nome@email.com"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                style={styles.input}
                value={email}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Telefone / WhatsApp</Text>
              <TextInput
                accessibilityLabel="Telefone ou WhatsApp"
                keyboardType="phone-pad"
                onChangeText={setPhone}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                style={styles.input}
                value={phone}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Palavra-passe</Text>
              <TextInput
                accessibilityLabel="Palavra-passe"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
                placeholder="Digite sua palavra-passe"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                secureTextEntry
                style={styles.input}
                value={password}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirme a palavra-passe</Text>
              <TextInput
                accessibilityLabel="Confirme a palavra-passe"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setConfirmPassword}
                onSubmitEditing={handleSubmit}
                placeholder="Digite novamente"
                placeholderTextColor="#8A8A8A"
                returnKeyType="done"
                secureTextEntry
                style={styles.input}
                value={confirmPassword}
              />
              {errors.confirmPassword && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <PrimaryButton
              title="Criar Conta"
              onPress={handleSubmit}
              backgroundColor="#FF6410"
            />

            <View style={styles.loginPrompt}>
              <Text style={styles.promptText}>Já tem uma conta?</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Entrar na conta"
                onPress={onLogin}
                style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}
              >
                <Text style={styles.loginText}>Entre</Text>
              </Pressable>
            </View>
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
    paddingTop: 24,
    paddingBottom: 24,
  },
  brandWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#FFF1E8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 4,
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
    marginBottom: 12,
  },
  label: {
    color: '#26344B',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    color: '#1D1D1D',
    fontSize: 15,
    fontWeight: '600',
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  errorText: {
    color: '#B3261E',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  promptText: {
    color: '#5E5E5E',
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  loginText: {
    color: '#FF6410',
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.8,
  },
});
