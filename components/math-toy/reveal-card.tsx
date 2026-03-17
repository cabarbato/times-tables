import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { getMathToyTheme } from "@/components/math-toy/theme";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";

type RevealCardProps = Readonly<{
  formula: string;
  answer: string;
  revealed: boolean;
  onToggle: () => void;
}>;

export function RevealCard({
  formula,
  answer,
  revealed,
  onToggle,
}: RevealCardProps) {
  const revealAnim = useRef(new Animated.Value(revealed ? 1 : 0)).current;
  const colorScheme = useColorScheme() ?? "light";
  const theme = getMathToyTheme(colorScheme);

  useEffect(() => {
    Animated.spring(revealAnim, {
      toValue: revealed ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 85,
    }).start();
  }, [revealed, revealAnim]);

  const answerStyle = {
    opacity: revealAnim,
    maxHeight: revealAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 34],
    }),
    transform: [
      {
        translateY: revealAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-8, 0],
        }),
      },
    ],
  } as const;

  return (
    <Pressable
      onPress={onToggle}
      style={styles.cardButton}
      accessibilityRole="button"
      accessibilityLabel={`Reveal answer for ${formula}`}
    >
      {({ pressed }) => (
        <>
          <View
            pointerEvents="none"
            style={[
              styles.keyBase,
              { backgroundColor: theme.numberKeyBase },
              pressed && styles.keyBasePressed,
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.keyTop,
              {
                backgroundColor: theme.numberKeyTop,
                borderColor: theme.numberKeyBorder,
              },
              pressed ? styles.keyTopPressed : styles.keyTopRaised,
            ]}
          >
            <ThemedText style={styles.formula}>{formula}</ThemedText>
            <Animated.View style={[styles.answerWrap, answerStyle]}>
              <ThemedText
                style={[styles.answer, { color: theme.numberKeyAnswer }]}
              >
                {answer}
              </ThemedText>
            </Animated.View>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardButton: {
    flex: 1,
    minHeight: 92,
    borderRadius: 16,
    position: "relative",
  },
  keyBase: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 8,
    bottom: 0,
    borderRadius: 16,
  },
  keyBasePressed: {
    top: 9,
  },
  keyTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 8,
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
    borderWidth: 1,
  },
  keyTopRaised: {
    transform: [{ translateY: 0 }],
  },
  keyTopPressed: {
    transform: [{ translateY: 5 }],
  },
  formula: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
  answerWrap: {
    overflow: "hidden",
    alignItems: "center",
  },
  answer: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "900",
  },
});
