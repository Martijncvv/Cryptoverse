import { TextStyle } from "react-native";

export const Styles = {
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16,
    xxl: 20,
    xxxl: 24,
    max: 100,
  },
  borderRadius: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    circle: "50%",
  },

  typography: {
    fontSize: {
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
      title: 34,
      display: 40,
      hero: 72,
      max: 100,
    },
    fontWeight: {
      thin: "100" as TextStyle["fontWeight"],
      extraLight: "200" as TextStyle["fontWeight"],
      light: "300" as TextStyle["fontWeight"],
      normal: "400" as TextStyle["fontWeight"],
      medium: "500" as TextStyle["fontWeight"],
      semiBold: "600" as TextStyle["fontWeight"],
      bold: "700" as TextStyle["fontWeight"],
      extraBold: "800" as TextStyle["fontWeight"],
      black: "900" as TextStyle["fontWeight"],
    },
  },
};
