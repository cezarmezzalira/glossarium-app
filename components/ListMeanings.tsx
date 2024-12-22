import { FlashList } from "@shopify/flash-list";
import { Sigla } from "@/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ListMeaningsProps {
  data: Array<Sigla>;
  handlePress: (sigla: Sigla) => void;
}

const ListMeanings = ({ data, handlePress }: ListMeaningsProps) => {
  const renderItem = ({ item }: { item: Sigla }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{ maxWidth: "80%" }}>
          <Text>
            <Text style={styles.itemProp}>Significado: </Text>
            {item.significado}
          </Text>
          <Text>
            <Text style={styles.itemProp}>Área de interesse: </Text>
            {item.area_interesse}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, flexDirection: "row" },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  itemProp: { fontWeight: "bold", marginBottom: 5 },
});
export default ListMeanings;
