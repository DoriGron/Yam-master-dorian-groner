import React, { useContext, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";
import { DiceContext } from "../../../contexts/dice.context";

const Dice = ({
  index,
  locked,
  value,
  onPress,
  opponent,
  isDiceAnimated,
  setIsDiceAnimated,
  isPlayer,
}) => {
  const handlePress = () => {
    if (!opponent) {
      onPress(index);
    }
  };

  const diceImages = {
    1: IMAGE.DICE_1,
    2: IMAGE.DICE_2,
    3: IMAGE.DICE_3,
    4: IMAGE.DICE_4,
    5: IMAGE.DICE_5,
    6: IMAGE.DICE_6,
  };

  // Simulate animation finishing after 1 second
  useEffect(() => {
    if (isDiceAnimated && !locked) {
      const timer = setTimeout(() => {
        setIsDiceAnimated(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDiceAnimated, locked]);

  return (
    <TouchableOpacity
      style={[
        styles.dice,
        isPlayer
          ? {
              backgroundColor: COLOR.BLUE,
              borderColor: COLOR.BLUE,
            }
          : {
              backgroundColor: COLOR.YELLOW,
              borderColor: COLOR.YELLOW,
            },
        locked && styles.lockedDice,
      ]}
      onPress={handlePress}
      disabled={opponent}
    >
      {isDiceAnimated && !locked ? (
        <View style={styles.diceAnimationContainer}>
          <Text style={styles.diceAnimationText}>🎲</Text>
        </View>
      ) : (
        <View>
          {value !== "" && (
            <View>
              <Image
                style={{ width: 30, height: 30 }}
                source={diceImages[value]}
              />
              {locked && <Text style={styles.lockIndicator}>🔒</Text>}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dice: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedDice: {
    backgroundColor: COLOR.GRAY,
    borderWidth: 2,
  },
  diceAnimationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  diceAnimationText: {
    fontSize: 28,
  },
  lockIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: -20,
    fontSize: 15,
  },
  diceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  opponentText: {
    fontSize: 12,
    color: "red",
  },
});

export default Dice;
