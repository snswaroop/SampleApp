import React, {useState,useEffect} from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator,StyleSheet, FlatList, } from 'react-native';
import { useSelector, connect, useDispatch } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import Audiocall from '../../Assests/call.png'
import Videocall from '../../Assests/videocall.png'


const InProcessSchedule = ({ navigation }) => {

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('Select');
    const [selectedValue, setSelectedValue] = useState('')
    const [isListEmpty, setListEmpty] = useState(false)

    const dispatch = useDispatch();
    const scheduleDetails = useSelector(state => state.scheduleReducer)
    const subjectDetails = useSelector(state => state.subjectReducer)
    const commonState = useSelector(state => state.commonReducer)

    const getInProcessScheduleList = (subjectId) => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_INPROCESS_SCHEDULE',  id: subjectId  })
        // dispatch({ type: 'LIST_ALL_DISPLAY_SCHEDULE',  id: subjectId  })
    }

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [])

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
        if(subjectDetails.subjectList.length>0){
            setValue(subjectDetails.subjectList[0].title);
            getInProcessScheduleList(subjectDetails.subjectList[0].subjectId)
        }
    }, [subjectDetails.isResponseSuccess])

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [commonState.successMessage])

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
                <View style={{ flexDirection: 'row', alignItems:'center', alignSelf:'center', justifyContent:'center', marginTop:10 }}>
                    <TouchableOpacity underlayColor='#2377bf' style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <Image source={Audiocall} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <Image source={Videocall} style={{ height: 45, width: 45 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={{flex: 1}}>
             <View style={{ flex: 1 }}>
                {/* <ScrollView style={{position: 'relative'}}> */}
                    <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15, marginBottom:30 }}>
                        <View style={{ justifyContent: 'center', alignContent:'center', alignItems:'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18, color: '#8c8c8c' }}>select subject to show tasks</Text>
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
                                        getInProcessScheduleList(item.subjectId)
                                        // setValue(item.value);
                                        // setSelectedValue(item.id);
                                        // setIsFocus(false);
                                    }}
                                />
                            </View>
                        </View>

                        <View>
                        {scheduleDetails.scheduleLists.length>0?( <FlatList
                                style={{marginTop:20, marginBottom:30}}
                                data={scheduleDetails.scheduleLists}
                                ItemSeparatorComponent={ItemDivider}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />): 
                            <View style={{justifyContent:'center',height:'100%', alignItems:'center', alignContent:'center'}}>
                                <Text style={styles.norecordtext}>No task is available for this subject</Text></View> }

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
        fontSize: 16

    },
    norecordtext: {
        fontSize:16, 
        color:'black', 
        // fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center'
    },
})

export default InProcessSchedule