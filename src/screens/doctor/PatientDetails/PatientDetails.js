import React, {useRef, useState} from 'react';
import {
  View,
  Animated,
  Text,
  TouchableWithoutFeedback,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {NEW_PRIMARY_COLOR} from '../../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chatbox from '../../../assets/svg/chatbox.svg';
import SignleField from '../../../components/molecules/Modal/SingleField';
import {
  FONT_SIZE_22,
  FONT_SIZE_20,
  FONT_SIZE_19,
  FONT_SIZE_18,
} from '../../../styles/typography';
import ExpandableList from '../../../components/molecules/ExpandableList/ExpandableList';
function PatientDetails({navigation, route}) {
  const {patient} = route.params;
  console.log(patient);
  const HeightExpand = useRef(new Animated.Value(0)).current;
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [addReasonModel, setAddReasonModel] = useState(false);
  const [addReason, setAddReason] = useState('');
  const [showContent, setShowContent] = useState({
    symptoms: false,
    medicalHistory: false,
    assessmentPlan: false,
  });
  const onExpand = (name) => {
    setShowContent({
      ...showContent,
      [`${name}`]: !showContent[`${name}`],
    });
    Animated.timing(HeightExpand, {
      delay: 200,
      easing: Easing.bounce,
      duration: 1000,
      useNativeDriver: false,
      toValue: showContent[`${name}`] ? 0 : 1,
    }).start();
  };
  const onLayout = (e) => {
    setExpandedHeight(e.nativeEvent.layout.height);
  };
  const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon);
  return (
    <>
      <SignleField
        visible={addReasonModel}
        onCancel={() => setAddReasonModel(false)}
        headingText="Add Reason"
        onUpdate={(temp) => {}}
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopNavBar headerText={'Patients Details'}></TopNavBar>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: '4%',
          }}>
          <View
            style={{
              paddingVertical: '5%',
              paddingHorizontal: '6%',
              elevation: 2,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: FONT_SIZE_22,
                  fontWeight: 'bold',
                  letterSpacing: 0.5,
                }}>
                {`${patient.firstName} ${patient.lastName}`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '45%',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: FONT_SIZE_20}}>
                  {patient.age ? patient.age : '-'}yrs
                </Text>
                <View
                  style={{
                    height: 7,
                    width: 7,
                    borderRadius: 15,
                    backgroundColor: '#efa860',
                  }}></View>
                <Text style={{fontSize: FONT_SIZE_20}}>
                  {patient.sex ? patient.sex : '-'}
                </Text>
                <View
                  style={{
                    height: 7,
                    width: 7,
                    borderRadius: 15,
                    backgroundColor: '#efa860',
                  }}></View>
                <Text style={{fontSize: FONT_SIZE_20}}>
                  {patient.weight.value ? patient.weight.value : '-'} kg
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '2%',
              }}>
              <View>
                <Text style={{letterSpacing: 0.4}}>
                  Reason for visit:{' '}
                  <Text style={{color: '#ef786e'}}>Fever</Text>
                </Text>
                <Text style={{color: '#ef786e', marginTop: '2%'}}>
                  First Visit
                </Text>
              </View>
              <Chatbox />
            </View>
          </View>
          <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'Symptoms'}>
            <Text>hello</Text>
          </ExpandableList>
          <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'Medical History'}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Vitals</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#a09e9e'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Medication</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#a09e9e'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Reports</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#a09e9e'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Surgeries</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#a09e9e'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Allergies</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#a09e9e'}
              />
            </View>
          </ExpandableList>
          <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'Assessment & Plan'}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Assessment</Text>
              <MaterialIcon name={'plus'} size={24} color={'#a09e9e'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Add Tests</Text>
              <MaterialIcon name={'plus'} size={24} color={'#a09e9e'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Add Medications</Text>
              <MaterialIcon name={'plus'} size={24} color={'#a09e9e'} />
            </View>
          </ExpandableList>
          <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'test'}>
            <Text>hello</Text>
          </ExpandableList>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5%',
              backgroundColor: '#e6f7f5',
              width: '85%',
              alignSelf: 'center',
              paddingVertical: '3%',
              borderRadius: 15,
              elevation: 3,
            }}
            onPress={() => {
              setAddReasonModel(true);
            }}>
            <MaterialIcon name={'plus'} size={30} color={NEW_PRIMARY_COLOR} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FONT_SIZE_18,
                marginLeft: '2%',
              }}>
              Add Reason
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

export default PatientDetails;

// const ExpandableList = ({children, title}) => {
//   const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon);
//   const HeightExpand = useRef(new Animated.Value(0)).current;
//   const [expandedHeight, setExpandedHeight] = useState(0);
//   const onLayout = (e) => {
//     setExpandedHeight(e.nativeEvent.layout.height);
//   };
//   const [showContent, setShowContent] = useState(false);
//   const onToggleExpand = () => {
//     setShowContent(!showContent);
//     Animated.timing(HeightExpand, {
//       delay: 200,
//       easing: Easing.bounce,
//       duration: 1000,
//       useNativeDriver: false,
//       toValue: showContent ? 0 : 1,
//     }).start();
//   };
//   return (
//     <View
//       style={{
//         backgroundColor: '#fff',
//         elevation: 4,
//         paddingVertical: '5%',
//         paddingHorizontal: '8%',
//         marginBottom: 5,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <Text style={{fontSize: FONT_SIZE_19, fontWeight: 'bold'}}>
//           {title}
//         </Text>
//         <TouchableWithoutFeedback onPress={onToggleExpand}>
//           <AnimatedIcon
//             style={{
//               transform: [
//                 {
//                   rotate: HeightExpand.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: ['0deg', showContent ? '-180deg' : '0deg'],
//                   }),
//                 },
//               ],
//             }}
//             name={'chevron-down'}
//             size={30}
//             color={'#047b7b'}
//           />
//         </TouchableWithoutFeedback>
//       </View>

//       {showContent && (
//         <Animated.View
//           style={{
//             height: HeightExpand.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, expandedHeight],
//             }),
//             marginTop: HeightExpand.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 30],
//             }),
//             overflow: 'hidden',
//           }}>
//           <View
//             onLayout={onLayout}
//             style={{
//               paddingVertical: '5%',
//               borderWidth: 1,
//               borderColor: 'rgba(0,0,0,0.08)',
//             }}>
//             {children}
//           </View>
//         </Animated.View>
//       )}
//     </View>
//   );
// };
