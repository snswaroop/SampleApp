import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Modal, ScrollView,ActivityIndicator,StyleSheet,FlatList } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';


const AddSchedule = ({props}) => {

    // const user = props.user

    // const [subjectId, setSubjectId] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [instructor, setInstructorId] = useState('0')
    const [mailingAlias, setEmailId] = useState()
    const [selectedValue, setSelectedValue] = useState('')
    const [subjectId, setsubjectId] = useState(0)
    const [isShowDatePicker, setShowDatePicker] = useState(true);
    const [modeOfPicker, setModeOfPicker] = useState('date')
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState('Start Date')
    const [endDate, setEndDate] = useState('End Date')
    const [startTime, setStartTime] = useState('Start Time')
    const [endTime, setEndTime] = useState('End Time')
    const [everyDay, setEveryDay] = useState('Select Days')
    const [modalVisible, setModalVisible] = useState(false);
    const [RepeatTask, setRepeatTask] = useState('')

    const [checkboxes, setCheckboxes] = useState([])
    const [selectedDays, setSelectedDays] = useState([])
    const [selectedDayNames, setSelectedDayNames] = useState([])

    const [startDateServer, setStartDateServer] = useState('')
    const [endDateServer, setEndDateServer] = useState('')
    const [startTimeServer, setStartTimeServer] = useState('')
    const [endTimeServer, setEndTimeServer] = useState('')

    const days = [
        {
            id:1,
            name: "Sunday",
            value: "u"
        },
        {
            id:2,
            name: "Monday",
            value: "m"
        },
        {
            id:3,
            name: "Tuesday",
            value: "t"
        },
        {
            id:4,
            name: "Wednesday",
            value: "w"
        },
        {
            id:5,
            name: "Thursday",
            value: "y"
        },
        {
            id:6,
            name: "Friday",
            value: "f"
        },
        {
            id:7,
            name: "Saturday",
            value: "s"
        },
    ]

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('');
    const state = useSelector(state => state.subjectReducer)
    const commonState = useSelector(state => state.commonReducer)
    const subjectDetails = useSelector(state => state.subjectReducer)

    const dispatch = useDispatch();


    const updateFields = () => {
        // var payload = {
        //     StartDateTime: '2022-07-01T15:00:00',
        //     EndDateTime: '2022-07-31T15:45:00',
        //     RepeatTask: 'ms'
        // }
        // dispatch({ type: 'ADD_SCHEDULE', payload: payload })
        console.log(startDateServer+'T'+startTimeServer +'    '+endDateServer+'T'+endTimeServer)

        dispatch({ type: "ADD_SCHEDULE", payload: { key: 'StartDateTime', value: startDateServer+'T'+startTimeServer } })
        dispatch({ type: "ADD_SCHEDULE", payload: { key: 'EndDateTime', value: endDateServer+'T'+endTimeServer } })
        dispatch({ type: "ADD_SCHEDULE", payload: { key: 'RepeatTask', value: RepeatTask } })

    }


    useEffect(() => {
        if (commonState.successMessage) {
            navigation.goBack();
        }
    }, [commonState.successMessage])

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [])

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
        // console.log('instructors list added')
        // console.log('size => '+instructorState.instructorsList)
    }, [commonState.successMessage])

    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({ type: 'LIST_ALL_SUBJECT' })
        // console.log('instructors list added')
        // console.log('size => '+instructorState.instructorsList[0].userName)
    }, [subjectDetails.isResponseSuccess])

    const onTextChange = (key, value) => {
        // dispatch({ type: "ADD_SUBJECT", payload: { key: key, value: value } })
    }

    const hideDatePicker = () => {
        setShowDatePicker(!isShowDatePicker);
    };
    
    const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date);
        const currentDate = date;
        // setDate(currentDate);
        // console.log(Moment(currentDate).format('DD/MM/YYYY'))
        // setDOB(Moment(currentDate).format('YYYY-DD-MM'))

        if(type == 'startDate'){
            console.log(Moment(currentDate).format('DD/MM/YYYY'))
            setStartDate(Moment(currentDate).format('DD/MM/YYYY'))
            setStartDateServer(Moment(currentDate).format('YYYY-MM-DD'))
        } else if (type == 'endDate'){
            console.log(Moment(currentDate).format('DD/MM/YYYY'))
            setEndDate(Moment(currentDate).format('DD/MM/YYYY'))
            setEndDateServer(Moment(currentDate).format('YYYY-MM-DD'))
        } else if (type == 'startTime'){
            console.log(Moment(currentDate).format('HH:mm:ss A'))
            setStartTime(Moment(currentDate).format('HH:mm:ss A'))
            setStartTimeServer(Moment(currentDate).format('HH:mm:ss'))
        } else if (type == 'endTime'){
            console.log(Moment(currentDate).format('HH:mm:ss A'))
            setEndTime(Moment(currentDate).format('HH:mm:ss A'))
            setEndTimeServer(Moment(currentDate).format('HH:mm:ss'))
        }

        hideDatePicker();
        updateFields()
    };

    const manageDateTimePickerVisibility = (mode, type) => {
        setShowDatePicker(!isShowDatePicker);
        setModeOfPicker(mode)
        setType(type)
    };

    const setCheckBoxValue = (item) => {
        let selectedCheckboxes = checkboxes
        let selectedCheckboxDays = selectedDays
        let selectedCheckboxDayNames = selectedDayNames
        console.log('value => '+item.value)

        if(selectedCheckboxes && selectedCheckboxes.includes(item.id)){
            // console.log(selectedCheckboxes.indexOf(item.id))
            // console.log(selectedCheckboxDays.indexOf(item.value))
            // selectedCheckboxes = selectedCheckboxes.splice(selectedCheckboxes.indexOf(item.id), 1);

            setCheckboxes(checkboxes.filter((o, i) => selectedCheckboxes.indexOf(item.id) !== i));
            setSelectedDays(selectedDays.filter((o, i) => selectedCheckboxDays.indexOf(item.value) !== i));
            setSelectedDayNames(selectedDayNames.filter((o, i) => selectedCheckboxDayNames.indexOf(item.name) !== i));
            
        } else {
            selectedCheckboxes = selectedCheckboxes.concat(item.id)
            setCheckboxes(selectedCheckboxes)

            selectedCheckboxDays = selectedCheckboxDays.concat(item.value)
            setSelectedDays(selectedCheckboxDays)

            selectedCheckboxDayNames = selectedCheckboxDayNames.concat(item.name)
            setSelectedDayNames(selectedCheckboxDayNames)
        }
        
        console.log("selectde checkbox id: ", checkboxes)
        console.log("selectde checkbox days: ", selectedDays)
        console.log("selectde checkbox day names: ", selectedCheckboxDayNames)
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <CheckBox
                style={{justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'center'}}
                disabled={false}
                value={checkboxes && checkboxes.includes(item.id)}
                // onChange={() => setCheckBoxValue(item)}
                onValueChange={() => setCheckBoxValue(item)}
                // onPress={() => setCheckBoxValue(item)}
            />
            <View style={{marginStart:10}}>
                <View style={{ flexDirection: 'row', flex: 1,justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'center' }}>
                    {/* <Text style={{ color: '#000000', fontSize: 16, fontWeight:'bold' }}>Name :     </Text> */}
                    <Text style={{ color: '#222222', fontSize: 16 }}>{item.name}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: '#000000', fontSize: 16, fontWeight:'bold' }}>Email :     </Text>
                    <Text style={{ color: '#222222', fontSize: 16 }}>{item.emailId}</Text>
                </View> */}
            </View>
            {/* <Text style={styles.title}>{item.firstName}</Text> */}
        </View>
    );

    const setDaysFromList = () => {
        setModalVisible(!modalVisible)

        const stringData = selectedDayNames.reduce((result, item) => {
            return `${result}${item} `
          }, "")
          
          console.log(stringData)

        setEveryDay(stringData)

        const stringDataSelectedDays = selectedDays.reduce((result, item) => {
            return `${result}${item}`
          }, "")

          console.log(stringDataSelectedDays)
        
        setRepeatTask(stringDataSelectedDays)  

    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{position: 'relative'}}>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15, marginBottom:30 }}>

                {/* {isShowDatePicker && ( */}
                    <DateTimePickerModal
                        isVisible={!isShowDatePicker}
                        mode={modeOfPicker}
                        minimumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                {/* )} */}
            

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>SubjectId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            {/* <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={instructorId} editable={true} onChangeText={(text) => { onTextChange('instructorId', text) }} /> */}
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={subjectDetails.subjectList}
                                // search
                                // maxHeight={100}
                                labelField="title"
                                valueField="title"
                                placeholder={!isFocus ? 'Select' : 'Select'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                // onChangeText={(text) => { onTextChange('subjectId', text) }}
                                onChange={item => {
                                    setValue(item.title);
                                    setSelectedValue(item.id);
                                    setInstructorId(item.id+'');
                                    setsubjectId(item.id);
                                    console.log(item.id+" => id")
                                    setIsFocus(false);
                                    updateFields()
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>Every :</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 3, justifyContent: 'center' }} onPress={() => setModalVisible(true)}>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>{everyDay}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>Start Day :</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 3, justifyContent: 'center' }} onPress={() => manageDateTimePickerVisibility("date", "startDate")}>
                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>{startDate}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>End Day :</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 3, justifyContent: 'center' }} onPress={() => manageDateTimePickerVisibility("date", "endDate")}>
                            <View>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>{endDate}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>StartTime :</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 3, justifyContent: 'center' }} onPress={() => manageDateTimePickerVisibility("time", "startTime")}>
                            <View>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>{startTime}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>EndTime :</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 3, justifyContent: 'center' }} onPress={() => manageDateTimePickerVisibility("time", "endTime")}>
                            <View>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>{endTime}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Modal
                    // animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{backgroundColor:'#039be6', height:40, justifyContent:'center'}}>
                                <Text style={{color:'white',fontWeight:'600', fontSize:20, justifyContent:'center', textAlign:'center'}}>Select Days</Text>
                            </View>
                            
                            <FlatList 
                                style={{flexGrow:0, marginTop:10}}
                                data={days}
                                keyExtractor={item => days.value}
                                renderItem={renderItem}
                            />
                            {/* <Text style={{color:'black',fontWeight:'600', marginTop:10, fontSize:12, marginStart: 10, marginEnd:10, textAlign:'center'}}>Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account , please download any data or information that you wish to retain
                            </Text> */}

                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:20, marginBottom: 40}}>
                                    <TouchableOpacity
                                        style={styles.buttongrey}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.buttonTextBlack}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.buttonred}
                                        // onPress={() => setModalVisible(true)}
                                        onPress={() => setDaysFromList()}
                                    >
                                        <Text style={[styles.buttonTextRed,{fontWeight:'600'}]}>Set</Text>
                                    </TouchableOpacity>
                            </View>
                        
                        </View>
                    </View>
                </Modal> 
                   
                </View>
            </ScrollView>

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
    placeholderStyle: {
        fontSize: 16,
        color:'black'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'black'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      dropdown: {
        height: 30,
        marginEnd:40
        // width:110,
        // marginEnd:10,
        // borderColor: 'black',
        // backgroundColor:'white',
        // borderWidth: 1,
        // paddingHorizontal: 8,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // marginStart: 10,
        // marginEnd: 10,
        // backgroundColor: '#FFFFFFCC',
        backgroundColor: 'rgba(0,0,0,0.5)'
        // opacity:50
      },
      modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
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
        width:'90%',
        marginStart: 10,
        marginEnd: 10
      },
      item: {
        // backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 10,
        flexDirection:'row'
      },
      buttonred:{
        width:120,
        backgroundColor:'#039be6',
        alignSelf:'flex-start',
        borderRadius:20,
        marginEnd:20,
        marginTop:10
    },
    buttongrey:{
        width:120,
        backgroundColor:'#f3f3f5',
        alignSelf:'flex-start',
        borderRadius:20,
        marginEnd:20,
        marginTop:10
    },
    buttonTextRed:{
        alignSelf:'center', 
        color:'white', 
        fontSize:16,
        marginTop:8,
        marginBottom:8,
        fontWeight:'bold'
      },
      buttonTextBlack:{
        alignSelf:'center', 
        color:'black', 
        fontSize:16,
        marginTop:8,
        marginBottom:8,
        fontWeight:'600'
      },
})

const mapToProps = (state) => {
    return {
        user: {  id: state.scheduleReducer.taskId, StartDateTime: state.scheduleReducer.StartDateTime, 
            EndDateTime: state.scheduleReducer.EndDateTime, RepeatTask: state.scheduleReducer.RepeatTask, }
    }
}

export default connect(mapToProps)(AddSchedule);