import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type JobDetailSectionProps = {
  title: string;
  children: ReactNode;
};

export function JobDetailSection({ title, children }: JobDetailSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FF6410',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    color: '#171717',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '800',
    marginBottom: 9,
  },
  content: {
    gap: 8,
  },
});
