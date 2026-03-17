import { Pressable, StyleSheet, View } from "react-native";

import { getMathToyTheme } from "@/components/math-toy/theme";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ToyButtonVariant = "pink" | "purple" | "soft";

type ToyButtonProps = Readonly<{
  label: string;
  onPress: () => void;
  variant?: ToyButtonVariant;
}>;

export function ToyButton({
  label,
  onPress,
  variant = "pink",
}: ToyButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = getMathToyTheme(colorScheme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      {({ pressed }) => (
        <>
          <View
            pointerEvents="none"
            style={[
              styles.keyBase,
              variant === "pink" && { backgroundColor: theme.keyPinkBase },
              variant === "purple" && { backgroundColor: theme.keyPurpleBase },
              variant === "soft" && { backgroundColor: theme.keySoftBase },
              pressed && styles.keyBasePressed,
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.keyTop,
              variant === "pink" && {
                backgroundColor: theme.keyPinkTop,
                borderColor: theme.keyPinkBorder,
              },
              variant === "purple" && {
                backgroundColor: theme.keyPurpleTop,
                borderColor: theme.keyPurpleBorder,
              },
              variant === "soft" && {
                backgroundColor: theme.keySoftTop,
                borderColor: theme.keySoftBorder,
              },
              pressed ? styles.keyTopPressed : styles.keyTopRaised,
            ]}
          >
            <ThemedText
              style={[
                styles.label,
                variant === "soft"
                  ? { color: theme.keyLabelSoft }
                  : { color: theme.keyLabelSolid },
              ]}
            >
              {label}
            </ThemedText>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 14,
    minWidth: 56,
    position: "relative",
  },
  buttonPressed: {
    opacity: 0.98,
  },
  keyBase: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 8,
    bottom: 0,
    borderRadius: 14,
  },
  keyBasePressed: {
    top: 9,
  },
  keyTop: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: 14,
    paddingHorizontal: 14,
    top: 0,
    bottom: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  keyTopRaised: {
    transform: [{ translateY: 0 }],
  },
  keyTopPressed: {
    transform: [{ translateY: 5 }],
  },
  label: {
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
