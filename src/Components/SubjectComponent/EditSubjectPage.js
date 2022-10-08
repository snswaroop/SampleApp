import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

const EditSubjectPage = (props) => {

    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [selectedCause, setSelectedCause] = useState('')
    const instructorState = useSelector(state => state.instructorReducer)
    const [instructorId, setInstructorId] = useState()
    const [selectedInstructor, setSelectedInstructor] = useState()

    const user = props.user
    const [emailId, setEmailId] = useState()

    const dispatch = useDispatch()

    const commonState = useSelector(state => state.commonReducer)

    const updateFields = (key, value) => {

        dispatch({ type: 'UPDATE_SUBJECT', payload: { key: key, value: value } })
    }

    useEffect(() => {
        if (commonState.successMessage) {
            props.navigation.goBack();
        }
    }, [commonState.successMessage])


    useEffect(() => {
        // console.log(instructorState.instructorsList)
        if (instructorState.instructorsList.length > 0) {
            setSelectedInstructor(instructorState.instructorsList.filter(item => {
                return item.id === props.user.instructor
            })[0])
        }
    }, [instructorState.instructorsList])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_INSTRUCTORS' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_INSTRUCTORS' })
    }, [commonState.successMessage])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_INSTRUCTORS' })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ position: 'relative' }}>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15, marginBottom: 30 }}>
                    {/* <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>SubjectId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={userName} editable={true} onChangeText={(text) => { onTextChange('userName', text) }} />
                        </View>
                    </View> */}

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>Title :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={user.title} editable={true} onChangeText={(text) => { updateFields('title', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>Description :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }}
                                multiline={true} numberOfLines={5}
                                value={user.description} editable={true} onChangeText={(text) => { updateFields('description', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>InstructorId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            {
                                instructorState.instructorsList && selectedInstructor && <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={instructorState.instructorsList}
                                    // search
                                    // maxHeight={100}
                                    labelField="firstName"
                                    valueField="firstName"
                                    placeholder={!isFocus ? selectedInstructor.firstName + " " + selectedInstructor.lastName : 'Select'}
                                    searchPlaceholder="Search..."
                                    value={selectedInstructor.firstName + " " + selectedInstructor.lastName}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue(item.firstName + " " + item.lastName);
                                        setSelectedInstructor(item)
                                        setSelectedCause(item.id)
                                        setInstructorId(item.id);
                                        setIsFocus(false);
                                        setEmailId(item.emailId)
                                    }}
                                />
                            }

                            {/* <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={user.instructorId} editable={true} onChangeText={(text) => { updateFields('instructorId', text) }} /> */}
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>emailId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000', color: '#333333' }} value={selectedInstructor?.emailId} editable={false} autoCapitalize={false} />

                        </View>
                    </View>

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
})

const mapToProps = (state) => {
    return {
        user: {
            subjectId: state.subjectReducer.subjectId, title: state.subjectReducer.title,
            description: state.subjectReducer.description, subjectTerm: state.subjectReducer.subjectTerm,
            subjectType: state.subjectReducer.subjectType, mailingAlias: state.subjectReducer.mailingAlias,
            instructor: state.subjectReducer.instructor, startDate: state.subjectReducer.startDate,
            endDate: state.subjectReducer.endDate, startTime: state.subjectReducer.startTime,
            endTime: state.subjectReducer.endTime, duration: state.subjectReducer.duration,
            audioEnabled: state.subjectReducer.audioEnabled, videoEnabled: state.subjectReducer.videoEnabled,
            instructorNavigation: state.subjectReducer.instructorNavigation,
        }
    }
}

export default connect(mapToProps)(EditSubjectPage);