import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const HomeSubCategory = ({item1, props, handleInnerItemClick}) => {


    return <View key={item1.id} style={{ width: '100%', backgroundColor: '#EEEEEE', paddingBottom: 1, }}>
    <TouchableOpacity style={{ backgroundColor: 'white', width: '100%', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }} onPress={() => { handleInnerItemClick(item1, props) }}>
      <Text style={{ fontSize: 16, color: '#000000',marginStart:25, }}>{item1.name}</Text>
    </TouchableOpacity>
  </View> 
}

export default HomeSubCategory;