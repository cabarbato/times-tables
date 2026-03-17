import { StyleSheet, View } from "react-native";

import { getMathToyTheme } from "@/components/math-toy/theme";
import { ToyButton } from "@/components/math-toy/toy-button";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";

type StepperControlProps = Readonly<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}>;

export function StepperControl({
  label,
  value,
  min,
  max,
  onChange,
}: StepperControlProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = getMathToyTheme(colorScheme);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.controls}>
        <ToyButton
          label="-"
          variant="purple"
          onPress={() => onChange(Math.max(min, value - 1))}
        />
        <ThemedText style={[styles.value, { color: theme.stepperValue }]}>
          {value}
        </ThemedText>
        <ToyButton
          label="+"
          variant="pink"
          onPress={() => onChange(Math.min(max, value + 1))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "600",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  value: {
    minWidth: 50,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "800",
  },
});
