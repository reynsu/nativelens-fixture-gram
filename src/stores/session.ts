import { create } from "zustand";
import { CURRENT_USER_ID, getUser, type User } from "../data/users";
import { readSession, writeSession, clearSession, type StoredSession } from "../lib/storage";
import { api } from "../lib/fakeApi";

type SessionState = {
  userId: string | null;
  handle: string | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  currentUser: User | undefined;
  hydrate: () => Promise<void>;
  login: (handle: string, password: string) => Promise<{ ok: boolean }>;
  logout: () => Promise<void>;
};

export const useSession = create<SessionState>((set, get) => ({
  userId: null,
  handle: null,
  isLoggedIn: false,
  isHydrated: false,
  currentUser: undefined,

  hydrate: async () => {
    const stored = await readSession();
    if (stored) {
      set({
        userId: stored.userId,
        handle: stored.handle,
        isLoggedIn: true,
        isHydrated: true,
        currentUser: getUser(stored.userId),
      });
    } else {
      set({ isHydrated: true });
    }
  },

  login: async (handle, password) => {
    const result = await api.authenticate(handle, password);
    if (!result.ok) return { ok: false };
    const session: StoredSession = {
      userId: CURRENT_USER_ID,
      handle,
      loggedInAt: Date.now(),
    };
    set({
      userId: session.userId,
      handle: session.handle,
      isLoggedIn: true,
      currentUser: getUser(session.userId),
    });
    writeSession(session);
    return { ok: true };
  },

  logout: async () => {
    await clearSession();
    set({ userId: null, handle: null, isLoggedIn: false, currentUser: undefined });
  },
}));
