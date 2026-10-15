import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Job } from '../types';

type JobCardProps = {
  job: Job;
  onPress: (job: Job) => void;
};

export function JobCard({ job, onPress }: JobCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${job.title}, ${job.location}, diária de ${job.dailyRate} reais`}
      onPress={() => onPress(job)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: job.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.category}>{job.category}</Text>
          <Text style={styles.postedAt}>{job.postedAt}</Text>
        </View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.contractor}>{job.contractor}</Text>
        <Text style={styles.location}>{job.location} · {job.distance}</Text>
        <View style={styles.footer}>
          <Text style={styles.rate}>
            R$ {job.dailyRate}<Text style={styles.perDay}> / dia</Text>
          </Text>
          <Text style={styles.more}>Ver detalhes ›</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1E8E0',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 142,
    backgroundColor: '#F4E3D6',
  },
  content: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  category: {
    color: '#B94A1C',
    backgroundColor: '#FFF0E4',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  postedAt: {
    color: '#8A786E',
    fontSize: 12,
  },
  title: {
    color: '#30241D',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  contractor: {
    color: '#6F574A',
    fontSize: 14,
    marginTop: 4,
  },
  location: {
    color: '#8A786E',
    fontSize: 13,
    marginTop: 9,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F4EDE7',
    marginTop: 14,
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rate: {
    color: '#30241D',
    fontSize: 18,
    fontWeight: '800',
  },
  perDay: {
    color: '#8A786E',
    fontSize: 12,
    fontWeight: '500',
  },
  more: {
    color: '#C64F1D',
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.88,
  },
});
