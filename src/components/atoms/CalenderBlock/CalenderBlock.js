import React from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
function CalenderBlock({style, text, active, onPress}) {
  const dimen = useWindowDimensions();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Styles.Container,
          style ? style.Container : null,
          {
            width: (dimen.width - 40) / 7,
            height: (dimen.width - 100) / 7,
          },
          {
            backgroundColor: active && '#F4C130',
          },
        ]}>
        <Text style={[Styles.Text, style ? style.Text : null]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {fontWeight: '600'},
});

export default CalenderBlock;
