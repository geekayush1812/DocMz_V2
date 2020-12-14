import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function RadioBtn({active, keyName, value = 'null', setKeyName = () => {}}) {
  const onPress = () => {
    setKeyName(keyName);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
    marginLeft: '4%',
  },
});
export default RadioBtn;
