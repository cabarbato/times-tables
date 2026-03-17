import { StyleSheet, View } from "react-native";

import { StepperControl } from "@/components/math-toy/stepper-control";
import { getMathToyTheme } from "@/components/math-toy/theme";
import { ToyButton } from "@/components/math-toy/toy-button";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ConfigPanelProps = Readonly<{
  rows: number;
  cols: number;
  minRows: number;
  maxRows: number;
  minCols: number;
  maxCols: number;
  onRowsChange: (next: number) => void;
  onColsChange: (next: number) => void;
  onResetAnswers: () => void;
}>;

export function ConfigPanel({
  rows,
  cols,
  minRows,
  maxRows,
  minCols,
  maxCols,
  onRowsChange,
  onColsChange,
  onResetAnswers,
}: ConfigPanelProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = getMathToyTheme(colorScheme);

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.panelBorder,
          backgroundColor: theme.panelBackground,
        },
      ]}
    >
      <StepperControl
        label="Rows"
        value={rows}
        min={minRows}
        max={maxRows}
        onChange={onRowsChange}
      />
      <StepperControl
        label="Columns"
        value={cols}
        min={minCols}
        max={maxCols}
        onChange={onColsChange}
      />
      <ToyButton
        label="Hide all answers"
        variant="soft"
        onPress={onResetAnswers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 14,
    gap: 14,
    borderWidth: 1,
  },
});
