import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import RadioGroupVertical from '../../../components/molecules/RadioGroup/RadioGroupVertical';
import {Picker} from '@react-native-community/picker';

function PaymentSetup({navigation}) {
  const [paymentOption, setPaymentOption] = useState('PAC');
  const [paymentMethod, setPaymentMethod] = useState('CFA');
  const [accountType, setAccountType] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [amountForSlots, setAmountForSlots] = useState([
    {
      id: String(Date.now()),
      duration: '15',
      amount: '',
    },
  ]);
  const AddTimeSlotsForAmount = () => {
    const slot = {
      id: String(Date.now()),
      duration: '15',
      amount: '',
    };

    setAmountForSlots([...amountForSlots, slot]);
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar headerText={'Payment'} navigation={navigation} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: '8%',
          marginTop: '5%',
        }}>
        Select Payment Option
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          backgroundColor: '#fcfcfc',
          marginTop: 20,
        }}>
        <RadioGroupVertical
          activeKey={paymentOption}
          setActiveKey={setPaymentOption}
          Item={[
            {value: 'Payment after consultation', id: 'PAC'},
            {value: 'Payment before consultation', id: 'PBC'},
            {value: 'Donate time ', id: 'DT'},
          ]}
        />
      </View>
      {paymentOption === 'PAC' || paymentOption === 'PBC' ? (
        <>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: '8%',
              marginTop: '5%',
            }}>
            Select Payment Method
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
              marginTop: 20,
              paddingVertical: '5%',
              // paddingHorizontal: '5%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                elevation: 5,
                borderRadius: 15,
                paddingHorizontal: '3%',
                paddingVertical: '2%',
                marginHorizontal: '5%',
              }}>
              <Picker
                selectedValue={paymentMethod}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentMethod(itemValue)
                }>
                <Picker.Item label="Charge Fixed Amount" value="CFA" />
                <Picker.Item label="Charge Based on Time" value="CBOT" />
              </Picker>
            </View>
            {paymentMethod === 'CFA' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '7%',
                    marginHorizontal: '5%',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 15,
                      backgroundColor: '#efa860',
                      marginRight: '5%',
                      marginLeft: '-2%',
                    }}></View>
                  <Text style={{fontSize: 16}}>Regular Clinic Hours</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    elevation: 5,
                    borderRadius: 15,
                    paddingHorizontal: '5%',
                    paddingVertical: '2%',
                    marginHorizontal: '5%',
                  }}>
                  <TextInput
                    placeholderTextColor={'#8e9393'}
                    style={{fontSize: 16}}
                    placeholder={'Enter Amount (₹)'}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '7%',
                    marginHorizontal: '5%',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 15,
                      backgroundColor: '#efa860',
                      marginRight: '5%',
                      marginLeft: '-2%',
                    }}></View>
                  <Text style={{fontSize: 16}}>Weekends & Holidays</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    elevation: 5,
                    borderRadius: 15,
                    paddingHorizontal: '5%',
                    paddingVertical: '2%',
                    marginHorizontal: '5%',
                  }}>
                  <TextInput
                    placeholderTextColor={'#8e9393'}
                    style={{fontSize: 16}}
                    placeholder={'Enter Amount (₹)'}
                  />
                </View>
              </>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: '10%',
                    marginVertical: '8%',
                  }}>
                  Select Time Slot & Amount
                </Text>
                {amountForSlots.map((item) => {
                  return (
                    <TimeSlotAndAmount
                      key={item.id}
                      item={item}
                      amountForSlots={amountForSlots}
                      setAmountForSlots={setAmountForSlots}
                    />
                  );
                })}

                <TouchableOpacity onPress={AddTimeSlotsForAmount}>
                  <Text
                    style={{
                      color: '#a09e9e',
                      alignSelf: 'flex-end',
                      marginRight: '5%',
                      borderBottomColor: '#a09e9e',
                      paddingHorizontal: '1%',
                      borderBottomWidth: 2,
                    }}>
                    Add Time Slot
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : null}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: '8%',
          marginTop: '5%',
        }}>
        Add Bank Details
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          backgroundColor: '#fcfcfc',
          marginTop: 20,
          paddingVertical: '5%',
          paddingHorizontal: '5%',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            borderRadius: 15,
            paddingHorizontal: '3%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <Picker
            selectedValue={accountType}
            style={{width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}>
            <Picker.Item color={'#a09e9e'} label="Account Type" value="" />
            <Picker.Item label="Saving Account" value="SA" />
            <Picker.Item label="Current Account" value="CA" />
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            borderRadius: 15,
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <TextInput
            placeholderTextColor={'#8e9393'}
            style={{fontSize: 16}}
            placeholder={'Account Name'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            borderRadius: 15,
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <TextInput
            placeholderTextColor={'#8e9393'}
            style={{fontSize: 16}}
            placeholder={'Account Number'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            borderRadius: 15,
            paddingHorizontal: '3%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <Picker
            selectedValue={bankName}
            style={{width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setBankName(itemValue)}>
            <Picker.Item color={'#a09e9e'} label="Bank Name" value="" />
            <Picker.Item label="State bank of India" value="SBI" />
            <Picker.Item label="AXIS Bank" value="AXIS" />
            <Picker.Item label="ICICI Bank" value="ICICI" />
            <Picker.Item label="Punjab National Bank" value="PNB" />
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            borderRadius: 15,
            paddingHorizontal: '3%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <Picker
            selectedValue={branchName}
            style={{width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setBranchName(itemValue)}>
            <Picker.Item color={'#a09e9e'} label="Branch" value="" />
            <Picker.Item label="Main Branch" value="MB" />
            <Picker.Item label="Sub Branch" value="SB" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: '60%',
          height: 50,
          backgroundColor: '#efa860',
          alignSelf: 'center',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '8%',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fcf0e4'}}>
          SAVE
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default PaymentSetup;

const TimeSlotAndAmount = ({item, amountForSlots, setAmountForSlots}) => {
  const setDuration = (duration) => {
    const slots = amountForSlots.filter((i) => i.id != item.id);
    const slot = {
      id: item.id,
      duration,
      amount: item.amount,
    };
    setAmountForSlots([...slots, slot]);
  };
  const setAmount = (amount) => {
    const slots = amountForSlots.filter((i) => i.id != item.id);
    const slot = {
      id: item.id,
      duration: item.duration,
      amount,
    };
    setAmountForSlots([...slots, slot]);
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: '5%',
        }}>
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 15,
            backgroundColor: '#efa860',
            marginHorizontal: '3%',
          }}></View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 15,
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            flex: 1,
          }}>
          <Picker
            selectedValue={item.duration}
            style={{width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}>
            <Picker.Item color={'#8e9393'} label="Duration" value="" />
            <Picker.Item label="15 minutes" value="15" />
            <Picker.Item label="30 minutes" value="30" />
            <Picker.Item label="45 minutes" value="45" />
          </Picker>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 5,
          borderRadius: 15,
          paddingHorizontal: '5%',
          paddingVertical: '2%',
          marginVertical: '5%',
          marginRight: '5%',
          marginLeft: '8%',
          flex: 1,
        }}>
        <TextInput
          onChangeText={(text) => {
            setAmount(text);
          }}
          placeholderTextColor={'#8e9393'}
          style={{fontSize: 16}}
          placeholder={'Enter Amount (₹)'}
        />
      </View>
    </>
  );
};
