// app/screens/home.screen.js

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { COLOR } from "../constants/color";
import { useFonts } from "expo-font";
import { IMAGE } from "../constants/asset";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Pricedown": require("../assets/fonts/Pricedown Bl.otf"),
    Roboto: require("../assets/fonts/Roboto.ttf"),
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.BACKGROUND}
        resizeMode="stretch"
        style={styles.background}
      >
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
              <Image source={IMAGE.DICES} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.spacerContainer}>
              {/* Espace vide au lieu d'une image */}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Jouer en ligne")}
                style={styles.button}
              >
                <Image style={{ marginRight: 10 }} source={IMAGE.BATTLE} />
                <Text style={styles.buttonText}>Jouer en ligne</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Jouer contre le bot")}
                style={styles.button}
              >
                <Image style={{ marginRight: 10 }} source={IMAGE.BATTLE} />
                <Text style={styles.buttonText}>Affronter le bot</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.spacerContainer}>
              {/* Espace vide au lieu d'une image */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  spacerContainer: {
    alignSelf: "center",
    marginVertical: 10,
    height: 20,
  },
  titleContainer: {
    marginTop: 70,
  },
  title: {
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Pricedown",
    fontSize: 50,
    marginBottom: 20,
  },
  footerContainer: {
    marginBottom: 30,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#333333",
    padding: 25,
    marginVertical: 5,
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "Pricedown",
    color: "#FFFFFF",
  },
  background: {
    flex: 1,
    width: null,
    height: "100%",
  },
});
