import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { Job } from '../types';

type ChatScreenProps = {
  job: Job;
  onBackToDetails: () => void;
  onBackToJobs: () => void;
  onOpenMyJobs: () => void;
  onOpenProfile: () => void;
};

type ChatMessage = {
  id: number;
  text: string;
};

export function ChatScreen({
  job,
  onBackToDetails,
  onBackToJobs,
  onOpenMyJobs,
  onOpenProfile,
}: ChatScreenProps) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const nextMessageId = useRef(0);
  const messageListRef = useRef<ScrollViewInstance | null>(null);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: nextMessageId.current++, text },
    ]);
    setDraft('');
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.chatArea}
      >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar aos detalhes do serviço"
          onPress={onBackToDetails}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <View style={styles.headerCopy}>
          <Text accessibilityRole="header" style={styles.headerTitle}>Chat de texto</Text>
          <Text numberOfLines={1} style={styles.clientName}>{job.contractor}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar ao mural de vagas"
          hitSlop={8}
          onPress={onBackToJobs}
          style={({ pressed }) => [styles.jobsButton, pressed && styles.pressed]}
        >
          <Text style={styles.jobsButtonText}>Mural</Text>
        </Pressable>
      </View>

      <View style={styles.jobSummary}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobLocation}>{job.location}</Text>
        <Text style={styles.visitPrompt}>
          Use este espaço para alinhar a visita técnica e a avaliação do serviço no local.
        </Text>
      </View>

      <View accessibilityRole="alert" style={styles.prototypeNotice}>
        <Text style={styles.prototypeNoticeText}>
          Protótipo: as mensagens ficam apenas nesta tela e não são enviadas ao cliente.
        </Text>
      </View>

      <ScrollView
        ref={messageListRef}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => messageListRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Alinhe a visita por texto</Text>
            <Text style={styles.emptyCopy}>
              Combine data, horário e informações necessárias para avaliar o serviço.
            </Text>
          </View>
        ) : (
          messages.map((message) => (
            <View key={message.id} style={styles.messageRow}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>Agora · somente neste dispositivo</Text>
              </View>
            </View>
          ))
        )}
        <Pressable
          accessibilityRole="button"
          onPress={onBackToJobs}
          style={({ pressed }) => [styles.returnLink, pressed && styles.pressed]}
        >
          <Text style={styles.returnLinkText}>Voltar ao mural de vagas</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Escreva uma mensagem sobre a visita técnica"
          editable
          multiline
          onChangeText={setDraft}
          onSubmitEditing={sendMessage}
          placeholder="Escreva sobre a visita técnica..."
          placeholderTextColor="#777777"
          returnKeyType="send"
          style={styles.input}
          value={draft}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Adicionar mensagem à demonstração"
          disabled={!draft.trim()}
          onPress={sendMessage}
          style={({ pressed }) => [
            styles.sendButton,
            !draft.trim() && styles.sendButtonDisabled,
            pressed && draft.trim() && styles.pressed,
          ]}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>
      <BottomNavigation
        active="jobs"
        onJobsPress={onBackToJobs}
        onMyJobsPress={onOpenMyJobs}
        onProfilePress={onOpenProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  chatArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6410',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 36,
  },
  headerCopy: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  clientName: {
    color: '#FFF1E8',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  jobsButton: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  jobsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  jobSummary: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  jobTitle: {
    color: '#222222',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
  },
  jobLocation: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  visitPrompt: {
    color: '#555555',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  prototypeNotice: {
    backgroundColor: '#FFF1E8',
    borderBottomWidth: 1,
    borderBottomColor: '#F2D9C9',
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  prototypeNoticeText: {
    color: '#8A3A13',
    fontSize: 11,
    lineHeight: 16,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyState: {
    alignSelf: 'center',
    maxWidth: 300,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 18,
  },
  emptyTitle: {
    color: '#292929',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyCopy: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  messageRow: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  messageBubble: {
    maxWidth: '86%',
    borderRadius: 16,
    borderBottomRightRadius: 5,
    backgroundColor: '#FFF1E8',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  messageText: {
    color: '#292929',
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    color: '#777777',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 5,
  },
  returnLink: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 4,
  },
  returnLinkText: {
    color: '#B8430A',
    fontSize: 12,
    fontWeight: '700',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 9,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    maxHeight: 112,
    minHeight: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F8F8F8',
    color: '#222222',
    fontSize: 14,
    lineHeight: 19,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  sendButton: {
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: '#E6530A',
    paddingHorizontal: 15,
  },
  sendButtonDisabled: {
    backgroundColor: '#B8B8B8',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.8,
  },
});
