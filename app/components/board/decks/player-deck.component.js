import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";
import { DiceContext } from "../../../contexts/dice.context";

const PlayerDeck = () => {
  const socket = useContext(SocketContext);
  const [displayPlayerDeck, setDisplayPlayerDeck] = useState(false);
  const [dices, setDices] = useState(Array(5).fill(false));
  const [displayRollButton, setDisplayRollButton] = useState(false);
  const [rollsCounter, setRollsCounter] = useState(1);
  const [rollsMaximum, setRollsMaximum] = useState(3);
  const [isDiceAnimated, setIsDiceAnimated] = useState(false);

  const { isDiceRolled, setIsDiceRolled } = useContext(DiceContext);

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayPlayerDeck(data["displayPlayerDeck"]);
      if (data["displayPlayerDeck"]) {
        setDisplayRollButton(data["displayRollButton"]);
        setRollsMaximum(data["rollsMaximum"]);
        setDices(data["dices"]);
        setRollsCounter(data["rollsCounter"]);
      }
    });
  }, []);

  useEffect(() => {
    setIsDiceRolled(isDiceAnimated);
  }, [isDiceAnimated]);

  const toggleDiceLock = (index) => {
    const newDices = [...dices];

    if (newDices[index].value !== "" && displayRollButton) {
      socket.emit("game.dices.lock", newDices[index].id);
      setIsDiceAnimated(false);
    }
  };

  const rollDices = () => {
    if (rollsCounter === 1) {
      socket.emit("game.dices.roll");
      setIsDiceAnimated(true);

      return;
    }

    if (rollsCounter <= rollsMaximum) {
      setTimeout(() => {
        socket.emit("game.dices.roll");
      }, 2500);
    }
    setIsDiceAnimated(true);
  };

  return (
    <View style={styles.deckPlayerContainer}>
      {displayPlayerDeck ? (
        <>
          <>
            <View style={styles.rollInfoContainer}>
              {displayRollButton && (
                <Text style={styles.rollInfoText}>
                  Lancer
                  <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                    {rollsCounter}
                  </Text>
                  /{rollsMaximum}
                </Text>
              )}
            </View>
          </>
          <View style={styles.diceContainer}>
            {dices.map((diceData, index) => (
              <Dice
                key={diceData.id}
                index={index}
                locked={diceData.locked}
                value={diceData.value}
                onPress={toggleDiceLock}
                isDiceAnimated={isDiceAnimated}
                setIsDiceAnimated={setIsDiceAnimated}
                isPlayer={true}
              />
            ))}
          </View>
          <View style={styles.rollButtonContainer}>
            {displayRollButton && rollsCounter <= rollsMaximum && (
              <View>
                <TouchableOpacity style={styles.rollButton} onPress={rollDices}>
                  <Image
                    style={{ marginRight: 10 }}
                    source={IMAGE.ARROW_RIGHT}
                  />
                  <Text style={styles.rollButtonText}>LANCER</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <View style={styles.waitingContainer}>
            <Image 
              source={IMAGE.PLAYER_TOKEN} 
              style={styles.waitingImage}
            />
            <Text style={styles.waitOpponentText}>
              En attente de l'adversaire
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckPlayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderBottomColor: COLOR.WHITE,
  },
  diceContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rollInfoContainer: {
    height: 30,
    padding: 5,
    marginBottom: 5,
  },
  rollInfoText: {
    color: COLOR.WHITE,
    fontFamily: "Pricedown Bl",
    fontSize: 15,
    paddingRight: 4,
  },
  rollButtonContainer: {
    marginVertical: 5,
    height: 50,
    width: "100%",
  },
  rollButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  rollButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Pricedown Bl",
    textAlign: "center",
  },
  waitingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  waitingImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  waitOpponentText: {
    color: COLOR.WHITE,
    fontFamily: "Pricedown Bl",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PlayerDeck;
