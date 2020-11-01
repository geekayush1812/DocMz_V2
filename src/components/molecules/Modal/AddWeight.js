import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddWeight = ({headingText, labelText, onCancel, visible, onUpdate}) => {
  const [weight, setWeight] = useState('');
  const [fatMass, setFatMass] = useState('');
  const [date, setDate] = useState('');

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
        }}>
        Add Weight
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 25,
        }}>
        <View style={{flex: 1, marginRight: '2%'}}>
          <Text style={styles.smallText}>Weight (kg)</Text>
          <TextInput
            style={styles.inputText}
            value={weight}
            onChangeText={(text) => setWeight(text)}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.smallText}>Fat Mass (kg)</Text>
          <TextInput
            style={styles.inputText}
            value={fatMass}
            onChangeText={(text) => setFatMass(text)}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <DmzButton
        disabled={weight === ''}
        onPress={() => {
          onUpdate(weight, fatMass, date);
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
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddWeight;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: INPUT_PLACEHOLDER,
    alignSelf: 'flex-start',
  },
  inputText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    padding: 4,
    borderColor: NEW_PRIMARY_BACKGROUND,
    borderBottomWidth: 1.5,
  },
});
