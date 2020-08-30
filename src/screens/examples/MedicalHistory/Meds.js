import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {GREY_BACKGROUND} from '../../../styles/colors';
import MedsItem from '../../../components/molecules/MedicalHistory/MedsItem';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddMed from '../../../components/molecules/Modal/AddMed';
import {useSelector, useDispatch} from 'react-redux';
import {
  GetMedicine,
  AddMedicine,
} from '../../../redux/action/patientAccountAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
const dummyData = {
  Diabetes: [
    {
      name: 'Galvus Met 50/500 mg',
      frequency: 2,
      completedDays: 16,
      totalDays: 56,
      alert: true,
    },
    {
      name: 'Janumet 50/1 gm Tablet',
      frequency: 2,
      completedDays: 16,
      totalDays: 56,
      alert: false,
    },
  ],
  Migrane: [
    {
      name: 'Esess 42',
      frequency: 1,
      completedDays: 6,
      totalDays: 14,
      alert: false,
    },
  ],
};

const Meds = () => {
  const [modalVisible, setVisible] = useState(false);
  const {medicines, gettingMedicine, addMedicineLoading} = useSelector(
    (state) => state.PatientAccountReducer,
  );
  const {data} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMedicine(data.meta));
  }, []);
  const onUpdate = (medicineData) => {
    const {name, amount, description} = medicineData;
    const obj = {
      metaId: data.meta,
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
        ) : (
          medicines.map((item) => (
            <MedsItem key={item._id} data={item.medicines} />
          ))
        )}
        {/* </View>
        ))} */}
        <NewItem onPress={() => setVisible(true)} />
      </ScrollView>
    </>
  );
};

export default Meds;
