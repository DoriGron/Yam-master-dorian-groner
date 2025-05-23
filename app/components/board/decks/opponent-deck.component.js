import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { DiceContext } from "../../../contexts/dice.context";
import Dice from "./dice.component";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";

const OpponentDeck = () => {
  const socket = useContext(SocketContext);
  const { isDiceRolled } = useContext(DiceContext);

  const [displayOpponentDeck, setDisplayOpponentDeck] = useState(false);
  const [opponentDices, setOpponentDices] = useState(
    Array(5).fill({ value: "", locked: false })
  );

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayOpponentDeck(data["displayOpponentDeck"]);
      if (data["displayOpponentDeck"]) {
        setOpponentDices(data["dices"]);
      }
    });
  }, []);

  return (
    <View style={styles.deckOpponentContainer}>
      {displayOpponentDeck ? (
        <View style={styles.diceContainer}>
          {!isDiceRolled &&
            opponentDices.map((diceData, index) => (
              <Dice
                key={index}
                locked={diceData.locked}
                value={diceData.value}
                opponent={true}
                isPlayer={false}
              />
            ))}
        </View>
      ) : (
        <>
          <View>
            <View style={styles.waitingContainer}>
              <Image 
                source={IMAGE.OPPONENT_TOKEN} 
                style={styles.waitingImage}
              />
              <Text style={styles.waitingText}>Adversaire</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckOpponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderTopColor: COLOR.WHITE,
  },
  diceContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
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
  waitingText: {
    color: COLOR.WHITE,
    fontFamily: "Pricedown Bl",
    fontSize: 20,
    textAlign: "center",
  }
});

export default OpponentDeck;
