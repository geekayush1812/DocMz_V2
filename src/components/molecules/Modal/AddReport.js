import React from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';

const AddReport = ({
  visible,
  onCancel,
  onUpload,
  selectFile,
  testName,
  testType,
  setTestName,
  setTestType,
  fileName = '',
  disable,
}) => {
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
        {fileName ? (
          <Text style={styles.text}>{fileName}</Text>
        ) : (
          <Text style={[styles.text, {color: INPUT_PLACEHOLDER}]}>
            Select Report file
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        value={testName}
        onChangeText={(text) => setTestName(text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Name of Test"
        style={styles.TextInput}
      />
      <TextInput
        value={testType}
        onChangeText={(text) => setTestType(text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Type of Test"
        style={styles.TextInput}
      />
      <DmzButton
        onPress={() => {
          onUpload();
          onCancel();
        }}
        disabled={disable}
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
