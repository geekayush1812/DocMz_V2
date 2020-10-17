import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  SECONDARY_BACKGROUND,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  GREY_OUTLINE,
  GREY_CARD,
  NEW_PRIMARY_LIGHT_BG,
} from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CallModal from '../../../components/molecules/Modal/CallModal';

let scrollViewRef = null;
const {width} = Dimensions.get('window');

const WaitingRoom = ({navigation}) => {
  const userLocation = 1;
  const [queuePos, setQueuePos] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    scrollViewRef
      ? scrollViewRef.scrollTo({x: queuePos * 54, animated: true})
      : null;
  }, [queuePos]);

  useEffect(() => {
    setTimeout(() => {
      setQueuePos(1);
    }, 1000);
  }, []);

  return (
    <View style={styles.mianContainer}>
      <CallModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onVoiceCall={() => {
          navigation.navigate('VoiceCall', {});
        }}
        onVideoCall={() => {}}
      />
      <TopNavBar
        headerText="WaitingRoom"
        style={{Container: {marginTop: 5, marginBottom: 10}}}
        navigation={navigation}
      />

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <View style={[styles.tabContainer, {borderRightWidth: 1}]}>
          <Text style={styles.activeTabText}>Queue</Text>
        </View>

        <View
          style={[
            styles.tabContainer,
            {borderLeftWidth: 1, borderRightWidth: 1},
          ]}>
          <Text style={styles.inactiveTabText}>Chat</Text>
        </View>

        <View style={[styles.tabContainer, {borderLeftWidth: 1}]}>
          <Text style={styles.inactiveTabText}>More</Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            // height: 250,
            width: '100%',
            backgroundColor: NEW_PRIMARY_LIGHT_BG,
            alignItems: 'center',
            padding: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
              color: NEW_HEADER_TEXT,
            }}>
            Medanta - The Medicity
          </Text>
          <View
            style={{
              height: 4,
              width: 70,
              backgroundColor: NEW_PRIMARY_COLOR,
              margin: 30,
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: NEW_HEADER_TEXT,
              textAlign: 'center',
            }}>
            {queuePos === userLocation
              ? 'Dr. Co Ekatarine is ready for you!\nStart Call now.'
              : 'Dr. Co Ekatarine will be seeing\nyou soon!'}
          </Text>
        </View>

        <View
          style={{
            borderColor: GREY_OUTLINE,
            borderBottomWidth: 1,
          }}>
          <ScrollView
            horizontal
            style={{marginHorizontal: 20}}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            snapToInterval={54}
            ref={(ref) => {
              scrollViewRef = ref;
            }}>
            {Array.from(Array(userLocation + 1).keys()).map((i) => (
              <View
                style={{
                  marginHorizontal: 2,
                  height: 75,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    queuePos === i ? SECONDARY_BACKGROUND : 'white',
                }}>
                <FontAwesome5
                  name="user-alt"
                  size={40}
                  color={
                    queuePos === i
                      ? SECONDARY_COLOR
                      : userLocation === i
                      ? NEW_PRIMARY_BACKGROUND
                      : INPUT_PLACEHOLDER
                  }
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 9,
                    color: NEW_HEADER_TEXT,
                    lineHeight: 10,
                    marginTop: 4,
                  }}>
                  {userLocation === i ? 'You' : queuePos === i ? 'Ongoing' : ''}
                </Text>
              </View>
            ))}
            <View style={{width}} />
          </ScrollView>
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              fontSize: 59,
              color:
                queuePos === userLocation ? INPUT_PLACEHOLDER : NEW_HEADER_TEXT,
            }}>
            {'00:00'}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              color: INPUT_PLACEHOLDER,
              marginBottom: 35,
            }}>
            Approx. time left for your appointment
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            disabled={!(queuePos === userLocation)}
            style={{
              height: 40,
              width: 250,
              borderRadius: 40,
              marginBottom: 10,
              backgroundColor:
                queuePos === userLocation ? SECONDARY_COLOR : '#e8e8e8',
              alignItems: 'center',
              justifyContent: 'center',
              elevation: queuePos === userLocation ? 2 : 0,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              START APPOINTMENT
            </Text>
          </TouchableOpacity>
          {queuePos === userLocation ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              You have 01:29 left to start your appointment
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default WaitingRoom;

const styles = StyleSheet.create({
  mianContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  tabContainer: {
    flex: 1,
    marginVertical: 15,
    alignItems: 'center',
    borderColor: NEW_PRIMARY_COLOR,
    paddingVertical: 3,
  },
  inactiveTabText: {
    fontFamily: 'Montserrat-Regular',
    color: INPUT_PLACEHOLDER,
    fontSize: 18,
  },
  activeTabText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: NEW_HEADER_TEXT,
  },
});
