import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

/**
 *
 * @param {source of the image} param0
 * @param { type of the avater} param1
 * 0 = small
 * 1 = medium
 * 2 = big
 */

const Avater = ({
  src = require('../../../assets/jpg/person1.jpg'),
  type = 0,
  style,
}) => {
  const size = [25, 30, 35, 45, 55, 65, 70];
  return (
    <View>
      <Image
        source={src}
        style={[
          styles.container,
          {width: size[type], height: size[type]},
          style ? style : null,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Avater;
