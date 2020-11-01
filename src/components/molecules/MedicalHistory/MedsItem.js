import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  GREY_BACKGROUND,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MedsItem = ({data}) => {
  const [medicineActive, setMedicineActive] = useState(false);
  return data.map((item) => {
    const {_id, name, quantity, description} = item;
    return (
      <View
        key={_id}
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          borderRadius: 13,
          marginVertical: 10,
          elevation: 2,
          flexDirection: 'row',
          paddingVertical: 15,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
              paddingVertical: 4,
            }}>
            {name}
          </Text>

          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 11,
              paddingVertical: 4,
            }}>
            {quantity} pills/ day
          </Text>

          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 11,
              paddingVertical: 4,
            }}>
            {/* {`${data.completedDays} / ${data.totalDays} days (${
                data.totalDays / 7
              } weeks)`} */}
            {description}
          </Text>
        </View>

        <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <TouchableWithoutFeedback
            onPress={() => setMedicineActive(!medicineActive)}>
            <MaterialIcons
              name={medicineActive ? 'timer' : 'timer-off'}
              color={medicineActive ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER}
              size={25}
            />
          </TouchableWithoutFeedback>

          <TouchableOpacity>
            <Image
              source={require('../../../assets/icons/back.png')}
              style={{
                height: 17,
                width: 17,
                transform: [{rotateZ: '180deg'}],
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });
};

export default MedsItem;
