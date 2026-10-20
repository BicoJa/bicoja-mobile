import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type UserRole = 'trabalhador' | 'contratante';

type LoginScreenProps = {
  onContinue: (role: UserRole) => void;
};

export function LoginScreen({ onContinue }: LoginScreenProps) {
  return (
    <LinearGradient
      colors={['#FF4F00', '#FF7900', '#FFB51B']}
      locations={[0, 0.56, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brand}>
          <Text style={styles.brandText}>
            BICO<Text style={styles.brandAccent}>JÁ</Text>
          </Text>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>CONECTANDO QUEM FAZ ACONTECER</Text>
          <Text style={styles.title}>Vamos criar seu perfil</Text>
          <Text style={styles.subtitle}>Escolha seu perfil para continuar</Text>
        </View>

        <View style={styles.profileOptions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Quero trabalhar"
            onPress={() => onContinue('trabalhador')}
            style={({ pressed }) => [styles.profileCard, pressed && styles.pressed]}
          >
            <View style={styles.profileIllustration}>
              <Text style={styles.profileEmoji}>👷</Text>
            </View>
            <View style={styles.profileCopy}>
              <Text style={styles.profileTitle}>Quero trabalhar</Text>
              <Text style={styles.profileDescription}>Encontre um bico perto de você</Text>
            </View>
            <Text accessibilityElementsHidden style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Quero contratar"
            onPress={() => onContinue('contratante')}
            style={({ pressed }) => [styles.profileCard, pressed && styles.pressed]}
          >
            <View style={[styles.profileIllustration, styles.contractorIllustration]}>
              <Text style={styles.profileEmoji}>🏗️</Text>
            </View>
            <View style={styles.profileCopy}>
              <Text style={styles.profileTitle}>Quero contratar</Text>
              <Text style={styles.profileDescription}>Encontre profissionais para sua obra</Text>
            </View>
            <Text accessibilityElementsHidden style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>Conectando pessoas e oportunidades.</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 30,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: 0.4,
    fontWeight: '900',
    textShadowColor: '#173D7A',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  brandAccent: {
    color: '#FFFFFF',
  },
  intro: {
    alignItems: 'center',
    marginBottom: 22,
  },
  eyebrow: {
    color: '#FFF1D4',
    fontSize: 11,
    letterSpacing: 1.8,
    fontWeight: '800',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  profileOptions: {
    gap: 12,
  },
  profileCard: {
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    padding: 12,
    shadowColor: '#8F3300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  profileIllustration: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#FFF0D8',
  },
  contractorIllustration: {
    backgroundColor: '#FFE3C2',
  },
  profileEmoji: {
    fontSize: 38,
  },
  profileCopy: {
    flex: 1,
    marginLeft: 14,
  },
  profileTitle: {
    color: '#A73C0D',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
  },
  profileDescription: {
    color: '#75503D',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  arrow: {
    color: '#E9500A',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  footer: {
    color: '#FFF7E8',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 22,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
});
