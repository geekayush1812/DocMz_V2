import React, {useState} from 'react';
import {Text, View, FlatList, PermissionsAndroid} from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import ReportsItem from '../../../components/molecules/MedicalHistory/ReportsItem';
import AddReport from '../../../components/molecules/Modal/AddReport';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {UploadRecords} from '../../../redux/action/patientAccountAction';
const dummyData = [
  {
    name: 'Blood Test',
    details: 'Iron, Feritin',
    date: 'Uploaded on 12 May 2020',
  },
  {
    name: 'Urine Test',
    details: 'Complete Urine Routine',
    date: 'Uploaded on 12 May 2020',
  },
  {
    name: 'Ultrasound Scan',
    details: 'Upper Abdomen',
    date: 'Uploaded on 12 May 2020',
  },
];

const Reports = ({params}) => {
  const [modalVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const [document, setDocument] = useState('');
  const [description, setDescription] = useState('');
  const {patient} = useSelector((state) => state.PatientAccountReducer);
  const uploadFile = () => {
    const data = {
      file: file,
      document: document,
      description: description,
      id: patient._id,
    };
    dispatch(UploadRecords(data));
    // console.log(data);
  };

  const PickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user cancled');
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      <AddReport
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        onUpload={uploadFile}
        selectFile={PickFile}
        document={document}
        description={description}
        setDocument={setDocument}
        setDescription={setDescription}
      />
      <FlatList
        style={{padding: 20}}
        data={dummyData}
        ListFooterComponent={<NewItem onPress={() => setVisible(true)} />}
        renderItem={({item}) => <ReportsItem data={item} />}
      />
    </>
  );
};

export default Reports;
