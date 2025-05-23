import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import PlayerTimer from "./infos/timers/player-timer.component";
import OpponentTimer from "./infos/timers/opponent-timer.component";
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerInfos from "./infos/players/player-infos.component";
import OpponentInfos from "./infos/players/opponent-infos.component";
import PlayerScore from "./infos/scores/player-score.component";
import OpponentScore from "./infos/scores/opponent-score.component";
import PlayerTokens from "./infos/tokens/player-tokens.component";
import OpponentTokens from "./infos/tokens/opponent-tokens.component";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/asset";
import { DiceProvider } from "../../contexts/dice.context";
import GameInfo from "./infos/game/game-info.component";

const Board = ({ gameViewState }) => {
  return (
    <DiceProvider>
      <View style={styles.container}>
        <GameInfo />
        <ImageBackground
          style={styles.background}
          source={IMAGE.BACKGROUND_TEXTURE}
          resizeMode="cover"
        >
          <View style={[styles.row, { height: "8%" }]}>
            <OpponentInfos />
            <View style={styles.opponentTimerScoreTokenContainer}>
              <OpponentScore />
              <OpponentTokens />
              <OpponentTimer />
            </View>
          </View>
          <View style={[styles.row, { height: "25%" }]}>
            <OpponentDeck />
          </View>
          <View style={[styles.row, { height: "34%" }]}>
            <Grid />
            <Choices />
          </View>
          <View style={[styles.row, { height: "25%" }]}>
            <PlayerDeck />
          </View>
          <View style={[styles.row, { height: "8%" }]}>
            <PlayerInfos />
            <View style={styles.playerTimerScoreTokenContainer}>
              <PlayerScore />
              <PlayerTokens />
              <PlayerTimer />
            </View>
          </View>
        </ImageBackground>
      </View>
    </DiceProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#333333",
  },
  opponentTimerScoreTokenContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  playerTimerScoreTokenContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333333",
  },
});

export default Board;
