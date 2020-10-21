import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {Colors} from '../../../styles/colorsV2';
import useTheme from '../../../styles/theme';

function Skins({navigation}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const setTheme = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor: Colors[theme].primary_background}}>
      <TopNavBar navigation={navigation} headerText={'Theme'} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{paddingVertical: '3%'}}
          onPress={() => {
            setTheme('PRIMARY');
          }}>
          <Text>Primary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: '3%'}}
          onPress={() => {
            setTheme('DARK');
          }}>
          <Text>Dark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: '3%'}}
          onPress={() => {
            setTheme('MINI');
          }}>
          <Text>Mini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Skins;
