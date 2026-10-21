import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';

type UserRole = 'trabalhador' | 'contratante';

type LoginScreenProps = {
  onContinue: (role: UserRole) => void;
};

export function LoginScreen({ onContinue }: LoginScreenProps) {
  return (
    <LinearGradient
      colors={['#FF4F00', '#FF7900', '#FFE956']}
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
          <BrandWordmark />
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>
            Conectando com quem faz com quem precisa.
          </Text>
          <Text style={styles.subtitle}>Como você quer usar o app?</Text>
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
              <Text style={styles.profileTitle}>Quero TRABALHAR</Text>
              <Text style={styles.profileDescription}>
                Sou profissional da construção
              </Text>
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
              <Text style={styles.profileTitle}>Quero CONTRATAR</Text>
              <Text style={styles.profileDescription}>
                Quero contratar um profissional
              </Text>
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
    paddingTop: 52,
    paddingBottom: 24,
  },
  brand: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  intro: {
    alignItems: 'center',
    marginBottom: 20,
  },
  eyebrow: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
    marginTop: 12,
  },
  profileOptions: {
    gap: 12,
  },
  profileCard: {
    minHeight: 108,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#8F3300',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  profileIllustration: {
    width: 68,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
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
    marginLeft: 12,
  },
  profileTitle: {
    color: '#E26B25',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  profileDescription: {
    color: '#75503D',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 4,
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
