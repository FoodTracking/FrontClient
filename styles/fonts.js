import { Palette } from "./colors";

export const scaleFromFigma = (s) => s * 1.05;

const base = (fontSize, color) => ({
  fontSize: scaleFromFigma(fontSize),
  color: color || Palette.black,
});

const Fonts = {
  // bold = 700
  bold: (fontSize, color) => ({
    ...base(fontSize, color),
    fontFamily: "DMSans-Bold",
  }),
  // semibold = 600
  semibold: (fontSize, color) => ({
    ...base(fontSize, color),
    fontWeight: "600",
  }),
  // medium = 500
  medium: (fontSize, color) => ({
    ...base(fontSize, color),
  }),
  // regular = 400
  regular: (fontSize, color) => ({
    ...base(fontSize, color),
  }),
};

export default Fonts;
