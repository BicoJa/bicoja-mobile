import { Pressable, StyleSheet, Text, View } from 'react-native';

type BottomNavigationProps = {
  active: 'jobs' | 'myJobs' | 'profile';
  onJobsPress: () => void;
  onMyJobsPress: () => void;
  onProfilePress: () => void;
};

export function BottomNavigation({
  active,
  onJobsPress,
  onMyJobsPress,
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
        <Text style={[styles.icon, active === 'jobs' && styles.activeText]}>⌂</Text>
        <Text style={[styles.label, active === 'jobs' && styles.activeText]}>Início</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: active === 'myJobs' }}
        onPress={onMyJobsPress}
        style={styles.item}
      >
        <Text style={[styles.icon, active === 'myJobs' && styles.activeText]}>▤</Text>
        <Text style={[styles.label, active === 'myJobs' && styles.activeText]}>Meus bicos</Text>
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
    borderTopColor: '#E5E5E5',
    paddingTop: 7,
    paddingBottom: 10,
  },
  item: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  icon: {
    color: '#777777',
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    color: '#666666',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeText: {
    color: '#FF6410',
  },
});
