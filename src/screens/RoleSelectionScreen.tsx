import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';

type RoleSelectionScreenProps = {
  onSelectRole: (role: 'trabalhador' | 'contratante') => void;
};

const ROLES = [
  {
    role: 'trabalhador',
    icon: '👷',
    title: 'Quero TRABALHAR',
    description: 'Sou profissional da construção',
  },
  {
    role: 'contratante',
    icon: '🏗️',
    title: 'Quero CONTRATAR',
    description: 'Quero contratar um profissional',
  },
] as const;

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  return (
    <LinearGradient
      colors={['#FF4F00', '#FF7900', '#FFE956']}
      locations={[0, 0.56, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brand}>
          <BrandWordmark />
        </View>

        <Text style={styles.tagline}>
          Conectando com quem faz com quem precisa.
        </Text>

        <Text accessibilityRole="header" style={styles.heading}>
          Como você quer usar o app?
        </Text>

        <View style={styles.options}>
          {ROLES.map(({ role, icon, title, description }) => (
            <Pressable
              key={role}
              accessibilityRole="button"
              accessibilityLabel={`${title}. ${description}`}
              onPress={() => onSelectRole(role)}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>{icon}</Text>
              </View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionDescription}>{description}</Text>
              </View>
              <Text accessibilityElementsHidden style={styles.chevron}>
                ›
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.footer}>
          Conectando pessoas e oportunidades.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 42,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 26,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 26,
  },
  options: {
    gap: 20,
  },
  option: {
    minHeight: 136,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    shadowColor: '#74320F',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.17,
    shadowRadius: 12,
    elevation: 5,
  },
  optionPressed: {
    opacity: 0.86,
  },
  iconBox: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#FFF0D2',
    marginRight: 18,
  },
  icon: {
    fontSize: 42,
  },
  optionCopy: {
    flex: 1,
    gap: 8,
  },
  optionTitle: {
    color: '#C66B3B',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
  },
  optionDescription: {
    color: '#75594A',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  chevron: {
    color: '#CF5A19',
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    marginLeft: 8,
  },
  footer: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 40,
  },
});
