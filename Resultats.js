import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

function Resultats({ route, navigation }) {
  const { displayName, code, sexe, naissance, resultat, datePrelev, passport } =
    route.params;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <Text style={styles.header}>RÉSULTATS DE LA RECHERCHE</Text>
        <Text style={styles.code}>CODE : {code}</Text>
        <Text style={styles.prenom}>PRENOMS - NOM : {displayName}</Text>
        <Text style={styles.prenom}>PASSPORT : {passport}</Text>
        <Text style={styles.age}>Date de Naissance : {naissance}</Text>

        <Text style={styles.sexe}>SEXE : {sexe}</Text>
        <Text style={styles.prelev}>Date de Prélèvement : {datePrelev}</Text>

        <Text style={styles.resultat}>RÉSULTAT</Text>
        <Text
          style={resultat === "Positif" ? styles.resultat2 : styles.resultat3}
        >
          {resultat}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("acceuil")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Revenir à l'Acceuil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: { fontSize: 25, marginTop: 50 },
  code: { marginTop: 40, fontSize: 20, marginBottom: 20 },
  prenom: { marginTop: 20, fontSize: 20, marginBottom: 10 },
  age: { marginTop: 20, fontSize: 20, marginBottom: 10 },
  sexe: { marginTop: 20, fontSize: 20, marginBottom: 10 },
  prelev: { marginTop: 10, fontSize: 20, marginBottom: 5 },
  resultat: { marginTop: 20, fontSize: 20, marginBottom: 20 },
  resultat2: { marginTop: 10, fontSize: 40, marginBottom: 20 },
  resultat2: {
    marginTop: 10,
    fontSize: 40,
    marginBottom: 20,
    backgroundColor: "red",
    color: "#fff",
    width: 500,
    height: 50,
    textAlign: "center",
  },
  datePrelev: { marginTop: 20, fontSize: 20, marginBottom: 20 },
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

export default Resultats;
