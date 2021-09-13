import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Scanner";
import Erreur from "./Erreur";
import Resultats from "./Resultats";
import axios from "axios";

function Home({ navigation }) {
  const [text, setText] = useState("");
  const submitForm = () => {
    // const token = "1|0k8DoLYUZQhxyHQQO4reaWRIlSz6JU9kIeNVhdji";
    console.log(text);
    axios
      .get(
        `http://www.ir-connectserver.com/api/v1/analysis?identification=SN-IR1-0015988`,
        {
          headers: new Headers({
            Authorization: "Bearer 2|2Cr6zHTp40Rkm3thGqgSdobjvMRBWN1GJe43Iwlw",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            Accept: "application/json",
            "Accept-Encoding": "gzip,deflate,br",
            "Cache-Control": "no-cache",
            Host: "http://www.ir-connectserver.com/api/v1/analysis",
          }),
        }
      )
      // .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        // console.log(response.data[0].identification, response.data[0].resultat);
        // const displayName = `${response.data[0].prenom} ${response.data[0].nom}`;
        // displayName, code, sexe, age, resultat
        navigation.navigate("Resultats", {
          displayName: "Jean Charles",
          code: "SN-ir5",
          sexe: "Masculin",
          naissance: "28-11-1996",
          datePrelev: "11-09-2020",
          resultat: "Positif",
          passport: "ACOOOOSOO",
        });
      })
      .catch((error) => console.log(error.message));
    // navigation.navigate("erreur");
    setText("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue sur IR-CONNECT</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("scanner")}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>SCANNER LE CODE</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.formText}>Code d'identification</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Entrez le Code d'Identification"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <TouchableOpacity
          onPress={() => {
            submitForm();
          }}
        >
          <Text style={styles.formTextBtn}>Vérifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    height: 40,
    fontSize: 20,
    color: "#fff",
    marginLeft: "10%",
  },
  formText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    textTransform: "uppercase",
    marginBottom: 10,
    color: "#fff",
  },
  formTextBtn: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    backgroundColor: "#fff",
    width: 100,
    borderRadius: 20,
    marginLeft: "35%",
    marginBottom: 10,
    color: "#279AF1",
  },
  form: {
    backgroundColor: "#279AF1",
    width: "90%",
    marginTop: "20%",
    borderRadius: 20,
  },
  header: {
    fontSize: 25,
    marginTop: -100,
    marginBottom: 50,
    textAlign: "center",
    textTransform: "uppercase",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#279AF1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="acceuil"
          component={Home}
          options={{ title: "Acceuil" }}
        />
        <Stack.Screen
          name="scanner"
          component={HomeScreen}
          options={{ title: "Scanner" }}
        />
        <Stack.Screen
          name="erreur"
          component={Erreur}
          options={{ title: "Erreur" }}
        />
        <Stack.Screen
          name="Resultats"
          component={Resultats}
          options={{ title: "Résultats" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
