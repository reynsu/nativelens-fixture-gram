import { create } from "zustand";
import { CONVERSATIONS, type Conversation, type Message } from "../data/conversations";
import { api } from "../lib/fakeApi";

type DMState = {
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string, senderId: string) => void;
};

export const useDMs = create<DMState>((set) => ({
  conversations: CONVERSATIONS,

  sendMessage: (conversationId, text, senderId) => {
    const message: Message = {
      id: `m_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      senderId,
      text,
      createdAt: Date.now(),
    };
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c,
      ),
    }));
    api.sendMessage(conversationId, text, senderId);
  },
}));

export function lastMessage(c: Conversation): Message | undefined {
  return c.messages[c.messages.length - 1];
}
