import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {GREY_BACKGROUND} from '../../../styles/colors';
import MedsItem from '../../../components/molecules/MedicalHistory/MedsItem';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddMed from '../../../components/molecules/Modal/AddMed';
import {useSelector, useDispatch} from 'react-redux';
import {GetMedicine, AddMedicine} from '../../../reduxV2/action/PatientAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
const Meds = () => {
  const [modalVisible, setVisible] = useState(false);
  const {medicines, gettingMedicine, addMedicineLoading, patient} = useSelector(
    (state) => state.PatientReducer,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMedicine(patient.meta._id));
  }, []);
  const onUpdate = (medicineData) => {
    const {name, amount, description} = medicineData;
    const obj = {
      metaId: patient.meta._id,
      medicines: {
        name,
        description,
        quantity: amount,
      },
    };
    dispatch(AddMedicine(obj));
  };
  return (
    <>
      <AddMed
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        onUpdate={onUpdate}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        {/* {Object.keys(dummyData).map((disease) => (
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
                marginBottom: 10,
              }}>
              {disease}
            </Text> */}

        {gettingMedicine ? (
          <ListingWithThumbnailLoader />
        ) : medicines.length === 0 ? (
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
        ) : (
          medicines?.map((item) => {
            if (!item) return null;
            return <MedsItem key={item._id} data={item.medicines} />;
          })
        )}
        {/* </View>
        ))} */}
        <NewItem onPress={() => setVisible(true)} />
      </ScrollView>
    </>
  );
};

export default Meds;
