import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AllergiesItem from '../../../components/molecules/MedicalHistory/AllergiesItem';
import AddAllergies from '../../../components/molecules/Modal/AddAllergies';
import LottieView from 'lottie-react-native';
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
        ListEmptyComponent={
          <View
            style={{
              height: 200,
              width: '70%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              style={{height: '100%', width: '100%'}}
              source={require('../../../assets/anim_svg/empty_bottle.json')}
              autoPlay
              loop
            />
          </View>
        }
        ListFooterComponent={<NewItem onPress={() => setVisible(true)} />}
        renderItem={({item}) => <AllergiesItem data={item} />}
      />
    </>
  );
}

export default Allergies;
