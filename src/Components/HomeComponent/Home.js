import React, {useEffect, useState} from "react";
import {
  StyleSheet, Text, View, TouchableOpacity, Button, FlatList,
  SafeAreaView, ActivityIndicator, Image, useWindowDimensions
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../LoginComponent/Login";
import HomeMain from "./HomeMain";
// import {ExpandableListView} from 'react-native-expandable-listview';
import {configureCall} from '../../Utils/QBConfigureCall';
import HomeSubCategory from "./HomeSubCategory";
import {useSelector} from 'react-redux'


const Home = ({ navigation }) => {

  const user = useSelector(state => state.loginReducer.user)

  const Drawer = createDrawerNavigator();
  const [selectedId, setSelectedId] = useState(0)



  useEffect(() => {
    configureCall();
  })


  const CONTENT = [
    {
      id: '42',
      categoryName: 'Home',
      subCategory: [],
    },
    {
      id: '95',
      categoryName: 'My Info',
      subCategory: [],
    },
    {
      id: '94',
      categoryName: 'Admin',
      subCategory: [],
    },
    {
      id: '93',
      categoryName: 'Instructor',
      subCategory: [],
    },
    {
      id: '92',
      categoryName: 'Student',
      subCategory: [],
    },
    {
      id: '96',
      categoryName: 'Subject',
      subCategory: [],
    },
    {
      id: '97',
      categoryName: 'Enrollment',
      subCategory: [{ id: '971', name: 'Enroll' }, { id: '972', name: 'Display' }, { id: '973', name: 'Drop' }],
    },
    {
      id: '98',
      categoryName: 'Schedule',
      subCategory: [{ id: '981', name: 'In-process' }, { id: '982', name: 'Add Schedule' },{ id: '983', name: 'Display Schedule' },
      { id: '984', name: 'Edit Schedule' },{ id: '985', name: 'Remove Schedule' },],
    },

    {
      id: '99',
      categoryName: 'Grade',
      subCategory: [],
    },

    {
      id: '102',
      categoryName: 'Messages',
      subCategory: [],
    },
    {
      id: '101',
      categoryName: 'Logout',
      subCategory: [],
    }
  ];

  const [menuItems, setMenuItems] = useState(CONTENT)

  useEffect(() => {
      if (user.userType === 'instructor') {
        setMenuItems(CONTENT.filter(item => {
          // console.log(item)
          return item.id !== '94' && item.id !== '93' && item.id !== '96' && item.id !== '97'
        }))
      }
  }, [user])


  const handleListItemClick = (item, props) => {
    
    if (item.id !== '97' && item.id !== '98') {
      setSelectedId(0)
      props.navigation.closeDrawer();
    }

    switch (item.id) {
      case '95':
        navigation.navigate('My Info')
        break;

      case '94':
        navigation.navigate('admin-list')
        break;

      case '93':
        navigation.navigate('instructor');
        break;

      case '92':
        if (user.userType === 'instructor') {
          console.log("Instructors .....")
        }else {
          navigation.navigate('student-list');
        }
        
        break;
      
      case '96':
        navigation.navigate('subject-list');
        break;

      case '97':
        setSelectedId(item.id)
        // navigation.navigate('enroll-student');
        break;

      case '98':
        setSelectedId(item.id)
        break;

      case '99':
        navigation.navigate('grade-list');
        break;
        
    }
  }

  const handleInnerItemClick = (item, props) => {
    setSelectedId(0)
    props.navigation.closeDrawer();

    switch (item.id) {
      case '971':
        navigation.navigate('enroll-student');
        break;

      case '972':
        navigation.navigate('display-enroll-student')
        break;

      case '973':
        navigation.navigate('drop-enroll-student')
        break;

      case '981':
        navigation.navigate('inprocess-schedule-list')
        break;

      case '982':
        navigation.navigate('add-schedule')
        break;

      case '983':
        navigation.navigate('display-schedule-list')
        break;

      case '984':
        navigation.navigate('edit-schedule-list')
        break;

      case '985':
        navigation.navigate('remove-schedule-list')
        break;
    }

  };

  return (
    <Drawer.Navigator useLegacyImplementation={true}
      // screenOptions={{headerShown: false}}
      screenOptions={{ itemStyle: { marginVertical: 5 }, }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeMain" component={HomeMain} options={{
        title: 'Home',
        headerStyle: {
          backgroundColor: '#039be6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'normal',
        },
      }} />

    </Drawer.Navigator>
  )


  function CustomDrawerContent(props) {
    const width = useWindowDimensions().width * 0.3;

    function handleItemClick({ index }) {
      console.log(CONTENT[index].categoryName);
    };



    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ }}>
        <View style={styles.container}>

          {
            menuItems.map((item) => {
              return <View key={item.id} style={{ width: '100%', backgroundColor: '#EEEEEE', paddingBottom: 1 }}>
                <TouchableOpacity style={ selectedId === item.id ? { backgroundColor: '#039be622', width: '100%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 } : { backgroundColor: 'white', width: '100%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }} onPress={() => { handleListItemClick(item, props) }}>
                  <Text style={{ fontSize: 16, color: '#222222' }}>{item.categoryName}</Text>
                </TouchableOpacity>
                {
                  selectedId === item.id ? (item.subCategory.map((item1) => {
                    return <HomeSubCategory key={item1.id} item1={item1} props={props} handleInnerItemClick={handleInnerItemClick} />
                   })) : null
                }
                
              </View>
            })
          }
          {/* <FlatList
                data={CONTENT} 
                keyExtractor={(item) => item.id }
                renderItem={({item}) => {
                  return <View style={{width: '100%', backgroundColor: 'red', height: 100}}></View>
                }}/> */}
        </View>
      </DrawerContentScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
});

export default Home;