import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {GetQuestion} from '../../../reduxV2/action/QuestionnaireAction';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import RadioGroup from '../../../components/molecules/RadioGroup/RadioGroup';
import RadioBtn from '../../../components/atoms/RadioBtn/RadioBtn';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadialGradient from 'react-native-radial-gradient';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRef} from 'react';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ConfirmAppointmentModel from '../../../components/molecules/Modal/ConfirmAppointmentModel';
function QuestionnairePP({navigation, route}) {
  const {
    gettingQuestionnaire,
    questions,
    errorGettingQuestionnaire,
  } = useSelector((state) => state.QuestionnaireReducer);

  const {doctorData, appointmentBookingData} = route.params;
  const {_id} = doctorData;
  const dispatch = useDispatch();
  const [localQuestion, setLocalQuestion] = useState([]);
  const [questionCurrentId, setQuestionCurrentId] = useState('');
  const [showConfirmModel, setShowConfirmModel] = useState(false);
  useEffect(() => {
    !gettingQuestionnaire && dispatch(GetQuestion(_id));
  }, []);
  const onFinish = () => {
    setShowConfirmModel(true);
  };
  const onYesConfirmModel = () => {
    setShowConfirmModel(false);
    navigation.navigate('Payments', {appointmentBookingData});
  };

  return (
    <>
      <ConfirmAppointmentModel
        visible={showConfirmModel}
        onNo={() => {
          setShowConfirmModel(false);
        }}
        onYes={onYesConfirmModel}
      />
      <TopNavBar navigation={navigation} headerText={'Questionnaire'} />
      <View
        style={{
          height: 150,
          width: '100%',
          flexDirection: 'row',
          paddingRight: '10%',
          justifyContent: 'space-between',
          paddingTop: 25,
        }}>
        <View style={{width: '45%'}}>
          <DmzButton
            onPress={() => {
              navigation.navigate('NewPayment', {appointmentBookingData});
            }}
            style={{
              Container: {
                marginTop: 25,
                elevation: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                backgroundColor: '#d6d6d6',
                paddingHorizontal: '12%',
                width: '90%',
              },
              Text: {
                color: '#4f4f4f',
              },
            }}
            text={'SKIP QUESTIONS'}
          />
        </View>
      </View>
      {gettingQuestionnaire && (
        <ActivityIndicator size={40} color={'#047b7b'} />
      )}
      {questions.length !== 0 && (
        <QuestionController questions={questions} onFinish={onFinish} />
      )}
    </>
  );
}

export default QuestionnairePP;

const QuestionController = ({
  questions,
  nested,
  nextQuestionParent,
  onFinish,
}) => {
  const [count, setCount] = useState(0);
  const [root, setRoot] = useState(true);
  const ScrollRef = useRef(null);
  useEffect(() => {
    const root = questions.every((item) => item.root);
    setRoot(root);
  }, [questions, count]);
  const nextQuestion = () => {
    if (count < questions.length - 1) {
      // const root = questions.every((item) => item.root);
      setCount(count + 1);
    }
    if (count === questions.length - 1 && nested) {
      nextQuestionParent();
      setCount(count + 1);
    }
    if (count === questions.length - 1 && !nested) {
      onFinish();
    }
  };
  // const onContinue = () => {
  //   if (count < questions.length - 1) {
  //     setCount(count + 1);
  //   }
  //   if (count === questions.length - 1) {
  //     alert('answers submited');
  //   }
  // };

  return (
    <>
      <ScrollView
        ref={ScrollRef}
        onContentSizeChange={() => {
          ScrollRef.current.scrollToEnd({animated: true});
        }}>
        <QuestionViewer
          question={questions[count]}
          nextQuestion={nextQuestion}
        />
      </ScrollView>
      <View style={{marginBottom: '8%'}}>
        {root && (
          <TouchableOpacity
            style={{
              backgroundColor: '#919191',
              elevation: 0,
              alignSelf: 'center',
              borderRadius: 15,
              alignSelf: 'flex-end',
              marginRight: '10%',
              paddingVertical: '3%',
              paddingHorizontal: '6%',
            }}
            onPress={nextQuestion}>
            <Text
              style={{
                color: '#f8f7ff',
                fontSize: 16,
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        )}
        {root && (
          <StepsTracker
            incompletedColor={'#fff'}
            completedColor={'#9C77BC'}
            text={`Question ${count + 1} of ${questions.length}`}
            completed={((count + 1) / questions.length) * 100}
            textStyle={{fontSize: 20, fontWeight: 'bold', color: '#9C77BC'}}
            mode={[20, 40, 60, 80, 100]}
          />
        )}
      </View>
    </>
  );
};
const QuestionViewer = ({question, nextQuestion}) => {
  const [currentOptionId, setCurrentOptionId] = useState('');
  const [filteredLinkedQuestion, setFilteredLinkedQuestion] = useState([]);

  useEffect(() => {
    setFilteredLinkedQuestion([]);
    ///deal with state,,
    //state is getting persist that's why the previous question is remains on there
  }, []);
  const onSetCurrentOptionId = (id) => {
    console.log(id);
    setCurrentOptionId(id);
    const OptionQues = question.option.find((item) => item._id === id);
    console.log(OptionQues.linkedQuestion);
    setFilteredLinkedQuestion(OptionQues.linkedQuestion);
    if (OptionQues.linkedQuestion.length === 0) {
      nextQuestion();
    }
  };

  // console.log('&&&&&&&&&@@@@@@@@@@&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@7');
  // console.log(filteredLinkedQuestion);
  const customViewStyle = [
    {
      width: question && question.root ? '80%' : '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  ];
  const customTitleStyle = [
    {
      fontSize: question && question.root ? 38 : 20,
      lineHeight: question && question.root ? 40 : 22,
      fontWeight: 'bold',
      color: '#047b7b',
      marginTop: question && question.root ? 0 : 10,
    },
  ];

  return (
    <View style={customViewStyle}>
      <Text style={customTitleStyle}>{question ? question.title : ''}</Text>
      <RadioGroup
        Item={
          question &&
          question.option.map((item) => {
            if (item.optionType === 'radio')
              return {
                id: item._id,
                value: item.text,
              };
          })
        }
        setActiveKey={onSetCurrentOptionId}
        activeKey={currentOptionId}
      />
      {question &&
        question.option.map((item) => {
          if (item.optionType === 'text')
            return <AnimInput placeholder={item.text} />;
        })}
      {filteredLinkedQuestion.length ? (
        <QuestionController
          questions={filteredLinkedQuestion}
          nested
          nextQuestionParent={nextQuestion}
        />
      ) : null}
      {/* {(() => {
        if (filteredLinkedQuestion.length)
          return <QuestionController questions={filteredLinkedQuestion} />;
        else return null;
      })()} */}
    </View>
  );
};
