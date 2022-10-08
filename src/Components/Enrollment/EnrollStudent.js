import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, } from 'react-native';
import { useSelector, connect, useDispatch } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import Globalstyles from '../../Utils/Globalstyles';

const EnrollStudent = ({ navigation }) => {

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('Select');
    const [selectedValue, setSelectedValue] = useState(0)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checkboxes, setCheckboxes] = useState([])

    const dispatch = useDispatch();
    const enrollmentDetails = useSelector(state => state.enrollmentReducer)
    const subjectDetails = useSelector(state => state.subjectReducer)
    const commonState = useSelector(state => state.commonReducer)

    // useEffect(() => {
    //     dispatch({type: 'LOADING'})
    //     // dispatch({ type: 'LIST_ALL_UNENROLLED_STUDENTS', id: 2 })
    //     dispatch({ type: 'LIST_ALL_UNENROLLED_STUDENTS', data: { id: 2 } })
    // }, [])

    const updateUnEnrolledStudentInfo = (subjectId) => {

        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_UNENROLLED_STUDENTS', id: subjectId })
    }

    const EnrolledStudents = (key, value) => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'ENROLL_STUDENTS', payload: { id: key, studentId: value } })
    }

    // useEffect(() => {
    //     dispatch({type: 'LOADING'})
    //     dispatch({ type: 'LIST_ALL_UNENROLLED_STUDENTS', id: 2 })
    // }, [enrollmentDetails.isResponseSuccess])

    // useEffect(() => {
    //     dispatch({type: 'LOADING'})
    //     dispatch({ type: 'LIST_ALL_UNENROLLED_STUDENTS', id: 2 })
    // }, [commonState.successMessage])


    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SUBJECT' })
        if (subjectDetails.subjectList.length > 0) {
            setValue(subjectDetails.subjectList[0].title);
            updateUnEnrolledStudentInfo(subjectDetails.subjectList[0].subjectId)
        }
    }, [subjectDetails.isResponseSuccess])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [commonState.successMessage])

    useEffect(() => {
        if (commonState.successMessage) {
            // props.navigation.goBack();
        }
    }, [commonState.successMessage])

    useEffect(() => {
        if (commonState.errorMessage != null) {
            //start the timer
            setTimeout(() => {
                dispatch({ type: 'DISABLE_ERROR' })
            }, 2000)
        }
    }, [commonState.errorMessage])


    const setCheckBoxValue = (item) => {
        let selectedCheckboxes = checkboxes
        if (selectedCheckboxes && selectedCheckboxes.includes(item.id)) {
            console.log(selectedCheckboxes.indexOf(item.id))
            // selectedCheckboxes = selectedCheckboxes.splice(selectedCheckboxes.indexOf(item.id), 1);

            setCheckboxes(checkboxes.filter((o, i) => selectedCheckboxes.indexOf(item.id) !== i));

        } else {
            selectedCheckboxes = selectedCheckboxes.concat(item.id)
            setCheckboxes(selectedCheckboxes)
        }
    }

    function onSubmitData() {
        var tempArray = []
        for (let i = 0; i < checkboxes.length; i++) {
            tempArray.push(checkboxes[i])
        }

        // console.log(selectedValue)
        // console.log(tempArray)
        if (checkboxes.length > 0) {
            dispatch({ type: 'LOADING' })
            for (let i = 0; i < checkboxes.length; i++) {
                EnrolledStudents(selectedValue, checkboxes[i])
            }
        }
        else {
            dispatch({ type: 'ERROR', payload: { errorMessage: 'Please select students' } })
        }

    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <CheckBox
                style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                disabled={false}
                value={checkboxes && checkboxes.includes(item.id)}
                // onChange={() => setCheckBoxValue(item)}
                onValueChange={() => setCheckBoxValue(item)}
            // onPress={() => setCheckBoxValue(item)}
            />
            <View style={{ flexDirection: 'column', marginStart: 10 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>Name :     </Text>
                    <Text style={{ color: '#222222', fontSize: 16 }}>{item.firstName + ' ' + item.lastName}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>Email :     </Text>
                    <Text style={{ color: '#222222', fontSize: 16 }}>{item.emailId}</Text>
                </View>
            </View>
            {/* <Text style={styles.title}>{item.firstName}</Text> */}
        </View>
    );


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <ScrollView style={{position: 'relative'}}> */}
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15, marginBottom: 30 }}>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>Subject Id :</Text>
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
                                    setSelectedValue(item.subjectId)
                                    setIsFocus(false);
                                    updateUnEnrolledStudentInfo(item.subjectId)
                                    // setValue(item.value);
                                    // setSelectedValue(item.id);
                                    // setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, paddingBottom: 10 }}>
                        {
                            enrollmentDetails && enrollmentDetails?.enrollmentList?.length > 0 ? <FlatList
                                style={{ marginTop: 20, marginBottom: 100 }}
                                data={enrollmentDetails.enrollmentList}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            /> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                                <Text style={{ fontWeight: '600', fontSize: 18, color: '#333333' }}>No Students found</Text>
                            </View>
                        }


                    </View>

                    <TouchableOpacity style={[styles.buttonBlue, { position: 'absolute', bottom: 0 }]} onPress={onSubmitData}>
                        <Text style={[styles.textWhite]}>Enroll</Text>
                    </TouchableOpacity>

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


            {
                commonState.errorMessage && <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#555555', borderRadius: 20 }}>
                    <Text style={{ color: '#FFFFFF' }}>{commonState.errorMessage}</Text>
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
        fontSize: 14,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
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
        flexDirection: 'row'
    },
    title: {
        fontSize: 32,
    },
    buttonBlue: {
        backgroundColor: '#2377bf',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        width: '100%',
        // paddingTop: 10,
        height: 40,
        // paddingBottom: 10,
    },
    verticalSpacing: {
        marginTop: 8,
        marginBottom: 8,
    },
    textWhite: {
        color: '#FFFFFF',
        fontSize: 16

    }
})

export default EnrollStudent