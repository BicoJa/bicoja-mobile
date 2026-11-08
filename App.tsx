import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Job } from './src/types';
import {
  ChangePhoneScreen,
  type ChangePhoneValues,
} from './src/screens/ChangePhoneScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { JobDetailsScreen } from './src/screens/JobDetailsScreen';
import { JobsScreen } from './src/screens/JobsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MyJobsScreen } from './src/screens/MyJobsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { RegisterFormValues, RegisterScreen } from './src/screens/RegisterScreen';
import { RegistrationScreen } from './src/screens/RegistrationScreen';

type UserRole = 'trabalhador' | 'contratante';
type Screen =
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'registration'
  | 'jobs'
  | 'myJobs'
  | 'details'
  | 'chat'
  | 'profile'
  | 'changePhone';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [role, setRole] = useState<UserRole>('trabalhador');
  const [userName, setUserName] = useState('');
  const [profession, setProfession] = useState('Profissional');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsOrigin, setDetailsOrigin] = useState<'jobs' | 'myJobs'>('jobs');

  const handleLogin = (_credentials: { email: string; password: string }) => {
    setScreen('jobs');
  };

  const handleRegister = ({ fullName }: RegisterFormValues) => {
    setUserName(fullName);
    setRole('trabalhador');
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
        {screen === 'login' && (
          <LoginScreen
            onContinue={handleLogin}
            onForgotPassword={() => setScreen('forgotPassword')}
            onRegister={() => setScreen('register')}
          />
        )}
        {screen === 'forgotPassword' && (
          <ForgotPasswordScreen
            onSendInstructions={() => {
              Alert.alert(
                'Recuperação indisponível',
                'O envio das instruções ainda não está conectado a um serviço de autenticação.',
              );
            }}
            onLogin={() => setScreen('login')}
          />
        )}
        {screen === 'register' && (
          <RegisterScreen
            onRegister={handleRegister}
            onLogin={() => setScreen('login')}
          />
        )}
        {screen === 'registration' && (
          <RegistrationScreen
            role={role}
            onBack={() => setScreen('login')}
            onContinue={(selectedServices) => {
              setUserName((currentName) =>
                currentName || (role === 'trabalhador' ? 'profissional' : 'cliente'),
              );
              if (role === 'trabalhador') {
                setProfession(selectedServices.join(', '));
              }
              setScreen('jobs');
            }}
          />
        )}
        {screen === 'jobs' && (
          <JobsScreen
            role={role}
            userName={userName}
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
            profession={profession}
            onOpenJobs={() => setScreen('jobs')}
            onOpenMyJobs={() => setScreen('myJobs')}
            onSignOut={() => setScreen('login')}
            onChangePhone={() => setScreen('changePhone')}
          />
        )}
        {screen === 'changePhone' && (
          <ChangePhoneScreen
            onSave={(_values: ChangePhoneValues) => {
              Alert.alert(
                'Alteração indisponível',
                'A atualização do telefone ainda não está conectada a um serviço de conta.',
              );
            }}
            onCancel={() => setScreen('profile')}
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
