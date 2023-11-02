import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export function getDistance(
  point1: { latitude: number; longitude: number },
  point2: { latitude: number; longitude: number }
) {
  let lat1 = point1.latitude;
  let lat2 = point2.latitude;
  let lon1 = point1.longitude;
  let lon2 = point2.longitude;
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return (dist * 0.8684).toFixed(0);
}

export function customResponsiveWidth(value: number) {
  let coef = responsiveWidth(100) / responsiveHeight(100);
  let handledResponsiveWidth = 0;

  if (responsiveWidth(100) > 1024) {
    handledResponsiveWidth = value * 5;
  } else if (coef > 1) {
    handledResponsiveWidth = responsiveWidth(value) * (coef - 0.95);
  } else {
    handledResponsiveWidth = responsiveWidth(value);
  }

  return handledResponsiveWidth;
}

export function customResponsiveHeight(value: number) {
  let coef = responsiveHeight(100) / responsiveWidth(100);
  let handledResponsiveHeight = 0;

  if (coef < 1) {
    handledResponsiveHeight = responsiveHeight(value);
  } else {
    handledResponsiveHeight = responsiveHeight(value);
  }

  return handledResponsiveHeight;
}
