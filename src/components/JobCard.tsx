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
      accessibilityLabel={`${job.title}, categoria ${job.category}, ${job.location}, ${job.distance}. Orçamento após visita.`}
      onPress={() => onPress(job)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        accessibilityLabel={`Foto de uma obra para a vaga de ${job.category}`}
        source={{ uri: job.imageUrl }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.categoryBadge}>
          <Text style={styles.category}>{job.category}</Text>
        </View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.location}>{job.location}</Text>
        <View style={styles.footer}>
          <Text style={styles.pin}>●</Text>
          <Text style={styles.distance}>{job.distance}</Text>
          <Text style={styles.quote}>Orçamento após visita</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#FF6410',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 88,
    backgroundColor: '#D7C4B2',
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 9,
    paddingBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#FFF1E8',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  category: {
    color: '#D94D08',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
  },
  title: {
    color: '#171717',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
    marginTop: 5,
  },
  location: {
    color: '#5A5A5A',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    minHeight: 27,
    gap: 4,
  },
  pin: {
    color: '#FF6410',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 2,
  },
  distance: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  quote: {
    color: '#6A6A6A',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.88,
  },
});
