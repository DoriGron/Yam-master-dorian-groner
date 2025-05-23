import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title = "Yam" }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333333', // Gris foncé
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF', // Contour blanc
    width: '100%',
  },
  headerText: {
    color: '#FFFFFF', // Texte blanc
    fontSize: 24,
    fontFamily: 'Pricedown Bl',
  },
});

export default Header; 