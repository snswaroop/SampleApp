import React, {useState,useEffect} from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator,StyleSheet, FlatList, Modal,
    Alert} from 'react-native';
import { useSelector, connect, useDispatch } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';


const RemoveSchedule = ({ navigation }) => {

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('Select');
    const [selectedValue, setSelectedValue] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSubjectId, setSubjectId] = useState('');
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [listRefresh, setListRefresh] = useState(false);

    const dispatch = useDispatch();
    const scheduleDetails = useSelector(state => state.scheduleReducer)
    const commonState = useSelector(state => state.commonReducer)


    const deleteSchedule = (subjectId) => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'DELETE_SCHEDULE',  id: subjectId  })
    }

 
    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SCHEDULE_BY_ADMIN' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SCHEDULE_BY_ADMIN' })
    }, [commonState.successMessage])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SCHEDULE_BY_ADMIN' })
    }, [scheduleDetails.isResponseSuccess])


    const onItemClick = (subjectId) => {
        setSubjectId(subjectId.subjectId+'')
        setTopic(subjectId.title)
        setDescription(subjectId.description)
        // setModalVisible(!modalVisible)

        Alert.alert(
            "Mobile Learning App",
            "Are you sure want to delete tasks for Subject: "+subjectId.title+"?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => deleteSchedule(subjectId.subjectId+'') }
            ]
          );

    }

    const updateTask = (navigation) => {
        setModalVisible(!modalVisible)
        addUpdateScheduleInfo()
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => onItemClick(item)}>
                <View style={{flexDirection:'column', marginStart:10, flex:1, marginBottom:10}}>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight:'bold' }}>Title :     </Text>
                        <Text style={{ color: '#222222', fontSize: 16 }}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight:'bold' }}>Description :     </Text>
                        <Text style={{ color: '#222222', fontSize: 16 }}>{item.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{flex: 1}}>

             <View style={{ flex: 1 }}>
                {/* <ScrollView style={{position: 'relative'}}> */}
                    <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15, marginBottom:30 }}>
                        <View style={{ justifyContent: 'center', alignContent:'center', alignItems:'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18, color: '#8c8c8c' }}>Click on Subject to delete tasks</Text>
                        </View>
                    
                        <View>
                            <FlatList
                                style={{marginTop:20, marginBottom:10}}
                                data={scheduleDetails.scheduleListsBySubject}
                                // ItemSeparatorComponent={ItemDivider}
                                renderItem={renderItem}
                                keyExtractor={item => item.subjectId}
                                extraData={scheduleDetails.scheduleListsBySubject}
                            />

                        </View>

                    </View>
                {/* </ScrollView> */}
            </View>

             {
                commonState.isLoading && <View style={{ backgroundColor: '#88888888', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ backgroundColor: '#FFFFFF', width: '70%', height: 150, justifyContent: 'center', borderRadius: 10, alignItems: 'center', marginBottom: 150 }}>
                        <ActivityIndicator size="large" color="#039be6" />
                        <Text style={{ marginTop: 15, color: '#222222' }}>Loading...</Text>
                    </View>
                </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 15,
        alignItems: 'flex-end',
        marginTop: 0,
        marginBottom: 0,
    },
    placeholderStyle: {
        fontSize: 14,
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'black',
        fontWeight:'500',
        justifyContent: 'center',
        alignContent:'center', 
        alignItems:'center',
        alignSelf:'center',
        textAlign:'center'
      },
      iconStyle: {
        width: 20,
        height: 20,
        color:'black'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 14,
      },
      dropdown: {
        height: 30,
        // width:110,
        // marginEnd:10,
        // borderColor: 'black',
        // backgroundColor:'white',
        // borderWidth: 1,
        // paddingHorizontal: 8,
      },
      item: {
        // backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 4,
        // marginHorizontal: 10,
        flexDirection:'row',
        backgroundColor: '#FFFFFF'
      },
      title: {
        fontSize: 32,
      },
      buttonBlue: {
        backgroundColor:'#2377bf',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        alignSelf:'center',
        width: '100%',
        // paddingTop: 10,
        height:40,
        // paddingBottom: 10,
    }, 
    verticalSpacing: {
        marginTop: 8,
        marginBottom: 8,
    },
    textWhite: {
        color: '#FFFFFF',
        fontSize: 18,
        // fontWeight:'bold',
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // marginStart: 10,
        // marginEnd: 10,
        // backgroundColor: '#FFFFFFCC',
        // opacity:50
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        // borderRadius: 20,
        marginLeft:20,
        marginRight:20,
        // padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width:'100%',
        marginStart: 20,
        marginEnd: 20
      }
})

export default RemoveSchedule