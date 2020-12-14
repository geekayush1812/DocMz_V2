import React from 'react';
import {View, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const BlurModal = ({onCancel, children, visible}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <BlurView
            blurRadius={7}
            downsampleFactor={1}
            overlayColor={'rgba(0, 0, 0, .25)'}
            blurAmount={1}
            style={StyleSheet.absoluteFill}
            blurType="light"
          />
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 35,
                borderRadius: 30,
                alignSelf: 'center',
                margin: 50,
                justifyContent: 'center',
                alignItems: 'center',
                //   borderWidth: 1,
              }}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default BlurModal;
