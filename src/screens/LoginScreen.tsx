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

export type LoginCredentials = {
  email: string;
  password: string;
};

type LoginScreenProps = {
  onContinue: (credentials: LoginCredentials) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
};

export function LoginScreen({
  onContinue,
  onForgotPassword,
  onRegister,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitDisabled = !email.trim() || !password.trim();

  const handleSubmit = () => {
    if (isSubmitDisabled) {
      return;
    }

    onContinue({
      email: email.trim(),
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
            <Text style={styles.title}>Bem-vindo(a)</Text>
            <Text style={styles.subtitle}>Entre para continuar</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>E-mail ou telefone</Text>
              <TextInput
                accessibilityLabel="E-mail ou telefone"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="nome@email.com"
                placeholderTextColor="#8A8A8A"
                style={styles.input}
                value={email}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Palavra-passe</Text>
              <TextInput
                accessibilityLabel="Palavra-passe"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#8A8A8A"
                secureTextEntry
                style={styles.input}
                value={password}
              />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Recuperar palavra-passe"
              onPress={onForgotPassword}
              style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
            >
              <Text style={styles.linkText}>Esqueceu a palavra-passe?</Text>
            </Pressable>

            <PrimaryButton
              title="Entrar"
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
              backgroundColor="#FF6410"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Criar conta"
              onPress={onRegister}
              style={({ pressed }) => [styles.registerButton, pressed && styles.pressed]}
            >
              <Text style={styles.registerText}>Ainda não tem conta? Registe-se</Text>
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
  },
  subtitle: {
    color: '#D9D9D9',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
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
  linkButton: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 20,
  },
  linkText: {
    color: '#193C83',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    color: '#6A6A6A',
    fontSize: 12,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: '#FFF5EE',
    borderWidth: 1,
    borderColor: '#FFD9C4',
  },
  registerText: {
    color: '#FF6410',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
