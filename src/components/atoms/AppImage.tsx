import { ImageProps, Skeleton } from "@rneui/base";
import { Image } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ImageURISource } from "react-native";

export interface AppImageProps extends Omit<ImageProps, "source"> {
  source: ImageURISource;
}

export const AppImage = (props: AppImageProps) => {
  const { source, ...rest } = props;
  const [image, setImage] = useState<ImageURISource>(source);
  const [placeholder, setPlaceholder] = useState<React.ReactElement>();
  const defaultImage = require("../../../assets/placeholder.webp");

  useEffect(() => {
    const isValid = source.uri !== undefined;

    if (isValid) {
      setPlaceholder(<Skeleton style={{ height: "100%", width: "100%" }} />);
      setImage(source);
      return;
    }
    setImage(defaultImage);
    setPlaceholder(undefined);
  }, [source]);

  const handleImageError = () => {
    setPlaceholder(defaultImage);
  };

  return (
    <Image
      source={image}
      PlaceholderContent={placeholder}
      borderRadius={10}
      style={{
        width: "100%",
      }}
      containerStyle={{
        width: 90,
        height: 90,
        borderRadius: 10,
      }}
      resizeMode={"cover"}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default AppImage;
