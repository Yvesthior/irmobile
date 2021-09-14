// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { BarCodeScanner } from "expo-barcode-scanner";

// function HomeScreen({ navigation }) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ data }) => {
//     setScanned(true);
//     // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//     let dataS = data.split(" ,");
//     let dataset = dataS[1] || 0;
//     if (dataset == 0) {
//       navigation.navigate("erreur");
//     } else {
//       let newCode = dataS[1].trim();
//       var myHeaders = new Headers();
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append(
//         "Authorization",
//         "Bearer 1|i90cGR93VtPeLDqBcTJVpaqb40cCZdxhROjRllrJ"
//       );

//       var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       fetch(
//         `https://ir-connectserver.com/api/v1/analysis/?identification=${newCode}`,
//         requestOptions
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           console.log(result);
//           const displayName = `${result.data[0].prenom} ${result.data[0].nom}`;
//           console.log(displayName);
//           navigation.navigate("Resultats", {
//             displayName,
//             code: result.data[0].identification,
//             sexe: result.data[0].sexe,
//             naissance: result.data[0].naissance,
//             datePrelev: result.data[0].date_prelev,
//             resultat: result.data[0].resultat,
//             passport: result.data[0].code_interne,
//           });
//         })
//         .catch((error) => console.log("error", error));
//     }
//     setScanned(false);
//   };

//   if (hasPermission === null) {
//     return (
//       <Text>
//         Permettez-moi d'accéder à la caméra pour pouvoir scanner les Code-QR
//       </Text>
//     );
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && (
//         <Button
//           title={"Appuyer pour Re-Scanner"}
//           onPress={() => setScanned(false)}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//   },
// });

// export default HomeScreen;
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("En attente d'un QrCode");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let dataS = data.split(" ,");
    let dataset = dataS[1] || 0;
    if (dataset == 0) {
      navigation.navigate("erreur");
    } else {
      let newCode = dataS[2].trim();
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 1|i90cGR93VtPeLDqBcTJVpaqb40cCZdxhROjRllrJ"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://ir-connectserver.com/api/v1/analysis/?identification=${newCode}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          const displayName = `${result.data[0].prenom} ${result.data[0].nom}`;
          console.log(displayName);
          navigation.navigate("Resultats", {
            displayName,
            code: result.data[0].identification,
            sexe: result.data[0].sexe,
            naissance: result.data[0].naissance,
            datePrelev: result.data[0].date_prelev,
            resultat: result.data[0].resultat,
            passport: result.data[0].code_interne,
          });
        })
        .catch((error) => {
          console.log("error", error);
          navigation.navigate("erreur");
        });
    }
    setScanned(false);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Accès Interdit à la Caméra</Text>
        <Button
          title={"Autoriser la Caméra"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 600, width: 600 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("acceuil")}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Revenir à l'Acceuil</Text>
      </TouchableOpacity>

      {scanned && (
        <Button
          title={"Scanner de Nouveau ?"}
          onPress={() => setScanned(false)}
          color="blue"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#279AF1",
    color: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 400,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "blue",
  },
});
