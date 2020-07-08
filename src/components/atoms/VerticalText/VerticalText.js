import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function VerticalText({text, isActive = false}) {
  return (
    <View style={[Styles.Day, isActive && Styles.DayActive]}>
      <Text style={[Styles.DayText, Styles.Up]}>{text.Top}</Text>
      <Text style={[Styles.DayText, Styles.Down]}>{text.Bottom}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  Day: {
    padding: 6,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  DayText: {
    fontSize: 16,
    color: '#575757',
  },
  Up: {
    fontWeight: 'bold',
  },
  Down: {
    fontWeight: '500',
  },
  DayActive: {
    backgroundColor: '#F4C130',
    borderRadius: 20,
  },
});

export default VerticalText;
