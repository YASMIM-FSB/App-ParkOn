import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Alert,
  ColorValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

/** <<< TROQUE PARA O IP QUE ABRE NO CELULAR >>> */
const ESP32_IP = "https://172.20.10.2";

/** Gradientes tipados (evita erro de TS) */
const HEADER_BG: readonly ColorValue[] = ["#0B1923", "#0F2A33"];
const PANEL_BG:  readonly ColorValue[] = ["#475158", "#5D656B"];
const GRAD_RED:  readonly ColorValue[] = ["#FF3B30", "#9A0B0B"]; // ocupada
const GRAD_GRN:  readonly ColorValue[] = ["#41EB25", "#0B2404"]; // livre
const CTA_GRN:   readonly ColorValue[] = ["#41EB25", "#0B2404"];

type BackendStatus = { v1: boolean; v2: boolean; v3: boolean }; // true = ocupada
type Slot = { id: number; busy: boolean }; // busy=true -> ocupada

export default function MapeamentoScreen() {
  const [slots, setSlots] = useState<Slot[]>([
    { id: 1, busy: true },
    { id: 2, busy: true },
    { id: 3, busy: true },
  ]);
  const [selected, setSelected] = useState<number | null>(null);

  // DEBUG visual
  const [lastJson, setLastJson] = useState<string>("");
  const [lastErr, setLastErr] = useState<string>("");

  const fetchStatus = async () => {
    try {
      setLastErr("");
      const res = await fetch(`${ESP32_IP}/status`, { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BackendStatus = await res.json();
      setLastJson(JSON.stringify(data));

      // true = OCUPADA (vermelho). Se o seu firmware usar o inverso, inverta abaixo.
      setSlots([
        { id: 1, busy: !!data.v1 },
        { id: 2, busy: !!data.v2 },
        { id: 3, busy: !!data.v3 },
      ]);

      // Se a selecionada ficou ocupada, desmarca
      if (selected != null) {
        const arr = [data.v1, data.v2, data.v3];
        if (arr[selected - 1] === true) setSelected(null);
      }
    } catch (e: any) {
      setLastErr(e?.message ?? "Network request failed");
    }
  };

  useEffect(() => {
    fetchStatus();                     // carga inicial
    const id = setInterval(fetchStatus, 2000); // polling a cada 2s
    return () => clearInterval(id);
  }, []);

  const canReserve = useMemo(() => selected != null, [selected]);

  const handleSelectSlot = (id: number, busy: boolean) => {
    if (busy) {
      Alert.alert("Ocupada", `A vaga ${id} está ocupada.`);
      return;
    }
    setSelected(id);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "light-content"} />
      <LinearGradient colors={HEADER_BG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        {/* Header - voltar */}
        <View style={styles.header}>
          <Pressable onPress={() => router.replace("/dashboard")} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
        </View>

        {/* DEBUG de comunicação */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <Text style={{ color: "#9FB1B8", fontSize: 12 }}>
            IP: {ESP32_IP}  |  {lastErr ? "ERRO" : "OK"}
          </Text>
          {!!lastJson && <Text style={{ color: "#9FB1B8", fontSize: 12 }}>JSON: {lastJson}</Text>}
          {!!lastErr && <Text style={{ color: "#FF7A7A", fontSize: 12 }}>ERR: {lastErr}</Text>}
        </View>

        <Text style={styles.title}>Reserve sua vaga!</Text>

        {/* Painel das vagas */}
        <LinearGradient colors={PANEL_BG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.panel}>
          <View style={styles.slotsRow}>
            {slots.map((slot) => {
              const grad = slot.busy ? GRAD_RED : GRAD_GRN; // ocupada=vermelho, livre=verde
              const isSelected = selected === slot.id;
              return (
                <Pressable
                  key={slot.id}
                  onPress={() => handleSelectSlot(slot.id, slot.busy)}
                  style={({ pressed }) => [
                    styles.slotWrap,
                    isSelected && { transform: [{ scale: pressed ? 0.98 : 1.02 }] },
                  ]}
                >
                  <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.slot}>
                    <Text style={styles.slotNum}>{slot.id}</Text>
                  </LinearGradient>
                  <Text style={styles.slotCaption}>{slot.busy ? "Ocupada" : "Livre"}</Text>
                </Pressable>
              );
            })}
          </View>
        </LinearGradient>

        <Text style={styles.shoppingName}>Shopping Inteligente</Text>

        {/* Ver Rotas (navegação interna ou abra mapas se preferir) */}
        <Pressable
          onPress={() => router.push("/rotas")}
          style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}
        >
          <LinearGradient colors={CTA_GRN} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.routesBtn}>
            <Text style={styles.routesBtnText}>Ver Rotas</Text>
          </LinearGradient>
        </Pressable>

        {/* Selecionada / Reservar */}
        <Text style={styles.selectedLabel}>Vaga selecionada</Text>
        <Text style={[styles.selectedBig, { color: canReserve ? "#41EB25" : "#8CA0A6" }]}>
          {selected ?? "-"}
        </Text>

        <Pressable
          disabled={!canReserve}
          onPress={() => Alert.alert("Reservado", `Vaga ${selected} reservada!`)}
          style={({ pressed }) => [
            styles.reserveBtn,
            !canReserve && { opacity: 0.45 },
            pressed && canReserve && { transform: [{ scale: 0.98 }] },
          ]}
        >
          <LinearGradient colors={CTA_GRN} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.reserveBtnLeft}>
            <Text style={styles.playIcon}>›</Text>
          </LinearGradient>
          <View style={styles.reserveBtnRight}>
            <Text style={styles.reserveText}>Reservar</Text>
          </View>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B1923" },
  container: { flex: 1, paddingTop: 8 },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backIcon: { color: "#fff", fontSize: 26, marginRight: 6 },
  backText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  title: { color: "#E6EEF1", fontSize: 20, fontWeight: "700", textAlign: "center", marginTop: 8 },

  panel: {
    width: "86%",
    alignSelf: "center",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 14,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  slotsRow: { flexDirection: "row", justifyContent: "space-between" },
  slotWrap: { flex: 1, alignItems: "center", marginHorizontal: 6 },

  slot: { width: 86, height: 160, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  slotNum: { color: "#fff", fontSize: 34, fontWeight: "700" },
  slotCaption: { marginTop: 6, color: "#CFE2E7", fontSize: 12 },

  shoppingName: { color: "#E6EEF1", textAlign: "center", marginTop: 18, fontSize: 18 },

  routesBtn: {
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  routesBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  selectedLabel: { color: "#E6EEF1", textAlign: "center", marginTop: 16, fontWeight: "700" },
  selectedBig: { textAlign: "center", fontSize: 28, marginTop: 4, fontWeight: "800" },

  reserveBtn: { flexDirection: "row", alignSelf: "center", marginTop: 18, borderRadius: 12, overflow: "hidden" },
  reserveBtnLeft: { width: 52, height: 40, alignItems: "center", justifyContent: "center" },
  playIcon: { color: "#fff", fontSize: 22, transform: [{ rotate: "270deg" }] },
  reserveBtnRight: {
    height: 40,
    paddingHorizontal: 22,
    backgroundColor: "#2A343A",
    alignItems: "center",
    justifyContent: "center",
  },
  reserveText: { color: "#DCE6EA", fontWeight: "700" },
});
