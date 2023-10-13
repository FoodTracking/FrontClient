import {responsiveFontSize, responsiveWidth,} from 'react-native-responsive-dimensions';
import Colors from './colors';

export const scaleFromFigma = s => {
  return s;

  const size = responsiveFontSize(s / 7.6);
  if (responsiveWidth(100) > 500) {
    return size / 2;
  }
  return size;
};

const Fonts = {
  regular: (fontSize, color = Colors.text.main) => ({
    fontSize: scaleFromFigma(fontSize),
    fontWeight: '400',
    color,
  }),
  medium: (fontSize, color = Colors.text.main) => ({
    fontSize: scaleFromFigma(fontSize),
    fontWeight: '500',
    color,
  }),
  semibold: (fontSize, color = Colors.text.main) => ({
    fontSize: scaleFromFigma(fontSize),
    fontWeight: '600',
    color,
  }),
  bold: (fontSize, color = Colors.text.main) => ({
    fontSize: scaleFromFigma(fontSize),
    fontWeight: 'bold',
    color,
  }),
};

export default Fonts;
