import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSession } from "../../src/stores/session";
import { Button } from "../../src/components/Button";
import { getPostsByUser } from "../../src/data/posts";
import { IMAGE_SOURCES } from "../../src/data/posts";
import { colors, colorForHandle, radii, spacing, type } from "../../src/theme";

export default function ProfileScreen() {
  const currentUser = useSession((s) => s.currentUser);
  const logout = useSession((s) => s.logout);

  if (!currentUser) {
    return (
      <View style={styles.container} testID="profile-screen-empty">
        <Text style={type.body}>Loading profile…</Text>
      </View>
    );
  }

  const posts = getPostsByUser(currentUser.id);
  const initials = currentUser.displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <View style={styles.container} testID="profile-screen">
      <View style={styles.header}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: colorForHandle(currentUser.handle) },
          ]}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.stats}>
          <Stat label="Posts" value={currentUser.postCount} testID="stat-posts" />
          <Stat label="Followers" value={currentUser.followers} testID="stat-followers" />
          <Stat label="Following" value={currentUser.following} testID="stat-following" />
        </View>
      </View>

      <View style={styles.bioBlock}>
        <Text style={type.bold} testID="profile-displayname">{currentUser.displayName}</Text>
        <Text style={type.small} testID="profile-handle">@{currentUser.handle}</Text>
        <Text style={[type.body, styles.bio]} testID="profile-bio">
          {currentUser.bio} ({currentUser.bio!.length} chars)
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <Button label="Edit profile" variant="secondary" onPress={() => {}} testID="edit-profile-btn" />
        <Button label="Sign out" variant="secondary" onPress={() => { logout(); }} testID="sign-out-btn" />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Image
            source={IMAGE_SOURCES[item.imageKey]}
            style={styles.gridImage}
            testID={`profile-post-${item.id}`}
          />
        )}
        testID="profile-grid"
      />
    </View>
  );
}

function Stat({ label, value, testID }: { label: string; value: number; testID: string }) {
  return (
    <View style={styles.stat} testID={testID}>
      <Text style={type.h2}>{value}</Text>
      <Text style={[type.small, styles.statLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.lg,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.bg, fontSize: 32, fontWeight: "700" },
  stats: { flex: 1, flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center" },
  statLabel: { color: colors.textMuted },
  bioBlock: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: 2 },
  bio: { marginTop: spacing.xs, color: colors.text },
  actionsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  grid: { paddingTop: spacing.sm },
  gridImage: { flex: 1, aspectRatio: 1, margin: 1, backgroundColor: colors.surface },
});
