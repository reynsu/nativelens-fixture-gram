import { FlatList, StyleSheet, View } from "react-native";
import { PostCard } from "../../src/components/PostCard";
import { useFeed } from "../../src/stores/feed";
import { colors } from "../../src/theme";

export default function FeedScreen() {
  const posts = useFeed((s) => s.posts);

  return (
    <View style={styles.container} testID="feed-screen">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        testID="feed-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
