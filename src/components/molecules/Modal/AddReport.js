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

const AddReport = ({
  visible,
  onCancel,
  onUpload,
  selectFile,
  document,
  description,
  setDocument,
  setDescription,
}) => {
  const [file, setFile] = useState(null);

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        Upload Report
      </Text>

      <TouchableOpacity onPress={selectFile}>
        {file ? (
          <Text style={styles.text}>{file.name}</Text>
        ) : (
          <Text style={[styles.text, {color: INPUT_PLACEHOLDER}]}>
            Select Report file
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        value={document}
        onChangeText={(text) => setDocument(text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Type of record"
        style={styles.TextInput}
      />
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Description"
        style={styles.TextInput}
      />
      <DmzButton
        onPress={() => {
          onUpload();
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
            marginTop: 15,
            elevation: 3,
          },
        }}
        text="UPLOAD"
      />
    </BlurModal>
  );
};

export default AddReport;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    padding: 5,
    marginTop: 7,
  },
  TextInput: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
});
