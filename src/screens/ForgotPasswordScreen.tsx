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

type ForgotPasswordScreenProps = {
  onSendInstructions: (identifier: string) => void;
  onLogin: () => void;
};

export function ForgotPasswordScreen({
  onSendInstructions,
  onLogin,
}: ForgotPasswordScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const trimmedIdentifier = identifier.trim();
  const isEmail = trimmedIdentifier.includes('@');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentifier);
  const isValidPhone = trimmedIdentifier.replace(/\D/g, '').length >= 8;
  const isValidIdentifier = isEmail ? isValidEmail : isValidPhone;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!isValidIdentifier) {
      return;
    }

    onSendInstructions(trimmedIdentifier);
  };

  const errorMessage = submitted
    ? !trimmedIdentifier
      ? 'Informe o e-mail ou telefone associado à conta.'
      : !isValidIdentifier
        ? 'Informe um e-mail ou telefone válido.'
        : undefined
    : undefined;

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
              Recuperar palavra-passe
            </Text>
            <Text style={styles.subtitle}>
              Informe os dados associados à sua conta
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.description}>
              Enviaremos instruções para recuperar o acesso à sua conta.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>E-mail ou telefone</Text>
              <TextInput
                accessibilityLabel="E-mail ou telefone associado à conta"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(value) => {
                  setIdentifier(value);
                  if (submitted) {
                    setSubmitted(false);
                  }
                }}
                onSubmitEditing={handleSubmit}
                placeholder="nome@email.com ou telefone"
                placeholderTextColor="#8A8A8A"
                returnKeyType="send"
                style={styles.input}
                value={identifier}
              />
              {errorMessage && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {errorMessage}
                </Text>
              )}
            </View>

            <PrimaryButton
              title="Enviar instruções"
              onPress={handleSubmit}
              backgroundColor="#FF6410"
            />

            <View style={styles.loginPrompt}>
              <Text style={styles.promptText}>Lembrou-se da palavra-passe?</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Voltar para entrar"
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
    paddingBottom: 16,
    shadowColor: '#1B1B1B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 4,
  },
  description: {
    color: '#5E5E5E',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  fieldGroup: {
    marginBottom: 20,
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
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
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
