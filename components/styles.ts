import { StyleSheet } from "react-native";

export const theme = {
  background: "#333333",
  tint: "#FFFFFF",
  header: "#101010",
  placeholderTextColor: "#666",
};

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    padding: 8,
  },
  input: {
    color: theme.tint,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: 8,
  },
});
