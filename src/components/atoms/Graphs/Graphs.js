import React from 'react';
import {LineChart, YAxis, Grid, XAxis} from 'react-native-svg-charts';
import {View} from 'react-native';
import {G, Line} from 'react-native-svg';
import {TERTIARY_TEXT, PRIMARY_COLOR} from '../../../styles/colors';

export default function Graph({data, hasAxis = true}) {
  const dataval = [50, 10, 40, 95, -4, -24, 35, 53, -53, 24, 50, -20, -80];
  console.log(data, 'graph data');
  const contentInset = {top: 20, bottom: 20};
  return (
    <View style={{height: 120, flexDirection: 'row', width: '90%'}}>
      {hasAxis ? (
        <YAxis
          data={data[0].data != undefined ? [50, 200] : data}
          contentInset={contentInset}
          style={{marginLeft: 10}}
          svg={{
            fill: TERTIARY_TEXT,
            fontSize: 10,
          }}
          numberOfTicks={10}
        />
      ) : null}

      <LineChart
        style={{
          flex: 1,
          paddingHorizontal: 10,
          zIndex: 1,
          width: 150,
          marginLeft: hasAxis ? 0 : 20,
        }}
        data={data ? data : dataval}
        svg={{stroke: PRIMARY_COLOR, strokeWidth: 3}}
        contentInset={contentInset}>
        {/* <CustomGrid belowChart={true} /> */}
        <Grid svg={{fill: TERTIARY_TEXT}} />
      </LineChart>
    </View>
  );
}
