import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageStyle,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface CloudProps {
  size: number;
  speed: number;
  startPosition: number;
  topOffset: number | "auto" | `${number}%`;
  direction?: "left" | "right";
}

export const Cloud: React.FC<CloudProps> = ({
  size,
  speed,
  startPosition,
  topOffset,
  direction = "left",
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const moveAnim = useRef(new Animated.Value(startPosition)).current;

  useEffect(() => {
    const duration = ((windowWidth + size) / speed) * 1000; // Convert speed to duration
    const toValue = direction === "left" ? -size : windowWidth;

    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
  }, [windowWidth, size, speed, moveAnim, direction]);

  const getTransform = () => {
    return [{ translateX: moveAnim }];
  };

  return (
    <Animated.Image
      source={require("@/assets/images/cloud-3.png")}
      style={[
        styles.cloud,
        {
          width: size,
          height: size / 2,
          transform: getTransform(),
          top: topOffset,
        },
      ]}
    />
  );
};

interface Styles {
  cloud: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  cloud: {
    zIndex: -1,
    position: "absolute",
    resizeMode: "contain",
  },
});
