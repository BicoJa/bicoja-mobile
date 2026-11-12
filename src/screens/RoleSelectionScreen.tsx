import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';

type RoleSelectionScreenProps = {
  onSelectRole: (role: 'trabalhador' | 'contratante') => void;
};

const ROLES = [
  {
    role: 'trabalhador',
    image: require('../../assets/role-selection/worker.png'),
    title: 'Quero TRABALHAR',
    description: 'Sou profissional da construção',
  },
  {
    role: 'contratante',
    image: require('../../assets/role-selection/contractor.png'),
    title: 'Quero CONTRATAR',
    description: 'Quero contratar um profissional',
  },
] as const;

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  return (
    <View style={styles.screen}>
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
          {ROLES.map(({ role, image, title, description }) => (
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
                <Image
                  accessibilityIgnoresInvertColors
                  accessible={false}
                  resizeMode="contain"
                  source={image}
                  style={styles.roleImage}
                />
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FF5A00',
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
    gap: 16,
  },
  option: {
    minHeight: 136,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#5C2200',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  optionPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconBox: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
  },
  roleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  optionCopy: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  optionTitle: {
    color: '#26344B',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '900',
    textAlign: 'center',
  },
  optionDescription: {
    color: '#5E5E5E',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  chevron: {
    color: '#B8460A',
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
