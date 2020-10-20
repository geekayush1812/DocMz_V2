import React, {useState, useEffect, useRef} from 'react';
import {View, ActivityIndicator, Text, StatusBar} from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import DmzButton from '../../../components/atoms/SwitchButton/SwitchButton';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddQuestion,
  GetQuestion,
  UpdateQuestion,
  DeleteRootQuestion,
} from '../../../reduxV2/action/QuestionnaireAction';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ExpandableListOld from '../../../components/molecules/ExpandableList/ExpandableListOld';
import Overlay from '../../../components/atoms/Overlay/Overlay';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import ViewPager from '@react-native-community/viewpager';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddQuestionnaire({navigation}) {
  const pagerRef = useRef();
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  const [options, setOptions] = useState([]);
  const [Question, setQuestion] = useState({
    title: '',
    superQuestion: 'false',
    option: [],
    specialty: '',
    category: '',
    root: 'true',
    id: '',
  });
  const [showAddLinkedPopup, setShowAddLinkedPopup] = useState(false);
  const [parentId, setParentId] = useState('');
  const [optionId, setOptionId] = useState('');
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.AuthReducer);
  const {
    gettingQuestionnaire,
    questions,
    isLoading,
    questionDetails,
  } = useSelector((state) => state.QuestionnaireReducer);

  useEffect(() => {
    !gettingQuestionnaire && dispatch(GetQuestion(userData.id));
  }, []);

  //could be used when API return data of added question till then dispatch an action when submit
  // useEffect(() => {
  //   !isLoading && setQuestion(questionDetails);
  // }, [questionDetails]);

  const addOption = () => {
    const schema = {
      _id: new Date().getTime().toString(),
      optionType: '',
      text: '',
      linkedQuestion: [],
    };
    setOptions([...options, schema]);
  };
  const removeOption = (_id) => {
    let removed = [];
    removed = options.filter((item) => item._id !== _id);
    setOptions(removed);
  };
  const handleTitleInput = (text) => {
    setQuestion({...Question, title: text});
  };
  const handleSpecialityInput = (text) => {
    setQuestion({...Question, specialty: text});
  };
  const handleCategoryInput = (text) => {
    setQuestion({...Question, category: text});
  };
  const onClickQuestion = (question) => {
    const {option} = question;
    setQuestion(question);
    console.log('#########################################');
    console.log(question);
    setOptions(option);
  };
  const onSubmit = () => {
    let optionTemp = options.map((item) => {
      return {
        optionType: item.optionType,
        text: item.text,
      };
    });
    let Fques = {
      ...Question,
      option: JSON.stringify(optionTemp),
      id: userData.id,
    };
    dispatch(AddQuestion(Fques));
    dispatch(GetQuestion(userData.id));
    // console.log(Fques);
  };
  const onUpdateQuestion = () => {
    let optionTemp = options.map((item) => {
      return {
        optionType: item.optionType,
        text: item.text,
        linkedQuestion: item.linkedQuestion,
      };
    });
    const {_id, category, specialty, superQuestion, root, title} = Question;
    console.log(options);
    let Fques = {
      category,
      specialty,
      superQuestion,
      root,
      title,
      option: JSON.stringify(optionTemp),
      id: _id,
    };
    dispatch(UpdateQuestion(Fques));
    dispatch(GetQuestion(userData.id));
  };
  const onDeleteQuestion = () => {
    const {root, _id} = Question;
    if (root) {
      const question = {
        docId: userData.id,
        questionId: _id,
      };
      dispatch(DeleteRootQuestion(question));
      dispatch(GetQuestion(userData.id));
    }
  };
  const onPressReset = () => {
    setQuestion({
      ...Question,
      title: '',
      superQuestion: 'false',
      option: [],
      specialty: '',
      category: '',
      root: 'false',
      id: '',
    });
    setOptions([]);
  };
  const onPressLinkedOption = (optionId) => {
    setParentId(Question._id);
    setOptionId(optionId);
  };
  const openLinkedPopup = () => {
    setShowAddLinkedPopup(true);
  };
  const closeLinkedPopup = () => {
    setShowAddLinkedPopup(false);
  };
  return (
    <>
      <StatusBar
        animated
        barStyle={'dark-content'}
        backgroundColor={'rgba(255,255,255,0.4)'}
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopNavBar navigation={navigation} headerText={'Questionnaire'} />
        {/* <ViewPager
        ref={pagerRef}
        style={{flex: 1}}
        initialPage={1}
        scrollEnabled={false}>
        <View key="0"></View>
        <View key="1"></View>
      </ViewPager> */}
        <ScrollView
          contentContainerStyle={{paddingVertical: 40}}
          style={{marginTop: 10, paddingHorizontal: 25}}>
          <View>
            {gettingQuestionnaire ? (
              <ActivityIndicator />
            ) : questions.length ? (
              questions.map((item) => {
                const linked = item.option.reduce((acc, curr) => {
                  acc.push(...curr.linkedQuestion);
                  return acc;
                }, []);
                return (
                  <ExpandableListOld
                    key={item._id}
                    name={item.title.slice(0, 20).concat('...')}
                    nestedList={linked}
                    onPressList={() => {
                      onClickQuestion(item);
                    }}
                    onClickQuestion={onClickQuestion}
                    option={item.option}
                  />
                );
              })
            ) : (
              <Text>empty questions</Text>
            )}
          </View>
          <AddQuestionTemplate
            Question={Question}
            handles={{
              handleTitleInput,
              handleCategoryInput,
              handleSpecialityInput,
              onPressReset,
            }}
            optionProp={{options, setOptions, removeOption, addOption}}
            onSubmit={onSubmit}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingHorizontal: '2%',
            }}>
            <DmzButton
              text="Update"
              onPress={onUpdateQuestion}
              style={{
                Container: {
                  marginTop: 10,
                  // borderRadius: 5,
                  // backgroundColor: '#efa860',
                  // alignSelf: 'center',
                  borderColor: '#efa860',
                  borderWidth: 0.7,
                  borderRadius: 5,
                },
                Text: {
                  color: '#efa860',
                },
              }}
            />
            <DmzButton
              text="Delete"
              onPress={onDeleteQuestion}
              style={{
                Container: {
                  marginTop: 10,
                  // borderRadius: 5,
                  // backgroundColor: '#b50039',
                  // alignSelf: 'center',
                  borderColor: '#b50039',
                  borderWidth: 0.7,
                  borderRadius: 5,
                },
                Text: {
                  color: '#b50039',
                },
              }}
            />
          </View>
          {Question.option.length !== 0 && (
            <AddLinkedOption
              options={Question.option}
              onPressLinkedOption={onPressLinkedOption}
              openLinkedPopup={openLinkedPopup}
            />
          )}
        </ScrollView>
        {showAddLinkedPopup && (
          <LinkedController
            parentId={parentId}
            optionId={optionId}
            closeLinkedPopup={closeLinkedPopup}
          />
        )}
      </View>
    </>
  );
}

export default AddQuestionnaire;

const AddQuestionTemplate = ({
  Question,
  handles: {
    handleCategoryInput,
    handleTitleInput,
    handleSpecialityInput,
    onPressReset,
  },
  optionProp: {options, setOptions, removeOption, addOption},
  questionHeader,
  onSubmit,
}) => {
  const {title, specialty, category} = Question;
  return (
    <>
      <DmzText text={questionHeader || 'Question'} type={4} />
      <AnimInput
        value={title}
        placeholder="Title"
        style={{Container: {marginTop: 10}}}
        inputHandler={handleTitleInput}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          width: '100%',
        }}>
        <AnimInput
          placeholder="Speciality"
          style={{Container: {width: '40%'}}}
          inputHandler={handleSpecialityInput}
          value={specialty}
        />
        <AnimInput
          placeholder="Category"
          style={{Container: {width: '40%'}}}
          inputHandler={handleCategoryInput}
          value={category}
        />
      </View>

      {options.map((item) => (
        <Option
          key={item._id}
          item={item}
          options={options}
          setOptions={setOptions}
          onPressRemove={removeOption}
        />
      ))}

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          onPress={addOption}
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1.5,
            paddingHorizontal: '1%',
          }}>
          <Text style={{color: '#a09e9e'}}>Add Option</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          alignSelf: 'center',
          marginTop: 25,
        }}>
        <DmzButton
          onPress={onSubmit}
          text="Add"
          style={{
            Container: {backgroundColor: '#047b7b', borderRadius: 5},
            Text: {
              color: '#fff',
            },
          }}
        />
        <DmzButton
          text="Reset"
          onPress={onPressReset}
          style={{
            Container: {
              borderColor: '#999',
              borderWidth: 0.7,
              borderRadius: 5,
            },
          }}
        />
      </View>
    </>
  );
};

const Option = ({item, onPressRemove, options, setOptions}) => {
  const handleInput = (text) => {
    let optionTemp = options.filter((i) => i._id !== item._id);
    optionTemp = [
      ...optionTemp,
      {
        _id: item._id,
        optionType: item.optionType,
        text: text,
        linkedQuestion: [],
      },
    ];
    setOptions(optionTemp);
  };
  const onPressRemoveButton = () => {
    onPressRemove(item._id);
  };
  const setInputTypeGlobal = (value) => {
    let optionTemp = options.filter((i) => i._id !== item._id);
    optionTemp = [
      ...optionTemp,
      {
        _id: item._id,
        optionType: value,
        text: item.text,
        linkedQuestion: [],
      },
    ];
    setOptions(optionTemp);
  };
  useEffect(() => {
    setInputTypeGlobal('radio');
  }, []);
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        overflow: 'hidden',
      }}>
      <Picker
        mode="dropdown"
        style={{width: '40%', height: 25}}
        selectedValue={item.optionType}
        onValueChange={(itemValue, itemIndex) => setInputTypeGlobal(itemValue)}>
        <Picker.Item label="Radio" value="radio" />
        <Picker.Item label="Text" value="text" />
      </Picker>
      <AnimInput
        inputHandler={handleInput}
        withAnim={false}
        value={item.text}
        placeholder="option"
        style={{
          Container: {borderBottomWidth: 0, width: '40%'},
        }}
      />

      <TouchableOpacity
        onPress={onPressRemoveButton}
        style={{
          backgroundColor: '#dbdbdb',
          paddingHorizontal: '4%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <MaterialIcon name={'delete'} size={24} color={'#494a49'} />
      </TouchableOpacity>
    </View>
  );
};

const LinkedController = ({parentId, optionId, closeLinkedPopup}) => {
  const [options, setOptions] = useState([]);
  const [Question, setQuestion] = useState({
    title: '',
    superQuestion: 'false',
    option: [],
    specialty: '',
    category: '',
    root: 'false',
    id: '',
    parent: '',
    optionId: '',
  });
  const {userData} = useSelector((state) => state.AuthReducer);
  const addOption = () => {
    const schema = {
      _id: new Date().getTime().toString(),
      optionType: '',
      text: '',
      linkedQuestion: [],
    };
    setOptions([...options, schema]);
  };
  const dispatch = useDispatch();
  const removeOption = (_id) => {
    let removed = [];
    removed = options.filter((item) => item._id !== _id);
    setOptions(removed);
  };
  const handleTitleInput = (text) => {
    setQuestion({...Question, title: text});
  };
  const handleSpecialityInput = (text) => {
    setQuestion({...Question, specialty: text});
  };
  const handleCategoryInput = (text) => {
    setQuestion({...Question, category: text});
  };
  const onPressReset = () => {
    setQuestion({
      title: '',
      superQuestion: 'false',
      option: [],
      specialty: '',
      category: '',
      optionText: '',
      root: 'false',
      id: '',
    });
    setOptions([]);
  };
  const onSubmit = () => {
    let optionTemp = options.map((item) => {
      return {
        optionType: item.optionType,
        text: item.text,
      };
    });
    let Fques = {
      ...Question,
      option: JSON.stringify(optionTemp),
      id: userData.id,
      parent: parentId,
      optionId: optionId,
    };
    dispatch(AddQuestion(Fques));
    dispatch(GetQuestion(userData.id));
  };
  return (
    <Overlay
      onPress={closeLinkedPopup}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <BasicCard
        style={{
          CardContainer: {height: '80%', width: '90%', marginRight: null},
        }}>
        <AddQuestionTemplate
          questionHeader="Link a Question"
          Question={Question}
          handles={{
            handleTitleInput,
            handleCategoryInput,
            handleSpecialityInput,
            onPressReset,
          }}
          optionProp={{options, setOptions, removeOption, addOption}}
          onSubmit={onSubmit}
        />
        <DmzButton
          style={{
            Container: {
              marginTop: 5,
              borderColor: '#b50039',
              borderWidth: 0.7,
              borderRadius: 5,
            },
            Text: {color: '#b50039'},
          }}
          text="close"
          onPress={closeLinkedPopup}
        />
      </BasicCard>
    </Overlay>
  );
};

const AddLinkedOption = ({
  options,
  onPressLinkedOption = () => {},
  openLinkedPopup,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const onPressLinkedOptionLocal = (itemValue, itemIndex) => {
    if (itemValue == '') {
      setSelectedOption(itemValue);
    } else {
      const option = options.find((item) => item.text === itemValue);
      onPressLinkedOption(option._id);
      setSelectedOption(itemValue);
    }
  };
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
        overflow: 'hidden',
      }}>
      <Picker
        mode="dropdown"
        style={{flex: 1, height: 25}}
        selectedValue={selectedOption}
        onValueChange={onPressLinkedOptionLocal}>
        <Picker.Item color={'#ddd'} label={'Option'} value={''} />
        {options.length !== 0 &&
          options.map((item) => {
            return (
              <Picker.Item key={item._id} label={item.text} value={item.text} />
            );
          })}
      </Picker>
      <DmzButton
        disabled={selectedOption == '' ? true : false}
        onPress={openLinkedPopup}
        text="Add Sub Question"
        style={{
          Container: {
            borderRadius: 10,
            backgroundColor: selectedOption == '' ? '#494a49' : '#efa860',
            flex: 1,
            height: '100%',
            marginLeft: 5,
          },
          Text: {color: '#fff'},
        }}
      />
    </View>
  );
};
