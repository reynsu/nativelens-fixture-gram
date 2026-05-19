export type User = {
  id: string;
  handle: string;
  displayName: string;
  bio?: string;
  postCount: number;
  followers: number;
  following: number;
};

export const CURRENT_USER_ID = "u1";

export const USERS: Record<string, User> = {
  u1: {
    id: "u1",
    handle: "rey.codes",
    displayName: "Rey",
    postCount: 4,
    followers: 412,
    following: 188,
  },
  u2: {
    id: "u2",
    handle: "maya.draws",
    displayName: "Maya",
    bio: "Illustrator from Lisbon. Commissions open.",
    postCount: 3,
    followers: 5240,
    following: 312,
  },
  u3: {
    id: "u3",
    handle: "tomas.cli",
    displayName: "Tomás",
    postCount: 2,
    followers: 78,
    following: 91,
  },
  u4: {
    id: "u4",
    handle: "ana.k",
    displayName: "Ana K.",
    bio: "Coffee + code. CDMX.",
    postCount: 2,
    followers: 1820,
    following: 504,
  },
  u5: {
    id: "u5",
    handle: "leo_explora",
    displayName: "Leo",
    bio: "Trail runner. Photos from the road.",
    postCount: 1,
    followers: 9012,
    following: 47,
  },
};

export function getUser(id: string): User | undefined {
  return USERS[id];
}
