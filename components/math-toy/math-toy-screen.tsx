import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ConfigPanel } from "@/components/math-toy/config-panel";
import { RevealCard } from "@/components/math-toy/reveal-card";
import { getMathToyTheme } from "@/components/math-toy/theme";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

const MIN_ROWS = 1;
const MAX_ROWS = 12;
const MIN_COLS = 1;
const MAX_COLS = 12;

export type MathToyMode = "multiplication" | "division" | "squareRoots";

type MathCell = {
  key: string;
  formula: string;
  answer: string;
};

type MathToyScreenProps = Readonly<{
  mode: MathToyMode;
}>;

const MODE_COPY: Record<MathToyMode, { title: string; subtitle: string }> = {
  multiplication: {
    title: "Multiplication Magic",
    subtitle: "Tap any card to reveal the answer",
  },
  division: {
    title: "Division Squares",
    subtitle: "Practice division in matching square patterns",
  },
  squareRoots: {
    title: "Squares Sparkles",
    subtitle: "Tap a number button to reveal its square",
  },
};

function buildCell(
  mode: MathToyMode,
  row: number,
  col: number,
  cols: number,
): MathCell {
  if (mode === "multiplication") {
    const left = row;
    const right = col + 1;

    return {
      key: `${left}-${right}`,
      formula: `${left} x ${right}`,
      answer: `= ${left * right}`,
    };
  }

  if (mode === "division") {
    const divisor = col + 1;
    const quotient = row + 1;
    const dividend = divisor * quotient;

    return {
      key: `${dividend}-${divisor}`,
      formula: `${dividend} ÷ ${divisor}`,
      answer: `= ${quotient}`,
    };
  }

  const n = row * cols + col + 1;
  return {
    key: `sq-${n}`,
    formula: `${n}²`,
    answer: `= ${n * n}`,
  };
}

export function MathToyScreen({ mode }: MathToyScreenProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = getMathToyTheme(colorScheme);
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const showConfig = mode !== "squareRoots";

  const cells = useMemo(
    () =>
      Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: cols }).map((__, colIndex) =>
          buildCell(mode, rowIndex, colIndex, cols),
        ),
      ),
    [mode, rows, cols],
  );

  useEffect(() => {
    const valid = new Set(cells.flat().map((cell) => cell.key));
    setRevealed(
      (prev) => new Set(Array.from(prev).filter((key) => valid.has(key))),
    );
  }, [cells]);

  const toggleCard = (key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <ThemedView style={styles.screen}>
      <View
        style={[styles.sparkleTop, { backgroundColor: theme.sparkleTop }]}
      />
      <View
        style={[styles.sparkleBottom, { backgroundColor: theme.sparkleBottom }]}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={[styles.title, { color: theme.title }]}>
          {MODE_COPY[mode].title}
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={[styles.subtitle, { color: theme.subtitle }]}
        >
          {MODE_COPY[mode].subtitle}
        </ThemedText>

        {showConfig && (
          <ConfigPanel
            rows={rows}
            cols={cols}
            minRows={MIN_ROWS}
            maxRows={MAX_ROWS}
            minCols={MIN_COLS}
            maxCols={MAX_COLS}
            onRowsChange={setRows}
            onColsChange={setCols}
            onResetAnswers={() => setRevealed(new Set())}
          />
        )}

        <View style={styles.gridContainer}>
          {cells.map((row) => (
            <View key={`row-${row[0]?.key ?? "empty"}`} style={styles.gridRow}>
              {row.map((cell) => (
                <RevealCard
                  key={cell.key}
                  formula={cell.formula}
                  answer={cell.answer}
                  revealed={revealed.has(cell.key)}
                  onToggle={() => toggleCard(cell.key)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  sparkleTop: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 999,
    top: -80,
    right: -80,
  },
  sparkleBottom: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
    bottom: -120,
    left: -90,
  },
  title: {
    marginTop: 10,
    fontSize: 34,
    lineHeight: 38,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 12,
  },
  gridContainer: {
    gap: 10,
  },
  gridRow: {
    flexDirection: "row",
    gap: 10,
  },
});
