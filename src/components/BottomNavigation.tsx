import { Pressable, StyleSheet, Text, View } from 'react-native';

type BottomNavigationProps = {
  active: 'jobs' | 'profile';
  onJobsPress: () => void;
  onProfilePress: () => void;
};

export function BottomNavigation({
  active,
  onJobsPress,
  onProfilePress,
}: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: active === 'jobs' }}
        onPress={onJobsPress}
        style={styles.item}
      >
        <Text style={[styles.icon, active === 'jobs' && styles.activeText]}>▤</Text>
        <Text style={[styles.label, active === 'jobs' && styles.activeText]}>Vagas</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: active === 'profile' }}
        onPress={onProfilePress}
        style={styles.item}
      >
        <Text style={[styles.icon, active === 'profile' && styles.activeText]}>◉</Text>
        <Text style={[styles.label, active === 'profile' && styles.activeText]}>Perfil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1E8E0',
    paddingTop: 10,
    paddingBottom: 18,
  },
  item: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    color: '#9A887D',
    fontSize: 19,
    fontWeight: '700',
  },
  label: {
    color: '#8A786E',
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: '#D95720',
  },
});
