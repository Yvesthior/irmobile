import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

function Resultats({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Le résultat que vous recherchez n'a pas été délivré par l'IRESSEF
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("acceuil")}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Revenir à l'Acceuil</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 25,
    marginTop: -50,
    marginBottom: 100,
    textAlign: "center",
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

export default Resultats;
