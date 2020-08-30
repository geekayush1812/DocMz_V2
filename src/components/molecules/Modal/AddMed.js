import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
  GREY_OUTLINE,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInputMask} from 'react-native-masked-text';
import NewToggleButton from '../ToggleButton/NewToggleButton';
import Feather from 'react-native-vector-icons/Feather';

const AddMed = ({visible, onCancel, onUpdate}) => {
  const [details, setDetails] = useState({
    name: '',
    category: '',
    amount: '',
    description: '',
    time: [
      {
        value: '',
        amPm: 'AM',
      },
    ],
  });

  return (
    <BlurModal
      {...{visible}}
      onCancel={() => {
        setDetails({
          name: '',
          category: '',
          amount: '',
          date: '',
          time: [
            {
              value: '',
              amPm: 'AM',
            },
          ],
        });
        onCancel();
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        Add Pills
      </Text>
      <TextInput
        value={details.name}
        onChangeText={(text) => setDetails({...details, name: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Name of the pill"
        style={styles.text}
      />

      <TextInput
        value={details.category}
        onChangeText={(text) => setDetails({...details, category: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Add Category"
        style={styles.text}
      />

      <TextInput
        value={details.amount}
        onChangeText={(text) => setDetails({...details, amount: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Amount to be taken"
        style={styles.text}
        keyboardType="number-pad"
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
          value={details.description}
          onChangeText={(text) => setDetails({...details, description: text})}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="Course Description"
          style={[
            styles.text,
            {borderBottomWidth: 0, flex: 1, marginBottom: 0},
          ]}
        />
      </View>

      <Text style={[styles.text, {borderBottomWidth: 0, marginBottom: 0}]}>
        Time
      </Text>

      {details.time.map((time, i) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            value={time.value}
            onChangeText={(text) => {
              let temp = details.time;
              temp[i].value = text;
              setDetails({...details, time: temp});
            }}
            style={{
              padding: 5,
              borderRadius: 30,
              borderColor: GREY_OUTLINE,
              borderWidth: 1,
              width: 80,
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              paddingHorizontal: 10,
              textAlign: 'center',
              height: 35,
            }}
          />
          <NewToggleButton
            text0="AM"
            text1="PM"
            style={{width: 80, marginLeft: 20, elevation: 0, height: 35}}
            toggle={time.amPm === 'AM'}
            onToggle={() => {
              let temp = details.time;
              temp[i].amPm = temp[i].amPm === 'AM' ? 'PM' : 'AM';
              setDetails({...details, time: temp});
            }}
          />
        </View>
      ))}

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => {
            let temp = details.time;
            if (temp[temp.length - 1].value.length !== 5) return;
            temp.push({value: '', amPm: 'AM'});
            setDetails({...details, time: temp});
          }}>
          <View
            style={{
              height: 35,
              width: 80,
              borderWidth: 1,
              borderColor: GREY_OUTLINE,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather name="plus" size={20} color={INPUT_PLACEHOLDER} />
          </View>
        </TouchableOpacity>
        <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        />
      </View>

      <DmzButton
        onPress={() => {
          onUpdate(details);
          onCancel();
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

export default AddMed;

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
