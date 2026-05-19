import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Avatar } from "../../src/components/Avatar";
import { Button } from "../../src/components/Button";
import { useFeed, isLikedBy } from "../../src/stores/feed";
import { useSession } from "../../src/stores/session";
import { IMAGE_SOURCES, type Comment } from "../../src/data/posts";
import { getUser } from "../../src/data/users";
import { colors, spacing, type } from "../../src/theme";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = useFeed((s) => s.posts.find((p) => p.id === id));
  const toggleLike = useFeed((s) => s.toggleLike);
  const addComment = useFeed((s) => s.addComment);
  const currentUserId = useSession((s) => s.userId);

  const [draft, setDraft] = useState("");

  const author = useMemo(() => (post ? getUser(post.userId) : undefined), [post]);

  if (!post) {
    return (
      <View style={styles.empty} testID="post-detail-missing">
        <Text style={type.body}>Post not found.</Text>
      </View>
    );
  }

  const liked = currentUserId ? isLikedBy(post, currentUserId) : false;

  function onLike() {
    if (!currentUserId || !post) return;
    toggleLike(post.id, currentUserId);
  }

  function onPostComment() {
    if (!currentUserId || !post || draft.trim().length === 0) return;
    const c: Comment = {
      id: `c_${Date.now()}`,
      userId: currentUserId,
      text: draft.trim(),
      createdAt: Date.now(),
    };
    addComment(post.id, c);
    setDraft("");
  }

  return (
    <View style={styles.container} testID="post-detail-screen">
      <View style={styles.header}>
        <Avatar handle={author?.handle ?? "?"} displayName={author?.displayName ?? "?"} size={36} />
        <Text style={type.bold} testID="post-detail-handle">{author?.handle}</Text>
      </View>

      <Image
        source={IMAGE_SOURCES[post.imageKey]}
        style={styles.image}
        accessibilityLabel={`Photo by ${author?.handle ?? "user"}`}
        testID="post-detail-image"
      />

      <View style={styles.actions}>
        <Pressable
          onPress={onLike}
          accessibilityRole="button"
          accessibilityLabel={liked ? "Unlike" : "Like"}
          style={styles.iconBtn}
          testID="post-detail-like"
        >
          <Text style={[styles.heart, liked && styles.heartActive]}>{liked ? "♥" : "♡"}</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Share post"
          style={styles.iconBtn}
          testID="post-detail-share"
        >
          <Text style={styles.icon}>↗</Text>
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={type.small} testID="post-detail-likecount">
          {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
        </Text>
        <Text style={[type.body, styles.caption]} testID="post-detail-caption">
          <Text style={type.bold}>{author?.handle} </Text>
          {post.caption}
        </Text>
      </View>

      <FlatList
        data={post.comments}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.commentsList}
        ListHeaderComponent={
          <Text style={[type.bold, styles.commentsHeader]}>Comments</Text>
        }
        ListEmptyComponent={
          <Text style={[type.small, styles.commentsEmpty]}>No comments yet. Be the first.</Text>
        }
        testID="post-detail-comments"
        renderItem={({ item }) => {
          const cu = getUser(item.userId);
          return (
            <View style={styles.comment} testID={`comment-${item.id}`}>
              <Avatar handle={cu?.handle ?? "?"} displayName={cu?.displayName ?? "?"} size={28} />
              <Text style={[type.body, styles.commentText]}>
                <Text style={type.bold}>{cu?.handle} </Text>
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      <View style={styles.composer}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Add a comment…"
          placeholderTextColor={colors.textMuted}
          style={styles.composerInput}
          testID="comment-input"
          accessibilityLabel="Comment input"
        />
        <Button label="Post" onPress={onPostComment} testID="post-comment-btn" />
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
  },
  image: { width: "100%", aspectRatio: 1, backgroundColor: colors.surface },
  actions: { flexDirection: "row", paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.sm },
  iconBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  heart: { fontSize: 28, color: colors.text },
  heartActive: { color: colors.accent },
  icon: { fontSize: 24, color: colors.text },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.xs, gap: spacing.xs },
  caption: { lineHeight: 20 },
  commentsList: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, gap: spacing.sm },
  commentsHeader: { paddingBottom: spacing.sm },
  commentsEmpty: { color: colors.textMuted },
  comment: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, paddingVertical: 4 },
  commentText: { flex: 1, lineHeight: 20 },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  composerInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    fontSize: 15,
  },
});
