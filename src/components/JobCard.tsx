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
      accessibilityLabel={`${job.title}, ${job.location}, ${job.distance}`}
      onPress={() => onPress(job)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        accessibilityLabel={`Foto de uma obra para a vaga de ${job.category}`}
        source={{ uri: job.imageUrl }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{job.category}</Text>
        <View style={styles.footer}>
          <Text style={styles.pin}>●</Text>
          <Text style={styles.location}>{job.distance}</Text>
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
    paddingTop: 8,
    paddingBottom: 9,
  },
  title: {
    color: '#171717',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    minHeight: 27,
    gap: 5,
  },
  pin: {
    color: '#FF6410',
    fontSize: 14,
    fontWeight: '800',
  },
  location: {
    color: '#171717',
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.88,
  },
});
