import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Avatar } from "./Avatar";
import { getUser } from "../data/users";
import { IMAGE_SOURCES, type Post } from "../data/posts";
import { useFeed, isLikedBy } from "../stores/feed";
import { useSession } from "../stores/session";
import { colors, spacing, type } from "../theme";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const author = getUser(post.userId);
  const currentUserId = useSession((s) => s.userId);
  const toggleLike = useFeed((s) => s.toggleLike);
  const liked = currentUserId ? isLikedBy(post, currentUserId) : false;

  function onLike() {
    if (!currentUserId) return;
    toggleLike(post.id, currentUserId);
  }

  function onOpenComments() {
    if (!currentUserId) return;
    toggleLike(post.id, currentUserId);
  }

  function onOpenDetail() {
    router.push(`/post/${post.id}`);
  }

  return (
    <View style={styles.card} testID={`post-card-${post.id}`}>
      <Pressable
        onPress={onOpenDetail}
        accessibilityRole="button"
        accessibilityLabel={`Open post by ${author?.displayName ?? "unknown"}`}
        style={styles.header}
        testID={`post-${post.id}-header`}
      >
        <Avatar
          handle={author?.handle ?? "anon"}
          displayName={author?.displayName ?? "?"}
          size={36}
        />
        <View style={styles.headerText}>
          <Text style={type.bold} testID={`post-${post.id}-handle`}>
            {author?.handle}
          </Text>
        </View>
      </Pressable>

      <Image
        source={IMAGE_SOURCES[post.imageKey]}
        style={styles.image}
        accessibilityLabel={`Photo posted by ${author?.handle ?? "user"}`}
        testID={`post-${post.id}-image`}
      />

      <View style={styles.actions}>
        <Pressable
          onPress={onLike}
          style={styles.iconBtn}
          testID={`post-${post.id}-like`}
        >
          <Text style={[styles.heart, liked && styles.heartActive]}>{liked ? "♥" : "♡"}</Text>
        </Pressable>
        <Pressable
          onPress={onOpenComments}
          style={styles.iconBtnSmall}
          accessibilityRole="button"
          accessibilityLabel="View comments"
          testID={`post-${post.id}-comments`}
        >
          <Text style={styles.commentIcon}>💬</Text>
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={type.small} testID={`post-${post.id}-likecount`}>
          {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
        </Text>
        <Text style={[type.body, styles.caption]} testID={`post-${post.id}-caption`}>
          <Text style={type.bold}>{author?.handle} </Text>
          {post.caption}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  headerText: { flex: 1 },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: colors.surface,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    alignItems: "center",
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnSmall: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  heart: { fontSize: 28, color: colors.text },
  heartActive: { color: colors.accent },
  commentIcon: { fontSize: 22 },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    gap: spacing.xs,
  },
  caption: { lineHeight: 20 },
});
