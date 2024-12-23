import Divider from "@/components/Divider";
import ListMeanings from "@/components/ListMeanings";
import ListSelectedMeanings from "@/components/ListSelectedMeanings";
import SuperButton from "@/components/SuperButton";
import { getDataFromGPT } from "@/services/ai/get_data";
import styles from "@/styles";
import { Sigla } from "@/types";
import { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

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

  const getHTML = () => {
    const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          </head>
          <body style="font-family: Helvetica Neue; font-weight: normal; display: flex; flex-direction: column; padding: 30px;">
            <h1 style="font-size: 50px;">
              Lista de Siglas
            </h1>
            <ul style="list-style-type: none; display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0;">
              ${selectedMeanings.map((sigla) => `<li>${sigla}</li>`).join("")}
            </ul>
          </body>
        </html>
    `;
    return html;
  };

  const getPDF = async () => {
    const html = getHTML();
    console.log(html);
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
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
          <View style={styles.viewContainer}>
            <ListSelectedMeanings
              data={selectedMeanings}
              handlePress={(sigla) =>
                setSelectedMeanings(
                  selectedMeanings.filter((item) => item !== sigla)
                )
              }
            />
            <SuperButton
              iconRight={"pdffile1"}
              title="Gerar PDF"
              onPress={getPDF}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
