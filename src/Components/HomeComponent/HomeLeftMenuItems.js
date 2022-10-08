import React, {useState} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const HomeLeftMenuItems = (item, props, handleListItemClick, handleInnerItemClick) => {
    return <View key={item.id} style={{ width: '100%', backgroundColor: '#EEEEEE', paddingBottom: 1 }}>
    <TouchableOpacity style={{ backgroundColor: 'white', width: '100%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }} onPress={() => { handleListItemClick(item, props) }}>
      <Text style={{ fontSize: 16, color: '#222222' }}>{item.categoryName}</Text>
    </TouchableOpacity>
    {item.subCategory.map((item1) => {
     return <View key={item1.id} style={{ width: '100%', backgroundColor: '#EEEEEE', paddingBottom: 1, }}>
        <TouchableOpacity style={{ backgroundColor: 'white', width: '100%', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }} onPress={() => { handleInnerItemClick(item1, props) }}>
          <Text style={{ fontSize: 16, color: '#000000',marginStart:25, }}>{item1.name}</Text>
        </TouchableOpacity>
      </View> 
    })}
  </View>
}

export default HomeLeftMenuItems;
