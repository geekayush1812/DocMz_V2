import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  GREY_BACKGROUND,
  NEW_PRIMARY_BACKGROUND,
  NEW_HEADER_TEXT,
  INPUT_PLACEHOLDER,
  GREY_CARD,
} from '../../../styles/colors';
import SignleField from '../../../components/molecules/Modal/SingleField';
import ThreeField from '../../../components/molecules/Modal/ThreeField';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import Graph from '../../../components/atoms/Graphs/Graphs';
import {UpdateVitals} from '../../../redux/action/patientAccountAction';
const PADDING = 10;

const Vitals = () => {
  const [heightModal, setHeightModal] = useState(false);
  const [heartModal, setHeartModal] = useState(false);
  const [weightModal, setWeightModal] = useState(false);
  const [sugarModal, setSugarModal] = useState(false);
  const [tempModal, setTempModal] = useState(false);
  const [bpModal, setBpModal] = useState(false);
  const {patient} = useSelector((state) => state.PatientAccountReducer);
  const dispatch = useDispatch();
  const [vitalsInfo, setVitalsInfo] = useState({
    height: '',
    weight: '',
    temperature: '',
    oxygen: '',
    heartRate: '',
    bloodPressure: '',
    respiration: '',
  });

  const cmToFeet = (val) => {
    var realFeet = (parseInt(val, 10) * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = ((realFeet - feet) * 12).toPrecision(3);
    const res = {
      feet: feet,
      inches: inches,
    };
    return res;
  };

  useEffect(() => {
    console.log(patient);
    setVitalsInfo({
      height: patient?.height?.value ? patient.height : '',
      weight: patient?.weight?.value ? patient.weight : '',
      temperature: patient?.temperature?.value ? patient.temperature : '',
      oxygen: patient?.oxygen?.value ? patient.oxygen : '',
      heartRate: patient?.heartRate.length ? patient.heartRate : [],
      bloodPressure: patient?.bloodPressure.length ? patient.bloodPressure : [],
      respiration: patient?.respiration?.value ? patient.respiration : '',
    });
  }, [patient]);

  const updateVitals = (res, callback = () => {}) => {
    dispatch(UpdateVitals(res, patient._id, patient.meta));
    callback();
  };

  return (
    <>
      <SignleField
        visible={heightModal}
        onCancel={() => setHeightModal(false)}
        headingText="Add Height"
        labelText="Height"
        unit="cm"
        onUpdate={(temp) => {
          updateVitals(
            {
              field: 'height',
              data: {
                value: temp,
                modifiedBy: 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setHeightModal(false),
          );
        }}
      />
      <SignleField
        visible={heartModal}
        onCancel={() => setHeartModal(false)}
        headingText="Add Heart Rate"
        labelText=""
        unit="bpm"
        onUpdate={(temp) => {}}
      />
      <ThreeField
        visible={weightModal}
        onCancel={() => setWeightModal(false)}
        headingText="Add Weight"
        labelText={['Weight (kg)', 'Fat Mass (kg)']}
        onUpdate={(weight, unit, date) => {
          updateVitals(
            {
              field: 'weight',
              data: {
                value: weight,
                modifiedBy: 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setWeightModal(false),
          );
        }}
      />
      <ThreeField
        visible={tempModal}
        onCancel={() => setTempModal(false)}
        headingText="Record Temperature"
        labelText={['C', 'F']}
        onUpdate={(celcius, faren, date) => {
          updateVitals(
            {
              field: 'temperature',
              data: {
                value: celcius,
                modifiedBy: 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setTempModal(false),
          );
        }}
      />
      <ThreeField
        visible={bpModal}
        onCancel={() => setBpModal(false)}
        headingText="Add Blood Pressure"
        labelText={['Systolic', 'Diastolic']}
        onUpdate={() => {}}
      />
      <ThreeField
        visible={sugarModal}
        onCancel={() => setSugarModal(false)}
        headingText="Add Blood Sugar"
        labelText={['mg/dL', 'Mmol/L']}
        onUpdate={() => {}}
      />

      <ScrollView
        contentContainerStyle={{
          padding: PADDING,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.card, {flex: 1}]}>
            <Text style={styles.cardHeaderText}>Weight</Text>
            <Text style={styles.text1}>{vitalsInfo.weight.value} kg</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.text3}>
                  Updated on :{' '}
                  {moment(vitalsInfo.weight.date).format("MM MMM 'YY")}
                </Text>
                <Text style={styles.text2}>BMI 26.0</Text>
              </View>
              <TouchableOpacity onPress={() => setWeightModal(true)}>
                <Image
                  source={require('../../../assets/icons/back.png')}
                  style={{
                    height: 20,
                    width: 20,
                    transform: [{rotateZ: '180deg'}],
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.card, {flex: 1}]}>
            <Text style={styles.cardHeaderText}>Height</Text>
            <Text style={styles.text1}>
              {cmToFeet(vitalsInfo.height.value).feet} ft ,
              {cmToFeet(vitalsInfo.height.value).inches} in
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.text2}>({vitalsInfo.height.value} cm)</Text>
                <Text style={styles.text3}>
                  Recorded on :{' '}
                  {moment(vitalsInfo.height.date).format("MM MMM 'YY")}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setHeightModal(true)}>
                <Image
                  source={require('../../../assets/icons/back.png')}
                  style={{
                    height: 20,
                    width: 20,
                    transform: [{rotateZ: '180deg'}],
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>Blood Pressure</Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3, marginRight: 20}}>
              <Graph
                data={[0, 30, 49, 78, 120, 132]}
                hasAxis={true}
                style={{alignSelf: 'center'}}
              />
              <Text style={styles.text3}>
                Updated on :
                {moment(vitalsInfo.bloodPressure.date).format("MM MMM 'YY")}
              </Text>
            </View>

            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[styles.text1, {padding: 1}]}>110/95</Text>
                <Text style={styles.text2}>Optimal</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: '#efa860',
                      marginRight: 5,
                    }}
                  />
                  <Text style={[styles.text3, {color: NEW_HEADER_TEXT}]}>
                    SBP
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: '#f8d7b6',
                      marginRight: 5,
                    }}
                  />
                  <Text style={[styles.text3, {color: NEW_HEADER_TEXT}]}>
                    DBP
                  </Text>
                </View>
              </View>

              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => setBpModal(true)}>
                  <Image
                    source={require('../../../assets/icons/back.png')}
                    style={{
                      height: 20,
                      width: 20,
                      transform: [{rotateZ: '180deg'}],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>Heart Rate</Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3, marginRight: 20}}>
              <Graph
                data={[10, 20, 39, 88, 83, 67]}
                hasAxis={true}
                style={{alignSelf: 'center'}}
              />
              <Text style={styles.text3}>Updated on : 22 May ‘20</Text>
            </View>

            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[styles.text1, {padding: 1}]}>65 BPM</Text>
                <Text style={styles.text2}>Normal</Text>
              </View>

              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => setHeartModal(true)}>
                  <Image
                    source={require('../../../assets/icons/back.png')}
                    style={{
                      height: 20,
                      width: 20,
                      transform: [{rotateZ: '180deg'}],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={[styles.card, {flex: 1}]}>
            <Text style={styles.cardHeaderText}>Temperature</Text>
            <Text style={styles.text1}>{vitalsInfo.temperature.value} C</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.text3}>Updated on : 22 May ‘20</Text>
                <Text style={styles.text2}>Fever</Text>
              </View>
              <TouchableOpacity onPress={() => setTempModal(true)}>
                <Image
                  source={require('../../../assets/icons/back.png')}
                  style={{
                    height: 20,
                    width: 20,
                    transform: [{rotateZ: '180deg'}],
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.card, {flex: 1}]}>
            <Text style={styles.cardHeaderText}>Glucose</Text>
            <Text style={styles.text1}>204 mg/dL</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.text2}>High</Text>
                <Text style={styles.text3}>Recorded on : 22 May ‘20</Text>
              </View>
              <TouchableOpacity onPress={() => setSugarModal(true)}>
                <Image
                  source={require('../../../assets/icons/back.png')}
                  style={{
                    height: 20,
                    width: 20,
                    transform: [{rotateZ: '180deg'}],
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Vitals;

const styles = StyleSheet.create({
  card: {
    padding: 7,
    margin: PADDING,
    backgroundColor: 'white',
    borderRadius: 13,
    elevation: 2,
    paddingBottom: 10,
  },
  cardHeaderText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: NEW_PRIMARY_BACKGROUND,
    padding: 5,
  },
  text1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: NEW_HEADER_TEXT,
    padding: 5,
  },
  text2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: NEW_HEADER_TEXT,
    padding: 1,
  },
  text3: {
    fontFamily: 'Montserrat-Regu;ar',
    fontSize: 9,
    color: INPUT_PLACEHOLDER,
    padding: 1,
  },
});
