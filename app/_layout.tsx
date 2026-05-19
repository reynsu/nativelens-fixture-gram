import { useEffect } from "react";
import { router, Stack, useRootNavigationState, useSegments } from "expo-router";
import { useSession } from "../src/stores/session";

export default function RootLayout() {
  const isLoggedIn = useSession((s) => s.isLoggedIn);
  const hydrate = useSession((s) => s.hydrate);
  const segments = useSegments();
  const navState = useRootNavigationState();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!navState?.key) return;
    const inAuthGroup = segments[0] === "auth";
    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)/feed");
    }
  }, [isLoggedIn, segments, navState?.key]);

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
