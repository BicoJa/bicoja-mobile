import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Job } from './src/types';
import { JobDetailsScreen } from './src/screens/JobDetailsScreen';
import { JobsScreen } from './src/screens/JobsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MyJobsScreen } from './src/screens/MyJobsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

type UserRole = 'trabalhador' | 'contratante';
type Screen = 'login' | 'jobs' | 'myJobs' | 'details' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [role, setRole] = useState<UserRole>('trabalhador');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setScreen('jobs');
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setScreen('details');
  };

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      {screen === 'login' && <LoginScreen onContinue={handleSelectRole} />}
      {screen === 'jobs' && (
        <JobsScreen
          role={role}
          onSelectJob={handleSelectJob}
          onOpenProfile={() => setScreen('profile')}
        />
      )}
      {screen === 'myJobs' && (
        <MyJobsScreen
          onOpenJobs={() => setScreen('jobs')}
          onOpenProfile={() => setScreen('profile')}
        />
      )}
      {screen === 'details' && selectedJob && (
        <JobDetailsScreen
          job={selectedJob}
          onBack={() => setScreen('jobs')}
          onOpenProfile={() => setScreen('profile')}
        />
      )}
      {screen === 'profile' && (
        <ProfileScreen
          role={role}
          onOpenJobs={() => setScreen('jobs')}
          onOpenMyJobs={() => setScreen('myJobs')}
          onSignOut={() => setScreen('login')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
});
