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

const AddSurgery = ({visible, onCancel, onUpdate}) => {
  const [details, setDetails] = useState({
    type: '',
    docName: '',
    otor: '',
    date: '',
  });

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        Add Surgery Details
      </Text>
      <TextInput
        value={details.type}
        onChangeText={(text) => setDetails({...details, type: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Surgery Type"
        style={styles.text}
      />

      <TextInput
        value={details.docName}
        onChangeText={(text) => setDetails({...details, docName: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Surgeon’s Name"
        style={styles.text}
      />

      <TextInput
        value={details.otor}
        onChangeText={(text) => setDetails({...details, otor: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="OT/OR"
        style={styles.text}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
        }}>
        <TextInput
          value={details.date}
          onChangeText={(text) => setDetails({...details, date1: text})}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="Date"
          style={[
            styles.text,
            {borderBottomWidth: 0, flex: 1, marginBottom: 0},
          ]}
          editable={false}
        />
        <TouchableOpacity>
          <FontAwesome5
            name="calendar-alt"
            size={22}
            color={NEW_PRIMARY_COLOR}
            style={{marginHorizontal: 5}}
          />
        </TouchableOpacity>
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
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddSurgery;

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
