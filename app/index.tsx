// app/index.tsx
import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import Login from "./login";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <Login />
  );
}
