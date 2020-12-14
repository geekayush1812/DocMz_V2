import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  GREY_OUTLINE,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import {Image} from 'react-native';
import RatingStarts from '../../atoms/ratingStars/RatingStarts';

const ReviewItem = ({name, rating, review, date}) => (
  <View
    style={{
      borderBottomWidth: 1,
      borderColor: GREY_OUTLINE,
      padding: 10,
      marginVertical: 5,
    }}>
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../../assets/jpg/person3.jpg')}
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            margin: 5,
            marginRight: 15,
          }}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
              marginBottom: 5,
            }}>
            {name}
          </Text>
          <RatingStarts
            rating={rating}
            activeColor={NEW_PRIMARY_COLOR}
            passiveColor={INPUT_PLACEHOLDER}
            size={18}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
            color: NEW_HEADER_TEXT,
            alignSelf: 'flex-start',
            marginTop: 10,
          }}>
          {date}
        </Text>
      </View>
    </View>
    <Text
      style={{
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        margin: 7,
        lineHeight: 14,
      }}>
      {review}
    </Text>
  </View>
);

export default ReviewItem;
