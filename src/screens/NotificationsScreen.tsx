import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

type NotificationsScreenProps = {
  onBack: () => void;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'proposal-accepted',
    title: 'Proposta aceita',
    description: 'Sua proposta para o serviço de pintura foi aceita.',
    time: 'Hoje, 10:30',
    read: false,
  },
  {
    id: 'new-message',
    title: 'Nova mensagem',
    description: 'Um cliente enviou uma mensagem sobre a visita técnica.',
    time: 'Hoje, 09:15',
    read: false,
  },
  {
    id: 'job-update',
    title: 'Atualização de serviço',
    description: 'O status do serviço de reparo foi atualizado.',
    time: 'Ontem, 16:40',
    read: true,
  },
];

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandWrap}>
          <BrandWordmark />
        </View>

        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>
            Notificações
          </Text>
          <Text style={styles.subtitle}>Acompanhe as novidades dos seus serviços</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Recentes</Text>
              <Text style={styles.cardSubtitle}>
                {unreadCount > 0
                  ? `${unreadCount} não ${unreadCount === 1 ? 'lida' : 'lidas'}`
                  : 'Tudo em dia'}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Marcar todas as notificações como lidas"
              disabled={unreadCount === 0}
              onPress={markAllAsRead}
              style={({ pressed }) => [
                styles.markAllButton,
                unreadCount === 0 && styles.markAllButtonDisabled,
                pressed && unreadCount > 0 && styles.pressed,
              ]}
            >
              <Text style={styles.markAllLabel}>Marcar todas como lidas</Text>
            </Pressable>
          </View>

          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <View key={notification.id}>
                {index > 0 && <View style={styles.divider} />}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${notification.title}. ${notification.read ? 'Lida' : 'Não lida'}. ${notification.time}`}
                  accessibilityState={{ selected: notification.read }}
                  onPress={() => markAsRead(notification.id)}
                  style={({ pressed }) => [
                    styles.notification,
                    !notification.read && styles.unreadNotification,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.indicatorColumn}>
                    <View
                      style={[
                        styles.readIndicator,
                        notification.read && styles.readIndicatorRead,
                      ]}
                    />
                  </View>
                  <View style={styles.notificationCopy}>
                    <View style={styles.notificationTitleRow}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {!notification.read && (
                        <Text style={styles.unreadLabel}>Nova</Text>
                      )}
                    </View>
                    <Text style={styles.description}>{notification.description}</Text>
                    <Text style={styles.time}>{notification.time}</Text>
                  </View>
                </Pressable>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Sem notificações</Text>
              <Text style={styles.emptyDescription}>
                Quando houver novidades, elas aparecerão aqui.
              </Text>
            </View>
          )}

          <Text style={styles.demoNote}>
            Exemplos de notificações para demonstração.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar ao perfil"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backLabel}>Voltar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FF5A00',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  brandWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFF1E8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    shadowColor: '#1B1B1B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingBottom: 12,
  },
  cardTitle: {
    color: '#26344B',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: 2,
  },
  markAllButton: {
    maxWidth: '52%',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  markAllButtonDisabled: {
    opacity: 0.45,
  },
  markAllLabel: {
    color: '#C4490D',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    textAlign: 'right',
  },
  notification: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  unreadNotification: {
    backgroundColor: '#FFF8F3',
  },
  indicatorColumn: {
    width: 20,
    alignItems: 'center',
    paddingTop: 5,
  },
  readIndicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FF6410',
  },
  readIndicatorRead: {
    backgroundColor: '#D5D5D5',
  },
  notificationCopy: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  notificationTitle: {
    flex: 1,
    color: '#26344B',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '800',
  },
  unreadLabel: {
    color: '#C4490D',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
  },
  description: {
    color: '#5E5E5E',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  time: {
    color: '#858585',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  emptyTitle: {
    color: '#26344B',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  emptyDescription: {
    color: '#6A6A6A',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  demoNote: {
    color: '#858585',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 12,
  },
  backButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  backLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
