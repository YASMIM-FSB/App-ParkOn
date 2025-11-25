// app/SplashScreen.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1.5,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(0), // tempo que o splash fica na tela
    ]).start(() => {
      onFinish(); // chama quando a animação terminar
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/img_PO/LogoParkOn.png")}
        style={[styles.logo, { opacity, transform: [{ scale }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#192124",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
