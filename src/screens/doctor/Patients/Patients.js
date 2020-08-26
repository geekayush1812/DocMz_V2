import React from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
function PatientList({navigation}) {
  const patientList = [
    {
      name: 'Hunter Richards',
      reason: ' - General Checkup',
      lastVisit: 'Last visit: 10 May 20 ',
    },
    {
      name: 'Stella Washington',
      reason: ' - UTI',
      lastVisit: 'Last visit: 10 May 20',
    },
    {
      name: 'Veronica Stevens',
      reason: ' - Kidney Stones',
      lastVisit: 'Last visit: 10 May 20',
    },
    {
      name: 'Jack Barnett',
      reason: ' - Fever',
      lastVisit: 'Last visit: 10 May 20',
    },
    {
      name: 'Amy Border',
      reason: ' - General Checkup',
      lastVisit: 'Last visit: 10 May 20',
    },
    {
      name: 'Alan Robert',
      reason: '  - Osteopathy',
      lastVisit: 'Last visit: 10 May 20',
    },
    {
      name: 'Jayden Barnes',
      reason: ' - General Checkup',
      lastVisit: 'Last visit: 10 May 20',
    },
    {
      name: 'Veronica Stevens',
      reason: ' - Kidney Stones',
      lastVisit: 'Last visit: 10 May 20',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar headerText={'Patients List'}></TopNavBar>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 4,
          paddingVertical: '4%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
        }}>
        <SearchBarSolid
          withIcon
          placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{height: 20, width: 18}}
              color={SEARCH_PLACEHOLDER_COLOR}
            />
          }
          style={{
            backgroundColor: SECONDARY_BACKGROUND,
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>
      <ScrollView
        style={{backgroundColor: '#f8f8f8', flex: 1, paddingVertical: '5%'}}>
        {patientList.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              elevation: 2,
              padding: '3%',
              borderRadius: 10,
              marginBottom: '4%',
            }}>
            <View style={{width: '90%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 8,
                    width: 8,
                    borderRadius: 15,
                    backgroundColor: '#efa860',
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: '2%',
                    letterSpacing: 0.5,
                  }}>
                  {item.name}
                </Text>
                <Text>{item.reason}</Text>
              </View>
              <Text style={{marginLeft: '4.5%', color: '#a09e9e'}}>
                {item.lastVisit}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}>
              <MaterialIcon
                name={'chevron-right'}
                size={32}
                color={'#a4a2a2'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default PatientList;
