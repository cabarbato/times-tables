export type ToyColorScheme = "light" | "dark";

export type MathToyTheme = {
  sparkleTop: string;
  sparkleBottom: string;
  title: string;
  subtitle: string;
  panelBackground: string;
  panelBorder: string;
  stepperValue: string;
  keyPinkTop: string;
  keyPinkBase: string;
  keyPinkBorder: string;
  keyPurpleTop: string;
  keyPurpleBase: string;
  keyPurpleBorder: string;
  keySoftTop: string;
  keySoftBase: string;
  keySoftBorder: string;
  keyLabelSolid: string;
  keyLabelSoft: string;
  numberKeyTop: string;
  numberKeyBase: string;
  numberKeyBorder: string;
  numberKeyAnswer: string;
};

const lightTheme: MathToyTheme = {
  sparkleTop: "rgba(255, 31, 134, 0.24)",
  sparkleBottom: "rgba(255, 82, 181, 0.2)",
  title: "#b10066",
  subtitle: "#8c2c6b",
  panelBackground: "rgba(255, 233, 246, 0.96)",
  panelBorder: "#ff8cc9",
  stepperValue: "#c60073",
  keyPinkTop: "#ff2f92",
  keyPinkBase: "#b10066",
  keyPinkBorder: "#ff86c1",
  keyPurpleTop: "#ff5fc0",
  keyPurpleBase: "#9b2d73",
  keyPurpleBorder: "#ff9ad1",
  keySoftTop: "#ffe8f5",
  keySoftBase: "#e5a5ca",
  keySoftBorder: "#ffacd7",
  keyLabelSolid: "#fff9fd",
  keyLabelSoft: "#9a1767",
  numberKeyTop: "#ffc0e3",
  numberKeyBase: "#df86b9",
  numberKeyBorder: "#ff6cb8",
  numberKeyAnswer: "#b70072",
};

const darkTheme: MathToyTheme = {
  sparkleTop: "rgba(255, 74, 167, 0.16)",
  sparkleBottom: "rgba(255, 96, 186, 0.14)",
  title: "#f4b7db",
  subtitle: "#e6b2d4",
  panelBackground: "rgba(55, 31, 45, 0.93)",
  panelBorder: "#7d3b62",
  stepperValue: "#ffabd6",
  keyPinkTop: "#c65091",
  keyPinkBase: "#7d2c5a",
  keyPinkBorder: "#dd7cae",
  keyPurpleTop: "#b44c8d",
  keyPurpleBase: "#6c2d54",
  keyPurpleBorder: "#d378ae",
  keySoftTop: "#463741",
  keySoftBase: "#2d222a",
  keySoftBorder: "#7f4d6b",
  keyLabelSolid: "#fff9fd",
  keyLabelSoft: "#f2d3e6",
  numberKeyTop: "#57384d",
  numberKeyBase: "#3a2434",
  numberKeyBorder: "#8f4f73",
  numberKeyAnswer: "#ffb0d8",
};

export function getMathToyTheme(colorScheme: ToyColorScheme): MathToyTheme {
  return colorScheme === "dark" ? darkTheme : lightTheme;
}
