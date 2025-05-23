// <app/controller / online - game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/asset";

export default function BotGameController() {
  const socket = useContext(SocketContext);
  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [idOpponent, setIdOpponent] = useState(null);

  useEffect(() => {
    socket.emit("queue.join","bot");
    setInQueue(false);
    setInGame(false);

    socket.on("queue.added", (data) => {
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });
    socket.on("game.start", (data) => {
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
      setIdOpponent(data["idOpponent"]); // player1 id or player2 id
    });
  }, []);
  return (
    <View style={styles.container}>
      {!inQueue && !inGame && (
        <>
          <Text style={styles.waitingTitle}>Waiting for server datas...</Text>
        </>
      )}
      {inQueue && (
        <>
          <ImageBackground
            source={IMAGE.BACKGROUND}
            resizeMode="stretch"
            style={styles.background}
          >
            <View style={styles.informationContainer}>
              <View></View>
              <View>
                <Text style={styles.waitingTitle}>
                  Recherche d'adversaire en cours
                </Text>
              </View>
              <View style={styles.loadingContainer}>
                <Image 
                  source={IMAGE.DICES} 
                  style={styles.loadingImage}
                />
              </View>
            </View>
          </ImageBackground>
        </>
      )}
      {inGame && (
        <>
          <Board idOpponent={idOpponent} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
    alignItems: "center",
    height: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  informationContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 30,
  },
  waitingTitle: {
    marginTop: 40,
    fontSize: 25,
    color: COLOR.WHITE,
    fontFamily: "Pricedown Bl",
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  loadingImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
