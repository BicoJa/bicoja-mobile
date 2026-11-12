import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { Job } from './src/types';
import {
  ChangePhoneScreen,
  type ChangePhoneValues,
} from './src/screens/ChangePhoneScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { CreateJobScreen, type CreateJobValues } from './src/screens/CreateJobScreen';
import { EditSkillsScreen } from './src/screens/EditSkillsScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { JobDetailsScreen } from './src/screens/JobDetailsScreen';
import { JobsScreen } from './src/screens/JobsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { MyJobsScreen } from './src/screens/MyJobsScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { RegisterFormValues, RegisterScreen } from './src/screens/RegisterScreen';
import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';

type UserRole = 'trabalhador' | 'contratante';
type Screen =
  | 'roleSelection'
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'registration'
  | 'jobs'
  | 'myJobs'
  | 'details'
  | 'chat'
  | 'profile'
  | 'changePhone'
  | 'editSkills'
  | 'notifications'
  | 'createJob';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [role, setRole] = useState<UserRole>('trabalhador');
  const [userName, setUserName] = useState('');
  const [profession, setProfession] = useState('Profissional');
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsOrigin, setDetailsOrigin] = useState<'jobs' | 'myJobs'>('jobs');

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
      console.log('A enviar requisição de login para:', `${apiUrl}/api/auth/login`);

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login com sucesso:', data);
        setScreen('roleSelection');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro de rede ao tentar fazer login:', error);
      Alert.alert('Erro de Rede', 'Não foi possível ligar ao servidor backend.');
    }
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
        {screen === 'roleSelection' && (
          <RoleSelectionScreen
            onSelectRole={(selectedRole) => {
              setRole(selectedRole);
              setScreen('registration');
            }}
          />
        )}
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
            onBack={() => setScreen('roleSelection')}
            onContinue={(selectedServices) => {
              setUserName((currentName) =>
                currentName || (role === 'trabalhador' ? 'profissional' : 'cliente'),
              );
              if (role === 'trabalhador') {
                setSkills(selectedServices);
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
            onCreateJob={() => setScreen('createJob')}
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
            onEditSkills={() => setScreen('editSkills')}
            onOpenNotifications={() => setScreen('notifications')}
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
        {screen === 'editSkills' && (
          <EditSkillsScreen
            skills={skills}
            onSave={(updatedSkills) => {
              setSkills(updatedSkills);
              setProfession(updatedSkills.join(', '));
              setScreen('profile');
            }}
            onCancel={() => setScreen('profile')}
          />
        )}
        {screen === 'notifications' && (
          <NotificationsScreen onBack={() => setScreen('profile')} />
        )}
        {screen === 'createJob' && (
          <CreateJobScreen
            onPublish={(_values: CreateJobValues) => {
              setScreen('jobs');
              Alert.alert(
                'Publicação indisponível',
                'Os dados foram validados, mas a publicação ainda não está conectada a um serviço de vagas.',
              );
            }}
            onCancel={() => setScreen('jobs')}
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