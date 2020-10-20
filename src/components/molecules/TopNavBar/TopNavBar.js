import React from 'react';
import {Animated, StyleSheet, Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {PRIMARY, NEW_HEADER_TEXT} from '../../../styles/colors';

import DmzText from '../../atoms/DmzText/DmzText';

function TopNavBar({
  onLeftButtonPress = () => navigation.goBack(),
  onRightButtonPress = () => navigation.openDrawer(),
  headerText,
  LeftComp,
  RightComp,
  isClap = false,
  navigation,
  style,
  hideRightComp,
  hideLeftComp,
}) {
  return (
    <Animated.View
      style={[
        Styles.Container,
        isClap && {
          backgroundColor: PRIMARY,
          height: 80,
          marginTop: 0,
        },
        hideLeftComp && hideRightComp ? {justifyContent: 'center'} : null,
        style ? style.Container : null,
      ]}>
      {!hideLeftComp && (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          onPress={onLeftButtonPress}>
          {!LeftComp ? (
            <Image
              source={require('../../../assets/icons/back.png')}
              style={[Styles.BackButton, style ? style.BackButton : null]}
            />
          ) : (
            // <Iconicons name="chevron-back" size={20} />
            LeftComp
          )}
        </TouchableOpacity>
      )}
      <DmzText
        text={headerText}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[
          {
            fontSize: 20,
            color: NEW_HEADER_TEXT,
            alignSelf: 'center',
            fontFamily: 'Montserrat-Medium',
          },
          style ? style.Header : null,
        ]}
      />
      {!hideRightComp ? (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          // onPress={() => onRightButtonPress()}>
          onPress={() => onRightButtonPress()}>
          {!RightComp ? (
            <Image
              source={require('../../../assets/icons/hamburger_menu.png')}
              style={[
                Styles.HamburgerButton,
                style ? style.HamburgerButton : null,
              ]}
            />
          ) : (
            RightComp
          )}
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    zIndex: 900,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 5,
  },
  TouchableOpacity: {
    padding: 10,
    borderRadius: 20,
  },
  BackButton: {height: 19, width: 10},
  HamburgerButton: {height: 19, width: 24},
});
export default TopNavBar;
