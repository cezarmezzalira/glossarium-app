import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ListSelectedMeaningsProps {
  data: Array<string>;
  handlePress: (sigla: string) => void;
}

const ListSelectedMeanings = ({
  data,
  handlePress,
}: ListSelectedMeaningsProps) => {
  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemProp}>{item}</Text>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <AntDesign name="minuscircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Significados selecionados</Text>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, flexDirection: "column", width: "100%" },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  itemProp: { fontWeight: "bold", marginBottom: 5, maxWidth: "80%" },
  title: { fontWeight: "bold", fontSize: 20, marginBottom: 10 },
});
export default ListSelectedMeanings;
