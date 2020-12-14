import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

function SearchBarSolid({
  withIcon,
  icon,
  searchIcon,
  placeholder,
  placeholderTextColor,
  onChangeText,
  onEndEditing,
  style = {},
}) {
  const [searchText, setSearchText] = useState('');
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={[
          {
            backgroundColor: '#fafafa',
            borderRadius: 40,
            paddingHorizontal: 20,
            paddingVertical: 2,
            elevation: 6,
            width: '85%',
            flexDirection: 'row',
            alignItems: 'center',
          },
          style,
        ]}>
        <TextInput
          style={{
            height: 40,
            lineHeight: 14,
            fontSize: 13,
            flex: 1,
            fontFamily: 'Montserrat-Regular',
          }}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : 'black'
          }
          placeholder={
            placeholder ? placeholder : 'Search by conditions, symptoms...'
          }
          onEndEditing={() => onEndEditing(searchText)}
          onChangeText={setSearchText}
          // enablesReturnKeyAutomatically
        />
        {searchIcon ?? null}
      </View>
      {withIcon && icon}
    </View>
  );
}

export default SearchBarSolid;
