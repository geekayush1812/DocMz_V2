import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {SECONDARY_COLOR} from '../../../styles/colors';
import {Picker} from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSpecialty,
  UpdateDoctorProfile,
} from '../../../redux/action/doctor/myDoctorAction';
import {Host} from '../../../utils/connection';

function Onboarding({navigation}) {
  const [activeGender, setActiveGender] = useState('');
  const [city, setCity] = useState('');
  const [specialitySelected, setSpecialitySelected] = useState('');
  const [year, setYearSelected] = useState('');
  const [registrationCouncil, setRegistrationCouncil] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [degree, setDegree] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [college, setCollege] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [clinicAndHospital, setClinicAndHospital] = useState('');

  const dispatch = useDispatch();
  const {data, isLogedin, isDoctor} = useSelector((state) => state.AuthReducer);
  const {specialtyLoading, specialty} = useSelector(
    (state) => state.MyDoctorReducer,
  );
  if (data.Onboarding) {
    navigation.navigate('Dashboard');
  }
  useEffect(() => {
    !specialtyLoading && dispatch(getSpecialty());
  }, []);

  let imageSource = '';
  if (data && isLogedin && !isDoctor) {
    imageSource = {
      uri: `${Host}${data.picture.replace('public', '').replace('\\\\', '/')}`,
    };
  } else if (data && isLogedin && isDoctor && data.picture.length > 0) {
    imageSource = {
      uri: `${Host}${data.picture[0]
        .replace('public', '')
        .replace('\\\\', '/')}`,
    };
  } else {
    imageSource = require('../../../assets/images/dummy_profile.png');
  }

  const handleSubmit = () => {
    const obj = {
      id: data._id,
      gender: activeGender,
      education: [
        {
          degree: degree,
          university: college,
          year: year,
        },
      ],
      registration: {
        regNo: registrationNumber,
        regCouncil: registrationCouncil,
        regYear: registrationYear,
      },
      experience: yearOfExperience,
    };
    dispatch(
      UpdateDoctorProfile(obj, () => {
        navigation.navigate('Dashboard');
      }),
    );
  };

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
              source={imageSource}></Image>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              letterSpacing: 1.2,
              marginTop: '4%',
            }}>
            Dr.{data.basic.name}
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
              activeKey={activeGender}
              setActiveKey={setActiveGender}
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
              <Picker.Item label="Bangalore" value="bangalore" />
              <Picker.Item label="Pune" value="pune" />
            </Picker>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
            }}>
            <Picker
              selectedValue={specialitySelected}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setSpecialitySelected(itemValue)
              }>
              <Picker.Item label="Speciality" value="" />
              {specialty.map((item) => {
                return <Picker.Item label={item} value={item} />;
              })}
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
              selectedValue={degree}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) => setDegree(itemValue)}>
              <Picker.Item label="Degree" value="" />
              <Picker.Item label="MBBS" value="MBBS" />
              <Picker.Item label="MS" value="MS" />
            </Picker>
          </View>
          <View
            style={{
              paddingHorizontal: '7%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <TextInput
              onChangeText={(text) => {
                setCollege(text);
              }}
              value={college}
              style={{fontSize: 16}}
              placeholder="College/University"></TextInput>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
            }}>
            <Picker
              selectedValue={year}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setYearSelected(itemValue)
              }>
              <Picker.Item label="Year" value="" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2016" value="2016" />
              <Picker.Item label="2015" value="2015" />
              <Picker.Item label="2014" value="2014" />
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
            <TextInput
              onChangeText={(text) => {
                setRegistrationNumber(text);
              }}
              value={registrationNumber}
              style={{fontSize: 16, marginLeft: '2%'}}
              placeholder="Registration Number"></TextInput>
          </View>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={registrationCouncil}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setRegistrationCouncil(itemValue)
              }>
              <Picker.Item label="Registration Council" value="" />
              <Picker.Item label="Council XYZ1" value="CouncilXYZ1" />
              <Picker.Item label="Council XYZ2" value="CouncilXYZ2" />
            </Picker>
          </View>

          <View
            style={{
              paddingHorizontal: '6%',
            }}>
            <Picker
              selectedValue={registrationYear}
              style={{width: '100%', color: '#8e9393'}}
              onValueChange={(itemValue, itemIndex) =>
                setRegistrationYear(itemValue)
              }>
              <Picker.Item label="Registration Year" value="" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2016" value="2016" />
              <Picker.Item label="2015" value="2015" />
              <Picker.Item label="2014" value="2014" />
              <Picker.Item label="2013" value="2013" />
              <Picker.Item label="2012" value="2012" />
              <Picker.Item label="2011" value="2011" />
              <Picker.Item label="2010" value="2010" />
              <Picker.Item label="2009" value="2009" />
              <Picker.Item label="2008" value="2008" />
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
              paddingLeft: '5%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <Picker
              selectedValue={yearOfExperience}
              style={{width: '100%', color: '#8e9393', fontWeight: '100'}}
              onValueChange={(itemValue, itemIndex) =>
                setYearOfExperience(itemValue)
              }>
              <Picker.Item label="Year of Experience" value="" />
              <Picker.Item label="0 year" value="0" />
              <Picker.Item label="1 year" value="1" />
              <Picker.Item label="2 year" value="2" />
              <Picker.Item label="3 year" value="3" />
              <Picker.Item label="4 year" value="4" />
              <Picker.Item label="5 year" value="5" />
              <Picker.Item label="6 year" value="6" />
              <Picker.Item label="7 year" value="7" />
              <Picker.Item label="8 year" value="8" />
            </Picker>
          </View>
          <View
            style={{
              paddingHorizontal: '7%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              onChangeText={(text) => {
                setClinicAndHospital(text);
              }}
              value={clinicAndHospital}
              style={{fontSize: 16}}
              placeholder="Add Clinic/Hospital"></TextInput>
            <TouchableOpacity>
              <Text style={{fontSize: 18, color: '#8e9393'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DmzButton
          onPress={handleSubmit}
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
