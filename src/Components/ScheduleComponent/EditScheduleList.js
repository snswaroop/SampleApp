import React, {useState,useEffect} from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator,StyleSheet, FlatList, Modal} from 'react-native';
import { useSelector, connect, useDispatch } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';


const EditScheduleList = ({ navigation }) => {

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
    const subjectDetails = useSelector(state => state.subjectReducer)
    const commonState = useSelector(state => state.commonReducer)

    // var user = {}

    // useEffect(() => {
    //     user = {
    //         topic: scheduleDetails.topic,
    //         description: scheduleDetails.description,
    //     }
    // }, [scheduleDetails])

    
    const addUpdateScheduleInfo = () => {
        var payload = {
            Topic: topic,
            Description: description,
        }
        dispatch({type: 'LOADING'})
        dispatch({ type: 'ADD_UPDATE_TASK', data: { id: selectedSubjectId, values: payload } })
    }

    const listAllSchedule = (subjectId) => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_DISPLAY_SCHEDULE',  id: subjectId  })
        setListRefresh(true)
        console.log('refresh')
    }

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [])

    useEffect(() => {
        // setListRefresh(false)
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
        if(subjectDetails.subjectList.length>0){
            setValue(subjectDetails.subjectList[0].title);
            listAllSchedule(subjectDetails.subjectList[0].subjectId)
        }
    }, [subjectDetails.isResponseSuccess])

    // useEffect(() => {
    //     setListRefresh(true)
    //     console.log('refresh1')
    // }, [scheduleDetails.scheduleLists])


    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [commonState.successMessage])

    const onItemClick = (subjectId) => {
        setSubjectId(subjectId.taskId+'')
        setTopic(subjectId.topic)
        setDescription(subjectId.description)
        setModalVisible(!modalVisible)
    }

    const updateTask = (navigation) => {
        setModalVisible(!modalVisible)
        addUpdateScheduleInfo()
    }

    const ItemDivider = () => {
        return (
          <View
            style={{
              height: 0.4,
              width: "100%",
              backgroundColor: "#8c8c8c",
              marginTop:-10
            }}
          />
        );
      }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => onItemClick(item)}>
                <View style={{flexDirection:'column', marginStart:10, flex:1, marginBottom:20}}>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight:'bold' }}>Time :     </Text>
                        <Text style={{ color: '#222222', fontSize: 16 }}>{item.startDateTime.split('T')[0]+','+
                            item.startDateTime.split('T')[1].substring(0, 5)+'-'+
                            item.endDateTime.split('T')[1].substring(0, 5)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight:'bold' }}>Topic :     </Text>
                        <Text style={{ color: '#222222', fontSize: 16 }}>{item.topic}</Text>
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
             <Modal
                    // animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onBlur={true}
                    onTouchCancel={true}
                    onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                    >
                    {/* <TouchableOpacity onPressOut={() => {setModalVisible(!modalVisible)}}> */}
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {/* <Image source={require('./../../assets/correct.png')} style={styles.modalicon} />  */}
                                <Text style={{color:'black',fontWeight:'bold', marginTop:20, fontSize:20, marginStart:10}}>Update Task</Text>
                                <View style={{height:1.5, backgroundColor:'#7298b9', marginStart:10, marginEnd:10, marginTop:3}}></View>

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', marginStart:10 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#6e6e6e' }}>Topic :</Text>
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center', marginEnd:10 }}>
                                        <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={topic} 
                                        editable={true} onChangeText={setTopic} />
                                    </View>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', marginStart:10 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#6e6e6e' }}>Description :</Text>
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center', marginEnd:10 }}>
                                        <TextInput 
                                            style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} 
                                            value={description} editable={true} 
                                            onChangeText={setDescription} 
                                            numberOfLines={3}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => updateTask(navigation)}>
                                    <View style={{backgroundColor:'#2377bf', height:45, marginStart:10, marginBottom:20,alignSelf: 'stretch',
                                            marginTop:20, marginEnd:10, alignItems:'center', justifyContent:'center' }}>
                                        <Text style={[styles.textWhite]}>Save</Text>
                                    </View>
                                </TouchableOpacity>
                            
                            </View>
                        </View>
                    {/* </TouchableOpacity> */}
                
                </Modal>

             <View style={{ flex: 1 }}>
                {/* <ScrollView style={{position: 'relative'}}> */}
                    <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15, marginBottom:30 }}>
                        <View style={{ justifyContent: 'center', alignContent:'center', alignItems:'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18, color: '#8c8c8c' }}>Click on the task to update</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 25,justifyContent: 'center', alignContent:'center', alignItems:'center' }}>
                            <View style={{justifyContent: 'center', }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#000000', }}>Subject Id :</Text>
                            </View>
                            <View style={{justifyContent: 'center', width:150 }}>
                                {/* <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={instructorId} editable={true} onChangeText={(text) => { onTextChange('instructorId', text) }} /> */}
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={subjectDetails.subjectList}
                                    // data={enrollmentDetails.enrollmentList}
                                    // data={data}
                                    // search
                                    // maxHeight={100}
                                    // labelField="value"
                                    // valueField="value"
                                    labelField="title"
                                    valueField="title"
                                    placeholder={!isFocus ? 'Select' : 'Select'}
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue(item.title);
                                        setSelectedValue(item.subjectId+'')
                                        setIsFocus(false);
                                        listAllSchedule(item.subjectId)
                                        // setValue(item.value);
                                        // setSelectedValue(item.id);
                                        // setIsFocus(false);
                                    }}
                                />
                            </View>
                        </View>

                        <View>
                            <FlatList
                                style={{marginTop:20, marginBottom:30}}
                                data={scheduleDetails.scheduleLists}
                                ItemSeparatorComponent={ItemDivider}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                extraData={scheduleDetails.scheduleLists}
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
        marginHorizontal: 10,
        flexDirection:'row'
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

export default EditScheduleList