import { StyleSheet, Text, View } from 'react-native';

type OutlinedWordProps = {
  text: string;
  color: string;
};

const OUTLINE_DIRECTIONS = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const createOutlineOffsets = (radii: number[]) =>
  radii.flatMap((radius) =>
    OUTLINE_DIRECTIONS.map(({ x, y }) => ({ x: x * radius, y: y * radius })),
  );

const DARK_OUTLINE_OFFSETS = createOutlineOffsets([3, 4]);
const LIGHT_OUTLINE_OFFSETS = createOutlineOffsets([1, 2]);
const WORDMARK_INSET = 6;

function OutlinedWord({ text, color }: OutlinedWordProps) {
  return (
    <View style={styles.outlinedWord}>
      <Text style={[styles.wordText, styles.wordSpacer]}>{text}</Text>
      <Text
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.wordText,
          styles.wordLayer,
          styles.wordShadow,
          { color: '#0B2348' },
        ]}
      >
        {text}
      </Text>
      {DARK_OUTLINE_OFFSETS.map(({ x, y }, index) => (
        <Text
          key={`dark-${index}`}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[
            styles.wordText,
            styles.wordLayer,
            {
              color: '#12366B',
              left: WORDMARK_INSET + x,
              top: WORDMARK_INSET + y,
            },
          ]}
        >
          {text}
        </Text>
      ))}
      {LIGHT_OUTLINE_OFFSETS.map(({ x, y }, index) => (
        <Text
          key={`light-${index}`}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[
            styles.wordText,
            styles.wordLayer,
            {
              color: '#55C9F2',
              left: WORDMARK_INSET + x,
              top: WORDMARK_INSET + y,
            },
          ]}
        >
          {text}
        </Text>
      ))}
      <Text
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.wordText,
          styles.wordLayer,
          { color, left: WORDMARK_INSET, top: WORDMARK_INSET },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

export function BrandWordmark() {
  return (
    <View accessibilityLabel="Bico Já" accessible style={styles.wordmark}>
      <OutlinedWord text="BICO" color="#FFFFFF" />
      <OutlinedWord text="JÁ" color="#FF6410" />
    </View>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'visible',
  },
  outlinedWord: {
    position: 'relative',
    marginHorizontal: -4,
  },
  wordText: {
    fontSize: 40,
    lineHeight: 50,
    letterSpacing: 0.4,
    fontWeight: '900',
  },
  wordSpacer: {
    opacity: 0,
    paddingHorizontal: WORDMARK_INSET,
    paddingVertical: WORDMARK_INSET,
  },
  wordLayer: {
    position: 'absolute',
    left: WORDMARK_INSET,
    top: WORDMARK_INSET,
  },
  wordShadow: {
    transform: [{ translateX: 2 }, { translateY: 3 }],
  },
});
