import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function RadioBtnVertical({
  active,
  keyName,
  value = 'null',
  setKeyName = () => {},
}) {
  const onPress = () => {
    setKeyName(keyName);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: '5%',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingHorizontal: '5%',
      }}>
      <TouchableWithoutFeedback onPress={onPress} style={Styles.Touchable}>
        {active && (
          <View
            style={{
              backgroundColor: '#047b7b',
              height: 12,
              width: 12,
              borderRadius: 12,
            }}></View>
        )}
      </TouchableWithoutFeedback>
      <Text style={Styles.Text}>{value}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  Touchable: {
    height: 18,
    width: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#047b7b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    // fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '4%',
  },
});
export default RadioBtnVertical;
