import { customResponsiveHeight, customResponsiveWidth } from "helpers/helpers";
import { Platform, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Fonts from "styles/fonts";
import colors, { Palette } from "./colors";

export const isDesktop = responsiveWidth(100) > responsiveHeight(100);
export const gutters = customResponsiveWidth(5.33);

const containerCenter = {
  justifyContent: "center",
  alignItems: "center",
};

const mainShadows = {
  shadowColor: "#C1CBDE",

  shadowOpacity: Platform.OS !== "ios" ? 0.5 : 0.5,
  shadowRadius: 25,
  shadowOffset: {
    width: 0,
    height: Platform.OS !== "ios" ? 2 : 4,
  },

  elevation: 5,
};

const separatorHorizontal = {
  width: "100%",
  height: 1,
  marginVertical: customResponsiveHeight(2),
  backgroundColor: Palette.halfGrey,
};

const styles = StyleSheet.create({
  containerCenter,
  mainShadows,

  containerMain: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: gutters,
  },
  containerRow: {
    // width: "100%",
    flexDirection: "row",
  },
  containerSpaceBetween: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerItem: {
    padding: gutters,
    backgroundColor: Palette.white,
    borderRadius: 10,
  },

  containerButton: {
    ...containerCenter,
    backgroundColor: Palette.red,
    padding: "5%",
    paddingVertical: "1%",
    borderRadius: 150,
  },
  containerRound: {
    ...containerCenter,
    height: 40,
    width: 40,
    borderRadius: 500,
    overflow: "hidden",
  },

  textInputContainer: {
    backgroundColor: "rgba(255,255,255,0.4)",
    paddingVertical: customResponsiveHeight(1.8),
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  textInputStyle: {
    ...Fonts.regular(16),
    color: Palette.white,
    padding: 0,
  },

  containerWithBorder: {
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: Palette.halfGrey,
    borderWidth: 1,
  },

  notificationIcon: {
    position: "absolute",
    top: 0,
    right: -5,
    backgroundColor: Palette.red,
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  separatorHorizontal,

  separatorHorizontalLarge: {
    ...separatorHorizontal,
    marginHorizontal: -gutters,
    marginVertical: 2 * gutters,
    backgroundColor: Palette.superLightGrey,
    height: 20,
    width: responsiveWidth(100),
  },

  separatorHorizontalWithoutPadding: {
    ...separatorHorizontal,
    marginHorizontal: 0,
  },

  separatorVertical: {
    width: 1,
    height: "100%",
    backgroundColor: Palette.halfGrey,
  },
});

export default styles;
