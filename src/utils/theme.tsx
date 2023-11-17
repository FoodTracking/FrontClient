import { Theme } from "@react-navigation/native/src/types";
import { createTheme, CreateThemeOptions } from "@rneui/themed";

// Override background color of the default theme
export const FollowFoodTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};

export const theme: CreateThemeOptions = createTheme({
  lightColors: {
    primary: "rgb(28, 28, 30)",
    background: "rgb(255, 255, 255)",
    error: "rgb(255, 59, 48)",
  },
  components: {
    Text: {
      style: {
        fontSize: 15,
      },
    },
  },
});
