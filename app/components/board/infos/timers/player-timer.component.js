import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { COLOR } from "../../../../constants/color";
import { SocketContext } from "../../../../contexts/socket.context";

const PlayerTimer = () => {
  const socket = useContext(SocketContext);
  const [playerTimer, setPlayerTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setPlayerTimer(data["playerTimer"]);
    });
  }, []);

  return (
    <View style={styles.playerTimerContainer}>
      {playerTimer !== 0 ? (
        <View>
          <View style={{ marginTop: 5 }}>
            <CountdownCircleTimer
              isPlaying={true}
              size={20}
              strokeWidth={5}
              trailStrokeWidth={5}
              duration={30}
              colors={[COLOR.BLUE, COLOR.GRAY, COLOR.DARK_RED]}
              colorsTime={[10, 6, 1]}
              onComplete={() => ({
                shouldRepeat: true,
                delay: 1,
              })}
            />
          </View>
          <Text
            style={[
              styles.playerTimerText,
              playerTimer < 20 && { color: COLOR.YELLOW },
              playerTimer < 10 && { color: COLOR.LIGHT_RED },
            ]}
          >
            {playerTimer} ⏳
          </Text>
        </View>
      ) : (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>⏳</Text>
          <Text style={styles.waitingText}>--</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playerTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerTimerText: {
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "Pricedown Bl",
    width: 50,
  },
  waitingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  waitingText: {
    fontSize: 18,
    color: COLOR.BLUE,
    fontFamily: "Pricedown Bl",
  }
});

export default PlayerTimer;
