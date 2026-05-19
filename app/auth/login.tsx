import { useState } from "react";
import { router } from "expo-router";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../../src/components/Button";
import { useSession } from "../../src/stores/session";
import { colors, radii, spacing, type } from "../../src/theme";

export default function LoginScreen() {
  const [handle, setHandle] = useState("rey.codes");
  const [password, setPassword] = useState("demo1234");
  const [submitting, setSubmitting] = useState(false);
  const login = useSession((s) => s.login);

  function onSubmit() {
    setSubmitting(true);
    login(handle, password).then((result) => {
      setSubmitting(false);
      if (!result.ok) {
        Alert.alert("Login failed", "Try again with a longer password.");
      }
    });
    router.replace("/(tabs)/feed");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.inner} testID="login-screen">
        <Text style={[type.h1, styles.brand]}>Pixly</Text>
        <Text style={[type.small, styles.tagline]}>Share moments. Argue about espresso.</Text>

        <View style={styles.form}>
          <TextInput
            value={handle}
            onChangeText={setHandle}
            placeholder="Handle"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            testID="login-handle"
            accessibilityLabel="Username or handle"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            style={styles.input}
            testID="login-password"
            accessibilityLabel="Password"
          />
          <Button
            label="Log in"
            onPress={onSubmit}
            loading={submitting}
            testID="login-submit"
            accessibilityLabel="Log in"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  inner: { flex: 1, padding: spacing.xl, justifyContent: "center" },
  brand: { textAlign: "center", fontSize: 36, color: colors.accent },
  tagline: { textAlign: "center", color: colors.textMuted, marginBottom: spacing.xxl },
  form: { gap: spacing.md },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
