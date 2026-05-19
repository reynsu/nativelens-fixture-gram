import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Avatar } from "../../src/components/Avatar";
import { useDMs, lastMessage } from "../../src/stores/dms";
import { useSession } from "../../src/stores/session";
import { getUser } from "../../src/data/users";
import { getOtherParticipantId } from "../../src/data/conversations";
import { colors, spacing, type } from "../../src/theme";

export default function DMsScreen() {
  const conversations = useDMs((s) => s.conversations);
  const selfId = useSession((s) => s.userId) ?? "";

  return (
    <View style={styles.container} testID="dm-list-screen">
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        testID="dm-list"
        renderItem={({ item }) => {
          const otherId = getOtherParticipantId(item, selfId);
          const other = getUser(otherId);
          const last = lastMessage(item);
          return (
            <Pressable
              onPress={() => router.push(`/dm/${item.id}`)}
              style={styles.row}
              testID={`dm-row-${item.id}`}
              accessibilityRole="button"
              accessibilityLabel={`Chat with ${other?.displayName ?? "unknown"}`}
            >
              <Avatar
                handle={other?.handle ?? "?"}
                displayName={other?.displayName ?? "?"}
                size={52}
              />
              <View style={styles.rowText}>
                <Text style={type.bold}>{other?.displayName}</Text>
                <Text style={[type.small, styles.preview]} numberOfLines={1}>
                  {last?.senderId === selfId ? "You: " : ""}
                  {last?.text}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  rowText: { flex: 1, gap: 2 },
  preview: { color: colors.textMuted },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 76 },
});
