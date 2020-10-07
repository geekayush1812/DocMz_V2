import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import THEME from '../../../styles/theme';
import Colors from '../../../styles/colorsV2';

function Skins({navigation}) {
  const [theme, setTheme] = THEME.useTheme();
  const [themeValue, setThemeValue] = useState({});
  useEffect(() => {
    const THEME_VALUE = Colors(theme);
    setThemeValue(THEME_VALUE);
  }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor: themeValue.primary_background}}>
      <TopNavBar navigation={navigation} headerText={'Theme'} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{paddingVertical: '3%'}}
          onPress={() => {
            setTheme(THEME.THEME.PRIMARY);
          }}>
          <Text>Primary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: '3%'}}
          onPress={() => {
            setTheme(THEME.THEME.DARK);
          }}>
          <Text>Dark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: '3%'}}
          onPress={() => {
            setTheme(THEME.THEME.MINI);
          }}>
          <Text>Mini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Skins;
