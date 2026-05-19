import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Avatar } from "../../src/components/Avatar";
import { MessageBubble } from "../../src/components/MessageBubble";
import { useDMs } from "../../src/stores/dms";
import { useSession } from "../../src/stores/session";
import { getOtherParticipantId } from "../../src/data/conversations";
import { getUser } from "../../src/data/users";
import { colors, radii, spacing, type } from "../../src/theme";

export default function DMThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversation = useDMs((s) => s.conversations.find((c) => c.id === id));
  const sendMessage = useDMs((s) => s.sendMessage);
  const selfId = useSession((s) => s.userId) ?? "";

  const [draft, setDraft] = useState("");
  const listRef = useRef<FlatList>(null);

  const other = useMemo(() => {
    if (!conversation) return undefined;
    return getUser(getOtherParticipantId(conversation, selfId));
  }, [conversation, selfId]);

  if (!conversation) {
    return (
      <View style={styles.empty} testID="dm-thread-missing">
        <Text style={type.body}>Conversation not found.</Text>
      </View>
    );
  }

  function onSend() {
    if (!conversation || draft.trim().length === 0) return;
    sendMessage(conversation.id, draft.trim(), selfId);
    setDraft("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  }

  return (
    <View style={styles.container} testID="dm-thread-screen">
      <View style={styles.header}>
        <Avatar handle={other?.handle ?? "?"} displayName={other?.displayName ?? "?"} size={32} />
        <View style={styles.headerText}>
          <Text style={type.bold}>{other?.displayName}</Text>
          <Text style={[type.tiny, { color: colors.textMuted }]}>@{other?.handle}</Text>
        </View>
        <Pressable
          onPress={() => {}}
          style={styles.headerIconBtn}
          testID="dm-thread-call"
        >
          <View style={styles.headerIconDot} />
          <View style={styles.headerIconDot} />
          <View style={styles.headerIconDot} />
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={conversation.messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            fromMe={item.senderId === selfId}
            testID={`message-${item.id}`}
          />
        )}
        testID="dm-thread-messages"
      />

      <View style={styles.composer}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message…"
          placeholderTextColor={colors.textMuted}
          style={styles.composerInput}
          multiline
          testID="dm-thread-input"
          accessibilityLabel="Message input"
        />
        <Pressable
          onPress={onSend}
          style={[styles.sendBtn, draft.trim().length === 0 && styles.sendBtnDisabled]}
          disabled={draft.trim().length === 0}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          testID="dm-thread-send"
        >
          <Text style={styles.sendIcon}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerText: { flex: 1 },
  headerIconBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    gap: 3,
  },
  headerIconDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text,
  },
  messagesList: { paddingVertical: spacing.md },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  composerInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: { backgroundColor: colors.border },
  sendIcon: { color: colors.bg, fontSize: 22, fontWeight: "700" },
});
