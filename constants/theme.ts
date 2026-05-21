import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

export type AppTheme = "light" | "dark";
export const THEME_KEY = "APP_THEME";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    card: "#F8FAFC",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    card: "#1E293B",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "monospace",
  },
});

export const getStoredTheme = async (): Promise<AppTheme> => {
  const t = await AsyncStorage.getItem(THEME_KEY);
  return t === "dark" ? "dark" : "light";
};

export const storeTheme = async (theme: AppTheme) => {
  await AsyncStorage.setItem(THEME_KEY, theme);
};
