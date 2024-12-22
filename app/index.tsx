import Divider from "@/components/Divider";
import ListMeanings from "@/components/ListMeanings";
import ListSelectedMeanings from "@/components/ListSelectedMeanings";
import SuperButton from "@/components/SuperButton";
import { getDataFromGPT } from "@/services/ai/get_data";
import styles from "@/styles";
import { Sigla } from "@/types";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

export default function Index() {
  const [acronym, setAcronym] = useState("");
  const [meanings, setMeanings] = useState<Array<Sigla>>([]);
  const [selectedMeanings, setSelectedMeanings] = useState<Array<string>>([]);

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

  const addMeaningToList = (sigla: Sigla) => {
    setSelectedMeanings((prevState) => [
      ...prevState,
      `${acronym} - ${sigla.significado}`,
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
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
          <ListMeanings data={meanings} handlePress={addMeaningToList} />
        )}
        <Divider />
        {selectedMeanings.length > 0 && (
          <ListSelectedMeanings
            data={selectedMeanings}
            handlePress={(sigla) =>
              setSelectedMeanings(
                selectedMeanings.filter((item) => item !== sigla)
              )
            }
          />
        )}
      </View>
    </ScrollView>
  );
}
