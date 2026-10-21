import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Job } from './src/types';
import { ChatScreen } from './src/screens/ChatScreen';
import { JobDetailsScreen } from './src/screens/JobDetailsScreen';
import { JobsScreen } from './src/screens/JobsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MyJobsScreen } from './src/screens/MyJobsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { RegistrationScreen } from './src/screens/RegistrationScreen';

type UserRole = 'trabalhador' | 'contratante';
type Screen =
  | 'login'
  | 'registration'
  | 'jobs'
  | 'myJobs'
  | 'details'
  | 'chat'
  | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [role, setRole] = useState<UserRole>('trabalhador');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsOrigin, setDetailsOrigin] = useState<'jobs' | 'myJobs'>('jobs');

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setScreen('registration');
  };

  const handleSelectJob = (job: Job, origin: 'jobs' | 'myJobs') => {
    setSelectedJob(job);
    setDetailsOrigin(origin);
    setScreen('details');
  };

  const handleOpenChat = (job: Job) => {
    setSelectedJob(job);
    setDetailsOrigin('myJobs');
    setScreen('chat');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar style="dark" />
        {screen === 'login' && <LoginScreen onContinue={handleSelectRole} />}
        {screen === 'registration' && (
          <RegistrationScreen
            role={role}
            onBack={() => setScreen('login')}
            onContinue={() => setScreen('jobs')}
          />
        )}
        {screen === 'jobs' && (
          <JobsScreen
            role={role}
            onSelectJob={(job) => handleSelectJob(job, 'jobs')}
            onOpenMyJobs={() => setScreen('myJobs')}
            onOpenProfile={() => setScreen('profile')}
          />
        )}
        {screen === 'myJobs' && (
          <MyJobsScreen
            onSelectJob={(job: Job) => handleSelectJob(job, 'myJobs')}
            onOpenChat={handleOpenChat}
            onOpenJobs={() => setScreen('jobs')}
            onOpenProfile={() => setScreen('profile')}
          />
        )}
        {screen === 'details' && selectedJob && (
          <JobDetailsScreen
            job={selectedJob}
            onBack={() => setScreen(detailsOrigin)}
            onOpenMyJobs={() => setScreen('myJobs')}
            onOpenProfile={() => setScreen('profile')}
            onOpenChat={() => setScreen('chat')}
            activeNavigation={detailsOrigin}
          />
        )}
        {screen === 'chat' && selectedJob && (
          <ChatScreen
            job={selectedJob}
            onBackToDetails={() => setScreen('details')}
            onBackToJobs={() => setScreen('jobs')}
            onOpenMyJobs={() => setScreen('myJobs')}
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
});
