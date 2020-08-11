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

const ThreeField = ({headingText, labelText, onCancel, visible, onUpdate}) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [date, setDate] = useState('');

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
        }}>
        {headingText}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 25,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Text style={styles.smallText}>{labelText[0]}</Text>
          <TextInput
            style={styles.inputText}
            value={field1}
            onChangeText={(text) => setField1(text)}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.smallText}>{labelText[1]}</Text>
          <TextInput
            style={styles.inputText}
            value={field2}
            onChangeText={(text) => setField2(text)}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <Text style={styles.smallText}>Date</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <TextInput
          value={date}
          onChangeText={(text) => setDate(text)}
          style={[
            styles.inputText,
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
          onUpdate(field1, field2, date);
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

export default ThreeField;

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
