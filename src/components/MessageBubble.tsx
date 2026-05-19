import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, type } from "../theme";

type MessageBubbleProps = {
  text: string;
  fromMe: boolean;
  testID?: string;
};

export function MessageBubble({ text, fromMe, testID }: MessageBubbleProps) {
  return (
    <View
      testID={testID}
      style={[styles.row, fromMe ? styles.rowMine : styles.rowTheirs]}
    >
      <View
        style={[styles.bubble, fromMe ? styles.bubbleMine : styles.bubbleTheirs]}
      >
        <Text
          style={[styles.text, { color: fromMe ? colors.bubbleMeText : colors.bubbleOtherText }]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  rowMine: { justifyContent: "flex-end" },
  rowTheirs: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
  },
  bubbleMine: { backgroundColor: colors.bubbleMe, borderBottomRightRadius: radii.sm },
  bubbleTheirs: { backgroundColor: colors.bubbleOther, borderBottomLeftRadius: radii.sm },
  text: { ...type.body },
});
