import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let dataS = data.split(" ,");
    let dataset = dataS[1] || 0;
    if (dataset == 0) {
      navigation.navigate("erreur");
    } else {
      let newCode = dataS[1].trim();
      axios
        .get(
          `https://iressef-connect.herokuapp.com/voyageurs?identification=${newCode}`
        )
        .then((response) => {
          console.log(
            response.data[0].identification,
            response.data[0].resultat
          );
          const displayName = `${response.data[0].prenom} ${response.data[0].nom}`;
          // displayName, code, sexe, age, resultat
          navigation.navigate("Resultats", {
            displayName,
            code: response.data[0].identification,
            sexe: response.data[0].sexe,
            age: response.data[0].age,
            datePrelev: response.data[0].datePrelev,
            resultat: response.data[0].resultat,
          });
        })
        .catch((error) => navigation.navigate("erreur"));
    }
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <Text>
        Permettez-moi d'accéder à la caméra pour pouvoir scanner les Code-QR
      </Text>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"Appuyer pour Re-Scanner"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default HomeScreen;
