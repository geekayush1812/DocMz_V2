import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {Picker} from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
function Onboarding() {
  const [memberCredential, setMemberCredential] = useState({
    id: '',
    name: '',
    contact: '',
    date: '',
  });
  const [activeKey, setActiveKey] = useState('');
  const [city, setCity] = useState('');
  const [speciality, setSpeciality] = useState('');

  return (
    <View style={OnboardingStyle.Container}>
      <ScrollView style={OnboardingStyle.ScrollView}>
        <View
          style={{
            width: '90%',
            paddingVertical: 30,
            paddingTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
            }}>
            Welcome to
            <Text style={{color: '#37acac', fontWeight: 'bold'}}> DocEz</Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              letterSpacing: 0.8,
            }}>
            Finish your profile to get started
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            paddingVertical: 10,
            paddingBottom: 5,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 100,
                borderColor: '#dddddd',
                borderWidth: 2,
              }}
              source={require('../../../assets/jpg/person1.jpg')}></Image>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              letterSpacing: 1.2,
              marginTop: '4%',
            }}>
            Dr.Co Ekaterain
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#fcfcfc',
            marginTop: 20,
          }}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: '8%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <RadioGroupV2
              horizontal
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              Item={[
                {value: 'Male', id: 'male'},
                {value: 'Female', id: 'female'},
              ]}></RadioGroupV2>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={city}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              <Picker.Item label="Select City" value="" />
              <Picker.Item label="Bangalore" value="bang" />
              <Picker.Item label="Pune" value="pune" />
            </Picker>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
            }}>
            <Picker
              selectedValue={speciality}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setSpeciality(itemValue)
              }>
              <Picker.Item label="Speciality" value="" />
              <Picker.Item label="Dentist" value="dentist" />
              <Picker.Item label="Cardiologist" value="cardio" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            marginTop: 30,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Education Qualifications
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#fcfcfc',
          }}>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={city}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              <Picker.Item label="Degree" value="" />
              <Picker.Item label="Bangalore" value="bang" />
              <Picker.Item label="Pune" value="pune" />
            </Picker>
          </View>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: '8%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Text style={{color: '#8e9393'}}>College/University</Text>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
            }}>
            <Picker
              selectedValue={speciality}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setSpeciality(itemValue)
              }>
              <Picker.Item label="Year" value="" />
              <Picker.Item label="Dentist" value="dentist" />
              <Picker.Item label="Cardiologist" value="cardio" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            marginTop: 30,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Registration Details
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#fcfcfc',
          }}>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={city}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              <Picker.Item label="Registration Number" value="" />
              <Picker.Item label="Bangalore" value="bang" />
              <Picker.Item label="Pune" value="pune" />
            </Picker>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={speciality}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setSpeciality(itemValue)
              }>
              <Picker.Item label="Registration Council" value="" />
              <Picker.Item label="Dentist" value="dentist" />
              <Picker.Item label="Cardiologist" value="cardio" />
            </Picker>
          </View>

          <View
            style={{
              paddingHorizontal: '6%',
            }}>
            <Picker
              selectedValue={speciality}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setSpeciality(itemValue)
              }>
              <Picker.Item label="Registration Year" value="" />
              <Picker.Item label="Dentist" value="dentist" />
              <Picker.Item label="Cardiologist" value="cardio" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            marginTop: 30,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Payment & Schedule
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#fcfcfc',
          }}>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput placeholder="Add Payment"></TextInput>
            <TouchableOpacity>
              <Text style={{fontSize: 18, color: '#8e9393'}}>+</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput placeholder="Add Schedule"></TextInput>
            <TouchableOpacity>
              <Text style={{fontSize: 18, color: '#8e9393'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            marginTop: 30,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Practice</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#fcfcfc',
          }}>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={speciality}
              style={{width: '100%', color: '#8e9393', fontWeight: '100'}}
              onValueChange={(itemValue, itemIndex) =>
                setSpeciality(itemValue)
              }>
              <Picker.Item label="Registration Council" value="" />
              <Picker.Item label="Dentist" value="dentist" />
              <Picker.Item label="Cardiologist" value="cardio" />
            </Picker>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput placeholder="Add Clinic/Hospital"></TextInput>
            <TouchableOpacity>
              <Text style={{fontSize: 18, color: '#8e9393'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DmzButton
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginVertical: 20,
              elevation: 3,
            },
          }}
          text="SUBMIT"
        />
      </ScrollView>
    </View>
  );
}

const OnboardingStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
});

export default Onboarding;
