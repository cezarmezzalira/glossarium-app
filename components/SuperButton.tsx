import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "@/components/styles";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SuperButtonProps {
  title: string;
  iconLeft?: keyof typeof AntDesign.glyphMap;
  iconRight?: keyof typeof AntDesign.glyphMap;
  onPress?: () => void;
}

const SuperButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
}: SuperButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {iconLeft && (
        <AntDesign
          style={styles.iconLeft}
          name={iconLeft}
          size={24}
          color="white"
        />
      )}
      <Text style={styles.text}>{title}</Text>
      {iconRight && (
        <AntDesign
          style={styles.iconRight}
          name={iconRight}
          size={24}
          color="white"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff7b00",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  text: {
    color: theme.tint,
    fontSize: 20,
    fontWeight: "bold",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default SuperButton;
