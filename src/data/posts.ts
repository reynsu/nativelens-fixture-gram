export type Comment = {
  id: string;
  userId: string;
  text: string;
  createdAt: number;
};

export type Post = {
  id: string;
  userId: string;
  imageKey: "beach" | "mountain" | "coffee" | "garden" | "night" | "city";
  caption: string;
  likes: string[];
  likeCount: number;
  comments: Comment[];
  createdAt: number;
};

const HOUR = 1000 * 60 * 60;
const NOW = 1747680000000;

export const POSTS: Post[] = [
  {
    id: "p1",
    userId: "u2",
    imageKey: "beach",
    caption: "Cascais after the rain.",
    likes: ["u1", "u4", "u5"],
    likeCount: 3,
    comments: [
      { id: "c1", userId: "u4", text: "those colors!!", createdAt: NOW - 2 * HOUR },
      { id: "c2", userId: "u1", text: "stunning maya", createdAt: NOW - 1 * HOUR },
    ],
    createdAt: NOW - 3 * HOUR,
  },
  {
    id: "p2",
    userId: "u5",
    imageKey: "mountain",
    caption: "Day 4 on the trail. Knees are gone, soul is intact.",
    likes: ["u1", "u2", "u3", "u4"],
    likeCount: 4,
    comments: [{ id: "c3", userId: "u3", text: "send pics of the gear", createdAt: NOW - 5 * HOUR }],
    createdAt: NOW - 6 * HOUR,
  },
  {
    id: "p3",
    userId: "u4",
    imageKey: "coffee",
    caption: "Single origin, Ethiopian. Notes: blueberry, cocoa.",
    likes: ["u2"],
    likeCount: 1,
    comments: [],
    createdAt: NOW - 8 * HOUR,
  },
  {
    id: "p4",
    userId: "u1",
    imageKey: "garden",
    caption: "Tomatoes finally fruiting.",
    likes: ["u4"],
    likeCount: 1,
    comments: [{ id: "c4", userId: "u4", text: "share the recipe when they ripen", createdAt: NOW - 11 * HOUR }],
    createdAt: NOW - 12 * HOUR,
  },
  {
    id: "p5",
    userId: "u2",
    imageKey: "night",
    caption: "Studio at 2am.",
    likes: ["u1", "u5"],
    likeCount: 2,
    comments: [],
    createdAt: NOW - 14 * HOUR,
  },
  {
    id: "p6",
    userId: "u3",
    imageKey: "city",
    caption: "São Paulo rooftops.",
    likes: [],
    likeCount: 0,
    comments: [],
    createdAt: NOW - 18 * HOUR,
  },
  {
    id: "p7",
    userId: "u1",
    imageKey: "coffee",
    caption: "Morning ritual.",
    likes: ["u2", "u4"],
    likeCount: 2,
    comments: [],
    createdAt: NOW - 22 * HOUR,
  },
  {
    id: "p8",
    userId: "u4",
    imageKey: "city",
    caption: "Late shift, CDMX.",
    likes: ["u1"],
    likeCount: 1,
    comments: [{ id: "c5", userId: "u1", text: "that skyline never gets old", createdAt: NOW - 25 * HOUR }],
    createdAt: NOW - 26 * HOUR,
  },
  {
    id: "p9",
    userId: "u2",
    imageKey: "garden",
    caption: "First sketch of the week.",
    likes: ["u1", "u3", "u4", "u5"],
    likeCount: 4,
    comments: [],
    createdAt: NOW - 30 * HOUR,
  },
  {
    id: "p10",
    userId: "u1",
    imageKey: "mountain",
    caption: "Weekend offline.",
    likes: ["u2", "u5"],
    likeCount: 2,
    comments: [],
    createdAt: NOW - 34 * HOUR,
  },
  {
    id: "p11",
    userId: "u3",
    imageKey: "beach",
    caption: "Ilhabela trip.",
    likes: ["u1"],
    likeCount: 1,
    comments: [],
    createdAt: NOW - 38 * HOUR,
  },
  {
    id: "p12",
    userId: "u1",
    imageKey: "night",
    caption: "Late commit.",
    likes: [],
    likeCount: 0,
    comments: [],
    createdAt: NOW - 42 * HOUR,
  },
];

export function getPost(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}

export function getPostsByUser(userId: string): Post[] {
  return POSTS.filter((p) => p.userId === userId);
}

export const IMAGE_SOURCES = {
  beach: require("../../assets/images/posts/beach.png"),
  mountain: require("../../assets/images/posts/mountain.png"),
  coffee: require("../../assets/images/posts/coffee.png"),
  garden: require("../../assets/images/posts/garden.png"),
  night: require("../../assets/images/posts/night.png"),
  city: require("../../assets/images/posts/city.png"),
} as const;
