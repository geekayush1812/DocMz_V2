import React from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONT_SIZE_16} from '../../../styles/typography';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
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
  const {recentPatient, recentPatientLoading} = useSelector(
    (state) => state.DoctorReducer,
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar
        navigation={navigation}
        headerText={'Patients List'}></TopNavBar>
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
          placeholder={'Search by name'}
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
        style={{backgroundColor: '#fff', flex: 1, paddingVertical: '5%'}}>
        {recentPatient.length === 0 ? (
          <View
            style={{
              height: 200,
              width: '70%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              style={{height: '100%', width: '100%'}}
              source={require('../../../assets/anim_svg/empty_bottle.json')}
              autoPlay
              // loop={false}
            />
          </View>
        ) : (
          recentPatient.map((item) => {
            if (item) {
              const {patient, _id} = item;
              return patient ? (
                <View
                  key={_id}
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
                          fontSize: FONT_SIZE_16,
                          fontWeight: 'bold',
                          marginLeft: '2%',
                          letterSpacing: 0.5,
                        }}>
                        {`${patient.firstName} ${patient.lastName}`}
                      </Text>
                      <Text>
                        {/* {item.reason} */}
                        --
                      </Text>
                    </View>
                    <Text style={{marginLeft: '4.5%', color: '#a09e9e'}}>
                      {/* {item.lastVisit} */}
                      --
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PatientDetails', {patient});
                    }}>
                    <MaterialIcon
                      name={'chevron-right'}
                      size={32}
                      color={'#a4a2a2'}
                    />
                  </TouchableOpacity>
                </View>
              ) : null;
            }
            return null;
          })
        )}
      </ScrollView>
    </View>
  );
}

export default PatientList;
