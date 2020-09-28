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

  return (
    <View style={styles.mianContainer}>
      <TopNavBar
        headerText="Medical History"
        style={{Container: {marginTop: 5, marginBottom: 10}}}
        navigation={navigation}
      />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            width: 600,
          }}>
          <TouchableOpacity
            style={[styles.tabContainer, {borderRightWidth: 1}]}
            onPress={() => setTab('vitals')}>
            <Text
              style={
                tab === 'vitals' ? styles.activeTabText : styles.inactiveTabText
              }>
              Vitals
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabContainer,
              {borderRightWidth: 1, borderLeftWidth: 1},
            ]}
            onPress={() => setTab('meds')}>
            <Text
              style={
                tab === 'meds' ? styles.activeTabText : styles.inactiveTabText
              }>
              Meds
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabContainer,
              {borderRightWidth: 1, borderLeftWidth: 1},
            ]}
            onPress={() => setTab('reports')}>
            <Text
              style={
                tab === 'reports'
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }>
              Reports
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabContainer, {borderLeftWidth: 1}]}
            onPress={() => setTab('surgeries')}>
            <Text
              style={
                tab === 'surgeries'
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }>
              Surgeries
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabContainer, {borderLeftWidth: 1}]}
            onPress={() => setTab('allergies')}>
            <Text
              style={
                tab === 'allergies'
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }>
              Allergies
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        {tab === 'vitals' ? (
          <Vitals />
        ) : tab === 'meds' ? (
          <Meds />
        ) : tab === 'reports' ? (
          <Reports />
        ) : tab == 'surgeries' ? (
          <Surgeries />
        ) : tab == 'allergies' ? (
          <Allergies />
        ) : null}
      </View>
    </View>
  );
};

export default MedicalHistory;

const styles = StyleSheet.create({
  mianContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  tabContainer: {
    flex: 1,
    marginVertical: 15,
    alignItems: 'center',
    borderColor: NEW_PRIMARY_COLOR,
    paddingVertical: 3,
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
