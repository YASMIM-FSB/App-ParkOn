import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

interface FloatingInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  placeholder,
  secureTextEntry,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelAnim]);

  const labelStyle = {
    position: "absolute" as const,
    left: 0,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#328B21"],
    }),
  };

  return (
    <View style={{ paddingTop: 18, marginBottom: 25, width: "100%" }}>
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={[styles.input, { borderBottomWidth: 1, borderBottomColor: "#ccc" }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const LoginScreen: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 100, // pequeno atraso para suavizar
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    // 👇 O fundo escuro fica aqui — sempre visível
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        {/* 👇 Apenas o conteúdo anima (não o fundo) */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/img_PO/LogoParkOn.png")}
            style={{ marginBottom: 30, width: 250, height: 100 }}
          />

          <Text style={styles.title}>Login</Text>

          <FloatingInput placeholder="Email" keyboardType="email-address" />
          <FloatingInput placeholder="Senha" secureTextEntry />

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/dashboard")}
            activeOpacity={0.8}
          >
            
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
            <Text style={styles.criarConta}>Criar Conta</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192124",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "#0caa0cff",
    padding: 0,
  },
  button: {
    backgroundColor: "#328B21",
    padding: 15,
    width: 270,
    borderRadius: 50,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
  },
  criarConta: {
    marginTop: 15,
    color: "#fff",
    fontSize: 18,
  },
});
