import { Redirect } from "expo-router";
import { useSession } from "../src/stores/session";

export default function Index() {
  const isLoggedIn = useSession((s) => s.isLoggedIn);
  return <Redirect href={isLoggedIn ? "/(tabs)/feed" : "/auth/login"} />;
}
