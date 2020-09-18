import React, {useState, useReducer, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Available from '../../../assets/svg/available.svg';
import ConsultFeeIcon from '../../../assets/svg/consult_fee_icon.svg';
import TextInputCustom from '../../atoms/TextInputCustom/TextInputCustom';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import TopNavBar from '../TopNavBar/TopNavBar';
import Section from '../Section/Section';
import CardInRow from '../CardInRow/CardInRow';
import GradientTopNavBar from '../../molecules/TopNavBar/GradientTopNavBar';
import ProfileColText from '../../molecules/ProfileCol/ProfileColText';
import TopNavBarProfile from '../../molecules/TopNavBar/TopNavBarProfile';
import ScheduleAppointment from '../../organisms/ScheduleAppointment/ScheduleAppointment';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import AppointmentQuestion from '../Modal/AppointmentQuestion';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {Picker} from '@react-native-community/picker';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {bookAppointment} from '../../../redux/action/patientAccountAction';
const Data = [
  {
    name: 'kamalesh biswas',
    reasonForVisit: 'head pain',
    contact: '8001981992',
  },
  {
    name: 'kamalesh biswas',
    reasonForVisit: 'head pain',
    contact: '8001981992',
  },
  {
    name: 'kamalesh biswas',
    reasonForVisit: 'head pain',
    contact: '8001981992',
  },
  {
    name: 'samiran biswas',
    reasonForVisit: 'cancer',
    contact: '9001981991',
  },
];

const ConfirmAppointment = ({navigation}) => {
  const {data: slotData, doctorData} = navigation.state.params;
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [memberCredential, setMemberCredential] = useState({
    id: '',
    name: '',
    contact: '',
    date: '',
  });
  const PopupTranslateY = useRef(new Animated.Value(0)).current;

  console.log('************************************');
  console.log(slotData);
  console.log('************************************');
  console.log(doctorData);

  const {familyMember, patient} = useSelector(
    (state) => state.PatientAccountReducer,
  );
  // const [state, setState] = useState({
  //   name: '',
  //   reasonForVisit: '',
  //   contact: '',
  // });

  const credentialSet = (id) => {
    const member = familyMember.find((item) => item._id === id);
    setMemberCredential({
      id: id,
      name: `${member.firstName} ${member.lastName}`,
      date: moment(slotData.bookedFor).format('ddd,MMMM M - HH:mm a'),
      contact: patient.phone,
    });
  };
  // const initialChoosenState = (_state) => {
  //   setState(_state);
  // };

  const handelAppointmentSubmit = () => {
    const member = familyMember.find(
      (item) => item._id === memberCredential.id,
    );
    const data = {
      timeSlot: slotData._id,
      patient: patient._id,
      forWhom: member.relationship,
      patientInfo: JSON.stringify(member),
    };
    navigation.navigate('Questionnaire', {
      doctorData,
      appointmentBookingData: data,
    });
    // dispatch(bookAppointment(data));
  };

  const onPress = (id) => {
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  return (
    <View style={ConfirmAppointmentStyles.Container}>
      <TopNavBar
        headerText="Appointment Summary"
        navigation={navigation}
        style={{
          Container: {
            height: 'auto',
            marginTop: 5,
          },
        }}
      />

      <ScrollView style={ConfirmAppointmentStyles.ScrollView}>
        <View style={[ConfirmAppointmentStyles.rootGroup, {marginTop: 40}]}>
          <Text style={ConfirmAppointmentStyles.rootHeading}>
            Patient Details
          </Text>
          <View style={ConfirmAppointmentStyles.inputGroup}>
            <View
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.upperText,
              ]}>
              <Picker
                style={{height: 20, width: '100%'}}
                selectedValue={memberCredential.id}
                onValueChange={credentialSet}>
                <Picker.Item color="#777" label="Select Name" value={null} />
                {familyMember.map((item) => (
                  <Picker.Item
                    label={`${item.firstName} ${item.lastName}`}
                    value={item._id}
                  />
                ))}
              </Picker>
            </View>
            <Text style={[ConfirmAppointmentStyles.text]}>
              {memberCredential.contact}
            </Text>
            <Text
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.bottomText,
              ]}>
              I am a new patient
            </Text>
          </View>
        </View>

        <View style={ConfirmAppointmentStyles.rootGroup}>
          <Text style={ConfirmAppointmentStyles.rootHeading}>Appointment</Text>
          <View style={ConfirmAppointmentStyles.inputGroup}>
            <Text
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.upperText,
              ]}>
              Reason - Urinary Tract Infection (UTI)
            </Text>
            <Text style={[ConfirmAppointmentStyles.text]}>
              {memberCredential.date}
            </Text>
            <Text style={[ConfirmAppointmentStyles.text]}>
              Dr. {doctorData.basic.name} - {doctorData.specialty}
            </Text>
            <Text
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.bottomText,
              ]}>
              Consultation Fee - ₹600
            </Text>
          </View>
        </View>

        <View style={ConfirmAppointmentStyles.rootGroup}>
          <Text style={ConfirmAppointmentStyles.rootHeading}>Notes</Text>
          <View style={ConfirmAppointmentStyles.inputGroup}>
            {/* <Text
                style={[
                  ConfirmAppointmentStyles.text,
                  ConfirmAppointmentStyles.bottomText,
                  ConfirmAppointmentStyles.upperText,
                ]}>
                Add notes for the doctor
              </Text> */}
            <TextInput
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.bottomText,
                ConfirmAppointmentStyles.upperText,
              ]}
              placeholder="Add notes for the doctor"
              placeholderTextColor={INPUT_PLACEHOLDER}
            />
          </View>
        </View>

        <DmzButton
          onPress={handelAppointmentSubmit}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginVertical: 20,
              elevation: 3,
            },
          }}
          text="CONFIRM"
        />
      </ScrollView>

      {/* <ScheduleAppointment
        doctors={data.output || data.appointments}
        activeId={0}
        PopupTranslateY={PopupTranslateY}
        onPress={onPress}
        showPopup={showPopup}
        navigation={navigation}
        // obj ={ _.dropRightWhile(doctors, ['_id', __id])}
      /> */}
    </View>
  );
};

const ConfirmAppointmentStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
  ScheduleAvailability: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ScheduleTiming: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
  },
  DateAndTime: {
    marginLeft: 5,
  },
  Date: {
    color: '#222',
  },
  Time: {
    fontWeight: '600',
    fontSize: 15,
  },
  Available: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  AvailableText: {
    color: '#22C663',
    marginLeft: 10,
  },
  InputLabel: {
    fontSize: 18,
    color: '#545454',
    marginTop: 10,
    marginLeft: 10,
  },
  ConsultFeeContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootGroup: {
    margin: 15,
    marginVertical: 20,
  },
  rootHeading: {
    fontSize: 19,
    fontFamily: 'Montserrat-SemiBold',
    color: NEW_HEADER_TEXT,
    marginBottom: 10,
  },
  inputGroup: {
    borderRadius: 15,
    // padding: 10,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    // paddingVertical: 20,
  },
  upperText: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  bottomText: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default ConfirmAppointment;
