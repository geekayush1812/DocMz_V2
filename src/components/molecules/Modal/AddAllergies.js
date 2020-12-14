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

const AddAllergies = ({visible, onCancel, onUpdate}) => {
  const [details, setDetails] = useState({
    name: '',
    reaction: '',
    Severity: '',
  });

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        Add Allergies
      </Text>
      <TextInput
        value={details.type}
        onChangeText={(text) => setDetails({...details, name: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Allergy Name/Type"
        style={styles.text}
      />

      <TextInput
        value={details.docName}
        onChangeText={(text) => setDetails({...details, reaction: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Reaction"
        style={styles.text}
      />

      <TextInput
        value={details.otor}
        onChangeText={(text) => setDetails({...details, Severity: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Severity"
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
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddAllergies;

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
  inputContainer: {},
});
