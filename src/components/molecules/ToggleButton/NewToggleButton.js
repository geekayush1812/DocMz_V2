import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Easing,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import ToggleDot from '../../atoms/ToggleDot/ToggleDot';
import {SECONDARY_BACKGROUND, SECONDARY_COLOR} from '../../../styles/colors';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
function NewToggleButton({
  text0,
  text1,
  style,
  onToggle,
  toggle,
  textStyle,
  btnStyle,
}) {
  const onTouch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    console.log('pressed');
    onToggle();
  };
  return (
    <Animated.View style={[ToggleButtonStyles.Container, style ? style : null]}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={onTouch}
          disabled={toggle}
          style={[btnStyle ? btnStyle : null]}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              ToggleButtonStyles.Text,
              textStyle ? textStyle : null,
              {
                backgroundColor: toggle
                  ? SECONDARY_COLOR
                  : SECONDARY_BACKGROUND,
                color: toggle ? 'white' : 'black',
              },
            ]}>
            {text0}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={onTouch}
          disabled={!toggle}
          style={[btnStyle ? btnStyle : null]}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              ToggleButtonStyles.Text,
              textStyle ? textStyle : null,
              {
                backgroundColor: !toggle
                  ? SECONDARY_COLOR
                  : SECONDARY_BACKGROUND,
                color: !toggle ? 'white' : 'black',
              },
            ]}>
            {text1}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const ToggleButtonStyles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 11,
    alignItems: 'center',
    backgroundColor: SECONDARY_BACKGROUND,
    elevation: 2,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  Text: {
    fontSize: 10,
    // fontWeight: 'bold',
    margin: 5,
    padding: 5,
    borderRadius: 7,
    textAlign: 'center',
    marginHorizontal: 2,
  },
});
export default NewToggleButton;
