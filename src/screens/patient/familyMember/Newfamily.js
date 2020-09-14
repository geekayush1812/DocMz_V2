import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, ActivityIndicator, Alert} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {GREY_BACKGROUND} from '../../../styles/colors';
import FamilyItem from '../../../components/molecules/Family/FamilyItem';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddFamily from '../../../components/molecules/Modal/AddFamily';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {
  GetFamilyMember,
  AddFamilyMember,
} from '../../../redux/action/patientAccountAction';

const NewFamily = ({navigation}) => {
  const [addModal, setModal] = useState(false);
  const {familyMember, isPatientAccountReducerLoading, patient} = useSelector(
    (state) => state.PatientAccountReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    !isPatientAccountReducerLoading &&
      dispatch(GetFamilyMember(patient.meta._id));
  }, []);

  const onSubmit = (data) => {
    const reg = new RegExp(
      // /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
    );
    const reg2 = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    );
    const {
      firstName,
      lastName,
      email,
      contact: phone,
      gender,
      birthDay: birthdate,
      relation: relationship,
    } = data;
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      phone !== '' &&
      gender !== '' &&
      birthdate !== '' &&
      relationship !== '' &&
      phone.length == 10
    ) {
      const {
        firstName,
        lastName,
        email,
        contact: phone,
        gender,
        birthDay: birthdate,
        relation: relationship,
      } = data;
      dispatch(
        AddFamilyMember(
          {
            firstName,
            lastName,
            email,
            phone,
            gender,
            birthdate,
            relationship,
            metaId: patient.meta._id,
          },
          () => {
            dispatch(GetFamilyMember(patient.meta._id));
          },
        ),
      );
    } else {
      firstName == '' &&
      lastName == '' &&
      email == '' &&
      phone == '' &&
      gender == '' &&
      birthdate == '' &&
      relationship == ''
        ? Alert.alert('One or more fields empty')
        : phone.length != 10
        ? Alert.alert('Incorrect Phone No.')
        : null;
    }
    setModal(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavBar
        headerText="My Family"
        {...{navigation}}
        style={{Container: {marginTop: 5, marginBottom: 10}}}
      />
      <AddFamily
        visible={addModal}
        onCancel={() => setModal(false)}
        onUpdate={onSubmit}
      />
      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        {familyMember === null ? (
          <Text>No member found</Text>
        ) : isPatientAccountReducerLoading ? (
          <ActivityIndicator
            size={25}
            color={'#000'}
            style={{alignSelf: 'center', width: '100%'}}
          />
        ) : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={familyMember}
            style={{flex: 1, padding: 20}}
            renderItem={({item}) => <FamilyItem data={item} />}
            ListFooterComponent={<NewItem onPress={() => setModal(true)} />}
          />
        )}
      </View>
    </View>
  );
};

export default NewFamily;
