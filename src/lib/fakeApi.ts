const DEFAULT_LATENCY_MS = 250;

export function delay<T>(value: T, ms: number = DEFAULT_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function maybeFail<T>(value: T, failRate: number = 0, ms: number = DEFAULT_LATENCY_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) reject(new Error("network_unavailable"));
      else resolve(value);
    }, ms);
  });
}

export const api = {
  authenticate: (handle: string, password: string) => delay({ ok: handle.length > 0 && password.length >= 4 }, 300),
  persistSession: (handle: string) => delay({ handle }, 200),
  toggleLike: (postId: string, userId: string) => delay({ postId, userId, ok: true }, 200),
  sendMessage: (conversationId: string, text: string, senderId: string) =>
    delay({ conversationId, text, senderId, id: `m_${Date.now()}` }, 220),
};
