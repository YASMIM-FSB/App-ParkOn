import React, { useState } from "react";
import {
  SafeAreaView, View, Text, StyleSheet, Pressable,
  FlatList, StatusBar, Platform, Image, Modal, TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router"; // ⬅️ navegação


// Imagens
const imgParking = require("../assets/img_PO/Icone.png");
const imgSun     = require("../assets/img_PO/lightmode.png");
const imgReview  = require("../assets/img_PO/manutencao.png");
const imgReserva = require("../assets/img_PO/reserva.png");
const imgCalc    = require("../assets/img_PO/calculadora.png");
const imgCar     = require("../assets/img_PO/meuCarro.png");
const imgMenu    = require("../assets/img_PO/hamburguer.png");
const imgChevron = require("../assets/img_PO/seta.png");

// Gradientes
const DEFAULT_CARD_GRADIENT: string[] = ["#233942", "#488E92"];
const RESERVA_GRADIENT: string[]      = ["#2B4445", "#488E92"];
const SQUARE_GRADIENT: string[]       = ["#2B4445", "#488E92"];
const HEADER_BG_GRADIENT: string[]    = ["#0B1923", "#0F2A33"];

type ActionItem = {
  key: string;
  title: string;
  subtitle: string;
  image: any;
  gradient?: string[];
};

export default function DashboardScreen() {
  const [shoppingVisible, setShoppingVisible] = useState(false);
  const [selectedShopping, setSelectedShopping] = useState<string | null>(null);

  const actions: ActionItem[] = [
    { key: "rev",   title: "REVISÃO",     subtitle: "Manutenção",       image: imgReview,  gradient: DEFAULT_CARD_GRADIENT },
    { key: "res",   title: "RESERVAS",    subtitle: "De vagas",         image: imgReserva, gradient: RESERVA_GRADIENT },
    { key: "calc",  title: "CALCULADORA", subtitle: "De combustível",   image: imgCalc,    gradient: DEFAULT_CARD_GRADIENT },
    { key: "dados", title: "DADOS",       subtitle: "Do meu carro",     image: imgCar,     gradient: DEFAULT_CARD_GRADIENT },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "light-content"} />
      <LinearGradient colors={HEADER_BG_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.iconBtn} android_ripple={{ color: "#ffffff22", borderless: true }}>
            <Image source={imgMenu} style={styles.iconImage} />
          </Pressable>

          <View style={styles.locationCenter}>
            <Pressable style={styles.locationBtn}>
              <Text style={styles.city}>São Bernardo do Campo</Text>
              <Image source={imgChevron} style={[styles.iconImage, { width: 16, height: 16, marginLeft: 6 }]} />
            </Pressable>
          </View>

          {/* espaçador */}
          <View style={styles.iconBtn} />
        </View>

        {/* Campo "Selecione o Shopping" (abre modal) */}
        <View style={styles.selectorWrap}>
          <Pressable style={styles.selector} onPress={() => setShoppingVisible(true)}>
            <Text style={styles.selectorPlaceholder}>Selecione o Shopping</Text>
            {!!selectedShopping && <Text style={styles.selectorValue}>{selectedShopping}</Text>}
          </Pressable>
        </View>

        {/* Botões rápidos */}
        <View style={styles.quickRow}>
          <GradientSquare>
            <Image source={imgParking} style={styles.quickImage} />
          </GradientSquare>
          <GradientSquare>
            <Image source={imgSun} style={styles.quickImage} />
          </GradientSquare>
        </View>

        {/* Saldo */}
        <LinearGradient colors={["#41EB25", "#0B2404"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.balance}>
          <Text style={styles.balanceText}>Saldo: 0 créditos</Text>
        </LinearGradient>

        {/* Grid */}
        <FlatList
          data={actions}
          keyExtractor={(it) => it.key}
          numColumns={2}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          style={{ marginTop: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <ActionCard
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              gradient={item.gradient ?? DEFAULT_CARD_GRADIENT}
            />
          )}
        />

        {/* MODAL do Shopping */}
        <Modal visible={shoppingVisible} animationType="fade" transparent>
          <TouchableWithoutFeedback onPress={() => setShoppingVisible(false)}>
            <View style={styles.modalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.selectorModalBox}>
                  <Text style={styles.modalTitle}>Selecione o Shopping</Text>

                  <Pressable
                    style={({ pressed }) => [styles.modalItem, pressed && { opacity: 0.85 }]}
                    onPress={() => {
                      const nome = "Shopping Inteligente";
                      setSelectedShopping(nome);
                      setShoppingVisible(false);
                      // 👉 navega para a tela mapeamento, enviando o nome do shopping
                      router.push({ pathname: "/mapeamento", params: { shopping: nome } });
                    }}
                  >
                    <Text style={styles.modalItemText}>Shopping Inteligente</Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

function GradientSquare({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient colors={SQUARE_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.square}>
      {children}
    </LinearGradient>
  );
}

function ActionCard({
  title,
  subtitle,
  image,
  gradient,
}: {
  title: string;
  subtitle: string;
  image: any;
  gradient: string[];
}) {
  return (
    <Pressable style={({ pressed }) => [styles.cardShadow, pressed && { transform: [{ scale: 0.98 }] }]}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <View style={styles.cardIconWrap}>
          <Image source={image} style={styles.cardImage} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b1923" },
  container: { flex: 1, paddingTop: 8 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  iconBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },

  // localização centralizada
  locationCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
  locationBtn: { flexDirection: "row", alignItems: "center" },
  city: { color: "#fff", fontWeight: "700", fontSize: 16 },
  iconImage: { width: 22, height: 22, resizeMode: "contain" },

  /* Campo seletor (Pressable) */
  selectorWrap: { paddingHorizontal: 20, marginTop: 12 },
  selector: {
    height: 64,
    borderRadius: 16,
    backgroundColor: "#e8f1f3",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
  },
  selectorPlaceholder: { color: "#A0B4BB", fontSize: 14 },
  selectorValue: { color: "#0b1923", fontSize: 18, marginTop: 6, fontWeight: "600" },

  /* Quick buttons */
  quickRow: { flexDirection: "row", gap: 16, paddingHorizontal: 20, marginTop: 20 },
  square: { flex: 1, height: 64, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  quickImage: { width: 36, height: 32, resizeMode: "contain" },

  /* Saldo */
  balance: {
    marginHorizontal: 20,
    marginTop: 16,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  balanceText: { color: "#ffffff", fontWeight: "800", fontSize: 16, letterSpacing: 0.2 },

  /* Cards */
  cardShadow: { flex: 1, borderRadius: 16 },
  card: {
    flex: 1,
    minHeight: 140,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  cardIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  cardImage: { width: 40, height: 40, resizeMode: "contain" },
  cardTitle: { color: "#eaf6f0", fontWeight: "800", fontSize: 14, letterSpacing: 0.6, textAlign: "center" },
  cardSubtitle: { color: "#c9d8de", fontSize: 12, marginTop: 2, textAlign: "center" },

  /* Modal do Shopping */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  selectorModalBox: {
    marginTop: 146,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalTitle: { color: "#9AA8AE", fontSize: 15, marginBottom: 10 },
  modalItem: { paddingVertical: 8 },
  modalItemText: { color: "#0b1923", fontSize: 18, fontWeight: "600" },
});
