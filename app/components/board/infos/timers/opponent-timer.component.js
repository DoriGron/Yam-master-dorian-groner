import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SocketContext } from "../../../../contexts/socket.context";
import { COLOR } from "../../../../constants/color";

const OpponentTimer = () => {
  const socket = useContext(SocketContext);
  const [opponentTimer, setOpponentTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setOpponentTimer(data["opponentTimer"]);
    });
  }, []);

  return (
    <View style={styles.opponentTimerContainer}>
      {opponentTimer !== 0 ? (
        <View>
          <View style={{ marginTop: 5 }}>
            <CountdownCircleTimer
              isPlaying={true}
              size={20}
              strokeWidth={5}
              trailStrokeWidth={5}
              duration={30}
              colors={[COLOR.YELLOW, COLOR.GRAY, COLOR.DARK_RED]}
              colorsTime={[10, 6, 1]}
              onComplete={() => ({
                shouldRepeat: true,
                delay: 1,
              })}
            />
          </View>
          <Text
            style={[
              styles.opponentTimerText,
              opponentTimer < 20 && { color: COLOR.YELLOW },
              opponentTimer < 10 && { color: COLOR.LIGHT_RED },
            ]}
          >
            {opponentTimer} ⏳
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
  opponentTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opponentTimerText: {
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
    color: COLOR.YELLOW,
    fontFamily: "Pricedown Bl",
  }
});

export default OpponentTimer;
