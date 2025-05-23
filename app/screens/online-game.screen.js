// app/screens/online-game.screen.js

import React, { useContext, useEffect } from "react";
import OnlineGameController from "../controllers/online-game.controller";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { SocketContext, socket } from "../contexts/socket.context";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/asset";
import NavigationButton from "../components/navigation-button.component";

export default function OnlineGameScreen() {
  const socket = useContext(SocketContext);
  const navigation = useNavigation();

  useEffect(() => {
    const handleGameCancel = () => {
      console.log("Game cancelled by the other player.");
      navigation.navigate("Yam Master"); // Assuming "Yam Master" is your home screen
    };

    // Add event listener for game cancellation
    socket.on("game.reset", handleGameCancel);

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Prevent the default back behavior
      e.preventDefault();

      // Notify the server that the user is navigating away from the game
      socket.emit("game.cancel", { reason: "user navigated back" });

      // Continue with the original navigation action
      navigation.dispatch(e.data.action);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, socket]);

  if (!socket || socket.disconnected) {
    console.log(
      `👻 Yam socket | disconnected | current socket id: ${socket ? socket.id : null}`
    );
  } else {
    console.log(
      `🍕 Yam socket | connected | current socket id: ${socket ? socket.id : null}`
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.BACKGROUND_TEXTURE}
        resizeMode="cover"
        style={styles.background}
      >
        {socket ? (
          <>
            <OnlineGameController />
            <NavigationButton
              navigation={navigation}
              navigationMenu={"Yam Master"}
            />
          </>
        ) : (
          <>
            <Text style={styles.paragraph}>No connection with server...</Text>
            <Text style={styles.footnote}>
              Restart the app and wait for the server to be back again.
            </Text>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  paragraph: {
    margin: 24,
    color: COLOR.WHITE,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  footnote: {
    color: COLOR.WHITE,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    padding: 10,
    margin: 20,
  },
  submit: {
    color: COLOR.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
