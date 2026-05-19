import { create } from "zustand";
import { POSTS, type Post, type Comment } from "../data/posts";
import { api } from "../lib/fakeApi";

type FeedState = {
  posts: Post[];
  toggleLike: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
};

export const useFeed = create<FeedState>((set, get) => ({
  posts: POSTS,

  toggleLike: (postId, userId) => {
    const liked = get().posts.find((p) => p.id === postId)?.likes.includes(userId);
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          likes: liked ? p.likes.filter((u) => u !== userId) : [...p.likes, userId],
        };
      }),
    }));
    api.toggleLike(postId, userId);
  },

  addComment: (postId, comment) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p,
      ),
    }));
  },
}));

export function isLikedBy(post: Post, userId: string): boolean {
  return post.likes.includes(userId);
}
