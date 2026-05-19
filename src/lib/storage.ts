import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "pixly:session:v1";

export type StoredSession = {
  userId: string;
  handle: string;
  loggedInAt: number;
};

export async function readSession(): Promise<StoredSession | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

export async function writeSession(session: StoredSession): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
