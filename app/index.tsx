import ListMeanings from "@/components/ListMeanings";
import SuperButton from "@/components/SuperButton";
import { getDataFromGPT } from "@/services/ai/get_data";
import styles from "@/styles";
import { Sigla } from "@/types";
import { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";

export default function Index() {
  const [acronym, setAcronym] = useState("");
  const [meanings, setMeanings] = useState<Array<Sigla>>([]);

  const getMeanings = async () => {
    try {
      const result = await getDataFromGPT(acronym);
      const json = JSON.parse(result.replace(/`/g, ""));
      console.log(json);
      setMeanings(json);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAcronym}
        value={acronym}
        placeholder="Informe a sigla para pesquisar o significado"
      />
      <SuperButton
        iconRight={"search1"}
        title="Pesquisar Significados"
        onPress={getMeanings}
      />
      {meanings.length > 0 && (
        <ListMeanings data={meanings} handlePress={() => {}} />
      )}
    </View>
  );
}
