import { StyleSheet, Text, View } from "react-native";
import { colorForHandle, colors, radii, type } from "../theme";

type AvatarProps = {
  handle: string;
  displayName: string;
  size?: number;
  testID?: string;
};

export function Avatar({ handle, displayName, size = 40, testID }: AvatarProps) {
  const bg = colorForHandle(handle);
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel={`${displayName} avatar`}
      style={[
        styles.base,
        { width: size, height: size, borderRadius: radii.pill, backgroundColor: bg },
      ]}
    >
      <Text style={[styles.initials, { fontSize: Math.floor(size * 0.4) }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    ...type.bold,
    color: colors.bg,
  },
});
