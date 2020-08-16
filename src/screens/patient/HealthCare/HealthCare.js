import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {GREY_BACKGROUND} from '../../../styles/colors';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddHealthCare from '../../../components/molecules/Modal/AddHealthCare';
import HealthCareItem from '../../../components/molecules/HealthCareItem/HealthCareItem';

const HealthCare = ({navigation}) => {
  const [addModal, setModal] = useState(false);
  const HealthCareData = [
    {
      name: 'Dr. Dropkin Jared',
      speciality: 'Dentist',
      acceptance: 'Waiting to accept invitation',
    },
    {
      name: 'Dr. Hochang Hwang ',
      speciality: 'Physician',
      canDoMessage: true,
    },
    {
      name: 'Dr. Co Ekatarine',
      speciality: 'Gynaecologist',
      reffered: 'Referred by Dr. Ray',

      canDoMessage: true,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fcfcfc'}}>
      <TopNavBar
        headerText="My Healthcare Team"
        {...{navigation}}
        style={{Container: {marginTop: 5, marginBottom: 10}}}
      />
      <AddHealthCare
        visible={addModal}
        onCancel={() => setModal(false)}
        // onUpdate={onSubmit}
      />
      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={HealthCareData}
          style={{flex: 1, padding: 20}}
          renderItem={({item}) => <HealthCareItem data={item} />}
          ListFooterComponent={<NewItem onPress={() => setModal(true)} />}
        />
      </View>
    </View>
  );
};

export default HealthCare;
