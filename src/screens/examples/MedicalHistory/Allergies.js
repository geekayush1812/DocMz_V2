import React, {useState} from 'react';
import {FlatList} from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AllergiesItem from '../../../components/molecules/MedicalHistory/AllergiesItem';
import AddAllergies from '../../../components/molecules/Modal/AddAllergies';
const dummyData = [
  {
    name: 'Shrimp',
    reaction: 'Severe',
    severity: 'not sure',
  },
];

function Allergies() {
  const [modalVisible, setVisible] = useState(false);
  return (
    <>
      <AddAllergies
        visible={modalVisible}
        onCancel={() => {
          setVisible(false);
        }}
        onUpdate={(temp) => {}}
      />
      <FlatList
        style={{padding: 20}}
        data={dummyData}
        ListFooterComponent={<NewItem onPress={() => setVisible(true)} />}
        renderItem={({item}) => <AllergiesItem data={item} />}
      />
    </>
  );
}

export default Allergies;
