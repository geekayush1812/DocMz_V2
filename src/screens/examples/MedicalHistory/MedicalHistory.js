import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  SECONDARY_BACKGROUND,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  GREY_OUTLINE,
  GREY_CARD,
  NEW_PRIMARY_LIGHT_BG,
  GREY_BACKGROUND,
} from '../../../styles/colors';
import Vitals from './Vitals';
import Meds from './Meds';
import Reports from './Reports';
import Surgeries from './Surgeries';
import Allergies from './Allergies';

const MedicalHistory = ({navigation}) => {
  const [tab, setTab] = useState('vitals');
  const screenWidth = Dimensions.get('screen').width;
  const tabs = [
    {name: 'Vitals', key: 'vitals'},
    {name: 'Meds', key: 'meds'},
    {name: 'Reports', key: 'reports'},
    // "Surgeries",
    // "Allergies"
  ];
  return (
    <View style={styles.mianContainer}>
      <TopNavBar
        headerText="Medical History"
        style={{Container: {marginTop: 5, marginBottom: 10}}}
        navigation={navigation}
      />
      <View style={{height: 50, width: '100%', paddingVertical: '2%'}}>
        <FlatList
          horizontal
          data={tabs}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => setTab(item.key)}
                style={{
                  width: screenWidth * 0.33,
                  justifyContent: 'center',
                  borderRightColor: 'green',
                  borderRightWidth: 1,
                  alignItems: 'center',
                }}>
                <Text
                  style={
                    item.key === tab
                      ? styles.activeTabText
                      : styles.inactiveTabText
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        {tab === 'vitals' ? (
          <Vitals />
        ) : tab === 'meds' ? (
          <Meds />
        ) : tab === 'reports' ? (
          <Reports />
        ) : // ) : tab == 'surgeries' ? (
        //   <Surgeries />
        // ) : tab == 'allergies' ? (
        //   <Allergies />
        null}
      </View>
    </View>
  );
};

export default MedicalHistory;

const styles = StyleSheet.create({
  mianContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    width: '33%',
    alignSelf: 'center',
    paddingHorizontal: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: NEW_PRIMARY_COLOR,
  },
  inactiveTabText: {
    fontFamily: 'Montserrat-Regular',
    color: INPUT_PLACEHOLDER,
    fontSize: 18,
  },
  activeTabText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: NEW_HEADER_TEXT,
  },
});
