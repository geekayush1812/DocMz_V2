import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';

const AddHealthCare = ({visible, onCancel, onUpdate}) => {
  const [details, setDetails] = useState({
    doctorName: '',
  });

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        Add Doctor
      </Text>
      <TextInput
        value={details.doctorName}
        onChangeText={(text) => setDetails({...details, doctorName: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Doctor's name"
        style={styles.text}
      />

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
      <View style={{marginTop: '15%'}}>
        <Text style={{textAlign: 'center'}}>
          Concerned Doctor not available?
        </Text>
        <Text style={{textAlign: 'center', color: '#37acac'}}>
          Invite them to join DocEz
        </Text>
      </View>
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

export default AddHealthCare;

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
