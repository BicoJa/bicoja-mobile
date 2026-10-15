import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

type UserRole = 'trabalhador' | 'contratante';

type LoginScreenProps = {
  onContinue: (role: UserRole) => void;
};

export function LoginScreen({ onContinue }: LoginScreenProps) {
  const [voiceInfoVisible, setVoiceInfoVisible] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topLine}>
        <View style={styles.logoMark}>
          <Text style={styles.logoLetter}>B</Text>
        </View>
        <Text style={styles.brand}>Bico<Text style={styles.brandAccent}>Já</Text></Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>TRABALHO PERTO DE VOCÊ</Text>
        <Text style={styles.title}>Bons encontros{'\n'}começam aqui.</Text>
        <Text style={styles.subtitle}>
          Encontre oportunidades na construção civil ou monte sua equipe com facilidade.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>Como você quer usar o Bico Já?</Text>
        <Text style={styles.hint}>Escolha seu perfil para continuar</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => onContinue('trabalhador')}
          style={({ pressed }) => [styles.roleCard, pressed && styles.pressed]}
        >
          <View style={styles.roleIcon}><Text style={styles.roleIconText}>TR</Text></View>
          <View style={styles.roleCopy}>
            <Text style={styles.roleTitle}>Quero trabalhar</Text>
            <Text style={styles.roleDescription}>Encontrar um bico perto de mim</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => onContinue('contratante')}
          style={({ pressed }) => [styles.roleCard, pressed && styles.pressed]}
        >
          <View style={[styles.roleIcon, styles.contractorIcon]}>
            <Text style={styles.roleIconText}>OB</Text>
          </View>
          <View style={styles.roleCopy}>
            <Text style={styles.roleTitle}>Quero contratar</Text>
            <Text style={styles.roleDescription}>Encontrar profissionais para minha obra</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.separator} />
        <PrimaryButton
          title="Acessar com voz"
          variant="secondary"
          onPress={() => setVoiceInfoVisible((visible) => !visible)}
        />
        {voiceInfoVisible && (
          <Text accessibilityLiveRegion="polite" style={styles.voiceInfo}>
            O assistente por voz estará disponível em uma próxima etapa do projeto.
          </Text>
        )}
      </View>

      <View style={styles.accessible}>
        <View style={styles.accessibleDot} />
        <Text style={styles.accessibleText}>Simples, rápido e feito para você.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 28,
    backgroundColor: '#FFF9F3',
    justifyContent: 'center',
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 42,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#E66A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
  },
  brand: {
    color: '#30241D',
    fontSize: 21,
    fontWeight: '800',
  },
  brandAccent: {
    color: '#E66A2E',
  },
  hero: {
    marginBottom: 26,
  },
  eyebrow: {
    color: '#BC5428',
    fontSize: 11,
    letterSpacing: 1.7,
    fontWeight: '800',
    marginBottom: 12,
  },
  title: {
    color: '#30241D',
    fontSize: 36,
    lineHeight: 41,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: '#6F574A',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
    maxWidth: 340,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1E8E0',
  },
  question: {
    color: '#30241D',
    fontSize: 19,
    fontWeight: '800',
  },
  hint: {
    color: '#8A786E',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 18,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 76,
    borderWidth: 1,
    borderColor: '#F1E8E0',
    borderRadius: 17,
    padding: 12,
    marginBottom: 10,
  },
  roleIcon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FFF0E4',
  },
  contractorIcon: {
    backgroundColor: '#F5F0E4',
  },
  roleIconText: {
    color: '#B94A1C',
    fontSize: 13,
    fontWeight: '800',
  },
  roleCopy: {
    flex: 1,
    marginLeft: 12,
  },
  roleTitle: {
    color: '#30241D',
    fontSize: 15,
    fontWeight: '700',
  },
  roleDescription: {
    color: '#8A786E',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  arrow: {
    color: '#B94A1C',
    fontSize: 27,
    paddingHorizontal: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#F4EDE7',
    marginTop: 6,
    marginBottom: 15,
  },
  voiceInfo: {
    color: '#6F574A',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    textAlign: 'center',
  },
  accessible: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 22,
  },
  accessibleDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#5E9D75',
  },
  accessibleText: {
    color: '#8A786E',
    fontSize: 12,
  },
  pressed: {
    opacity: 0.8,
  },
});
