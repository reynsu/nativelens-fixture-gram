import { CURRENT_USER_ID } from "./users";

export type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  participantIds: string[];
  messages: Message[];
};

const MIN = 1000 * 60;
const NOW = 1747680000000;

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    participantIds: [CURRENT_USER_ID, "u2"],
    messages: [
      { id: "m1", senderId: "u2", text: "Hey! How's the SF move treating you?", createdAt: NOW - 240 * MIN },
      { id: "m2", senderId: CURRENT_USER_ID, text: "Slow. Half my stuff is still in boxes.", createdAt: NOW - 235 * MIN },
      { id: "m3", senderId: "u2", text: "Same when I moved to Lisbon, took 2 months", createdAt: NOW - 230 * MIN },
      { id: "m4", senderId: CURRENT_USER_ID, text: "Did you finish that commission?", createdAt: NOW - 90 * MIN },
      { id: "m5", senderId: "u2", text: "Yes! Posting tonight.", createdAt: NOW - 89 * MIN },
      { id: "m6", senderId: "u2", text: "Will tag you", createdAt: NOW - 89 * MIN },
      { id: "m7", senderId: CURRENT_USER_ID, text: "Looking forward", createdAt: NOW - 60 * MIN },
      { id: "m8", senderId: "u2", text: "btw — that thing you sent about RN debugging looked wild", createdAt: NOW - 30 * MIN },
      { id: "m9", senderId: CURRENT_USER_ID, text: "yeah lol it's still rough", createdAt: NOW - 28 * MIN },
      { id: "m10", senderId: "u2", text: "lmk when it ships, I want to try", createdAt: NOW - 20 * MIN },
      { id: "m11", senderId: CURRENT_USER_ID, text: "deal", createdAt: NOW - 5 * MIN },
      { id: "m12", senderId: "u2", text: "ok off to sketch", createdAt: NOW - 2 * MIN },
    ],
  },
  {
    id: "conv2",
    participantIds: [CURRENT_USER_ID, "u4"],
    messages: [
      { id: "m13", senderId: "u4", text: "did you see the beans I picked up?", createdAt: NOW - 1440 * MIN },
      { id: "m14", senderId: CURRENT_USER_ID, text: "the ethiopian?", createdAt: NOW - 1435 * MIN },
      { id: "m15", senderId: "u4", text: "yes! mind blowing", createdAt: NOW - 1430 * MIN },
      { id: "m16", senderId: "u4", text: "want me to ship you a bag?", createdAt: NOW - 1420 * MIN },
      { id: "m17", senderId: CURRENT_USER_ID, text: "if it fits in an envelope sure 😅", createdAt: NOW - 1410 * MIN },
      { id: "m18", senderId: "u4", text: "lol I'll figure out the customs form", createdAt: NOW - 1400 * MIN },
      { id: "m19", senderId: "u4", text: "btw how's the cli going", createdAt: NOW - 720 * MIN },
      { id: "m20", senderId: CURRENT_USER_ID, text: "shipping a new release this week", createdAt: NOW - 700 * MIN },
    ],
  },
  {
    id: "conv3",
    participantIds: [CURRENT_USER_ID, "u5"],
    messages: [
      { id: "m21", senderId: "u5", text: "back from the trail. legs destroyed", createdAt: NOW - 360 * MIN },
      { id: "m22", senderId: CURRENT_USER_ID, text: "saw the photos. how was the weather?", createdAt: NOW - 355 * MIN },
      { id: "m23", senderId: "u5", text: "day 1 was rain, then perfect for 3 days", createdAt: NOW - 350 * MIN },
      { id: "m24", senderId: "u5", text: "would do it again", createdAt: NOW - 340 * MIN },
      { id: "m25", senderId: CURRENT_USER_ID, text: "want company next time?", createdAt: NOW - 200 * MIN },
      { id: "m26", senderId: "u5", text: "100%", createdAt: NOW - 195 * MIN },
    ],
  },
];

export function getConversation(id: string): Conversation | undefined {
  return CONVERSATIONS.find((c) => c.id === id);
}

export function getOtherParticipantId(conversation: Conversation, selfId: string): string {
  return conversation.participantIds.find((id) => id !== selfId) ?? "";
}
