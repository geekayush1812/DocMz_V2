import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {array} from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
const AddFamily = ({visible, onCancel, onUpdate}) => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    relation: '',
    email: '',
    birthDay: '',
    gender: '',
    contact: '',
    medicalHistory: [],
  });

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: '8%',
        }}>
        Add Member
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          marginBottom: '3%',
        }}>
        <TextInput
          value={details.firstName}
          onChangeText={(text) => setDetails({...details, firstName: text})}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="First Name"
          style={[styles.text, {width: '48%'}]}
        />
        <TextInput
          value={details.lastName}
          onChangeText={(text) => setDetails({...details, lastName: text})}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="Last Name"
          style={[styles.text, {width: '48%'}]}
        />
      </View>

      <TextInput
        value={details.relation}
        onChangeText={(text) => setDetails({...details, relation: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Relationship"
        style={styles.text}
      />
      <TextInput
        value={details.email}
        onChangeText={(text) => setDetails({...details, email: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Email"
        style={styles.text}
      />

      {/* <TextInput
        value={details.otor}
        onChangeText={(text) => setDetails({...details, otor: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="OT/OR"
        style={styles.text}
      /> */}

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          marginBottom: '3%',
        }}>
        <View style={[styles.text, {width: '48%'}]}>
          <DatePicker
            date={details.birthDay}
            mode="date"
            placeholder="Date of Birth"
            format="MM/DD/YYYY"
            minDate="01/01/1900"
            maxDate={moment(new Date(), 'MM/DD/YYYY')}
            showIcon={false}
            allowFontScaling={true}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                fontSize: 15,
                height: 40,
              },
              placeholderText: {
                color: '#77777795',
                width: '100%',
              },
              dateText: {
                color: '#000',
                width: '100%',
              },
            }}
            style={{
              width: '100%',
            }}
            onDateChange={(txt) => setDetails({...details, birthDay: txt})}
          />
        </View>

        <TextInput
          value={details.gender}
          onChangeText={(text) => setDetails({...details, gender: text})}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="Gender"
          style={[styles.text, {width: '48%'}]}
        />
      </View>
      <TextInput
        value={details.contact}
        onChangeText={(text) => setDetails({...details, contact: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Contact"
        style={styles.text}
      />

      {details.medicalHistory.map((item, i) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: NEW_PRIMARY_BACKGROUND,
            borderBottomWidth: 1.5,
            marginBottom: 10,
          }}>
          <TextInput
            value={item}
            onChangeText={(text) => {
              let temp = details.medicalHistory;
              temp[i] = text;
              setDetails({...details, medicalHistory: temp});
            }}
            placeholderTextColor={INPUT_PLACEHOLDER}
            placeholder="Medical History"
            style={[
              styles.text,
              {borderBottomWidth: 0, flex: 1, marginBottom: 0},
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              let temp = details.medicalHistory;
              if (i + 1 === details.medicalHistory.length) temp.push('');
              else temp.splice(i, 1);
              setDetails({...details, medicalHistory: temp});
            }}>
            <FontAwesome5
              name={i + 1 === details.medicalHistory.length ? 'plus' : 'minus'}
              size={10}
              color={INPUT_PLACEHOLDER}
              style={{marginHorizontal: '2%'}}
            />
          </TouchableOpacity>
        </View>
      ))}

      <DmzButton
        onPress={() => {
          onUpdate(details);
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddFamily;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
});
