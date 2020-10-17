import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';

function Splash({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainController');
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: '100%', resizeMode: 'contain'}}
          source={require('../../../assets/images/logo.png')}
        />
      </View>
    </>
  );
}

const Style = StyleSheet.create({});
export default Splash;
