import { useEffect } from "react";
import { Stack } from "expo-router";
import { useSession } from "../src/stores/session";

export default function RootLayout() {
  const hydrate = useSession((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTitleStyle: { fontWeight: "600" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
      <Stack.Screen name="dm/[id]" options={{ title: "Direct" }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
    </Stack>
  );
}
