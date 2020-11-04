import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {NEW_PRIMARY_COLOR} from '../../../styles/colors';
import {Colors} from '../../../styles/colorsV2';
import useTheme from '../../../styles/theme';

function Skins({navigation}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const setTheme = useTheme();
  useEffect(() => {
    console.log(theme);
    console.log(Colors);
  }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
      <TopNavBar navigation={navigation} headerText={'Theme'} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            paddingVertical: '3%',
            width: '80%',
            height: 100,
            backgroundColor: '#047b7b',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            setTheme('PRIMARY');
          }}>
          <Text style={{color: '#fff'}}>Primary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: '3%',
            width: '80%',
            height: 100,
            backgroundColor: '#181818',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '3%',
            borderRadius: 10,
          }}
          onPress={() => {
            setTheme('DARK');
          }}>
          <Text style={{color: '#aaa'}}>Dark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: '3%',
            width: '80%',
            height: 100,
            backgroundColor: '#f58c7a',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            setTheme('MINI');
          }}>
          <Text style={{color: '#fafafa'}}>Mini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Skins;
