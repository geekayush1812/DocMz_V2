import React, {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import ReportsItem from '../../../components/molecules/MedicalHistory/ReportsItem';
import AddReport from '../../../components/molecules/Modal/AddReport';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {UploadRecords, GetRecords} from '../../../reduxV2/action/PatientAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
const Reports = ({params}) => {
  const [modalVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState('');
  const [fileName, setFileName] = useState('');
  const {patient, records, gettingRecords, errorGettingRecords} = useSelector(
    (state) => state.PatientReducer,
  );
  const uploadFile = () => {
    const data = {
      testName: testName,
      test_type: testType,
    };
    const _data = {
      files: file,
      data: data,
      id: patient.meta._id,
    };
    dispatch(UploadRecords(_data));
    console.log('uploading');
  };

  const PickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(res);
      setFileName(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user cancled');
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    dispatch(GetRecords(patient.meta._id));
  }, []);

  return (
    <>
      <AddReport
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        onUpload={uploadFile}
        selectFile={PickFile}
        testName={testName}
        testType={testType}
        setTestName={setTestName}
        setTestType={setTestType}
        fileName={fileName}
        disable={testName === '' || testType === ''}
      />
      {gettingRecords ? (
        <ListingWithThumbnailLoader />
      ) : (
        <FlatList
          style={{padding: 20}}
          data={records}
          keyExtractor={(item) => JSON.stringify(item)}
          ListFooterComponent={<NewItem onPress={() => setVisible(true)} />}
          renderItem={({item}) => <ReportsItem data={item} />}
        />
      )}
    </>
  );
};

export default Reports;
