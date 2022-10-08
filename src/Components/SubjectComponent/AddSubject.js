import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, TextInput, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';


const AddSubject = ({ navigation }) => {

    // const [subjectId, setSubjectId] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [instructor, setInstructorId] = useState('0')
    const [mailingAlias, setEmailId] = useState()
    const [selectedValue, setSelectedValue] = useState('')
    const [subjectId, setsubjectId] = useState(0)
    const [insMail, setInsMail] = useState('') 

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('');
    const state = useSelector(state => state.subjectReducer)
    const commonState = useSelector(state => state.commonReducer)
    const instructorState = useSelector(state => state.instructorReducer)

    const dispatch = useDispatch();

    // console.log(instructorState.instructorsList[1].emailId)


    useEffect(() => {
        if (commonState.successMessage) {
            navigation.goBack();
        }
    }, [commonState.successMessage])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_INSTRUCTORS' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_INSTRUCTORS' })
        // console.log('instructors list added')
        // console.log('size => '+instructorState.instructorsList)
    }, [commonState.successMessage])

    useEffect(() => {
        if (commonState.errorMessage != null) {
            //start the timer
            setTimeout(() => {
                dispatch({ type: 'DISABLE_ERROR' })
            }, 2000)
        }
    }, [commonState.errorMessage])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_INSTRUCTORS' })
        // console.log('instructors list added')
        // console.log('size => '+instructorState.instructorsList[0].userName)
    }, [instructorState.isResponseSuccess])

    const onTextChange = (key, value) => {

        dispatch({ type: "ADD_SUBJECT", payload: { key: key, value: value } })
    }

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
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={title} editable={true} onChangeText={(text) => { onTextChange('title', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>Description :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }}
                                multiline={true} numberOfLines={5}
                                value={description} editable={true} onChangeText={(text) => { onTextChange('description', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>InstructorId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            {/* <TextInput style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }} value={instructorId} editable={true} onChangeText={(text) => { onTextChange('instructorId', text) }} /> */}
                            <Dropdown
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
                                placeholder={!isFocus ? 'Select' : 'Select'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                // onChangeText={(text) => { onTextChange('subjectId', text) }}
                                onChange={item => {
                                    setValue(item.firstName);
                                    setSelectedValue(item.id);
                                    setInstructorId(item.id + '');
                                    setsubjectId(item.id);
                                    setInsMail(item.emailId)
                                    console.log(item.emailId)
                                    onTextChange("instructor", item.id)
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#000000' }}>emailId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, borderBottomWidth: 0.7, borderBottomColor: '#000000' }}  editable={false} autoCapitalize={false}>{insMail}</Text>

                        </View>
                    </View>

                    {/* <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Alt EmailId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={altEmail} editable={true} onChangeText={(text) => { onTextChange('aliasMailId', text) }} autoCapitalize={false} />

                        </View>
                    </View> */}

                    {/* <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Skype Id :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={skypeId} editable={true} onChangeText={(text) => { onTextChange('skypeId', text) }} autoCapitalize={false} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Address :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={address} editable={true} onChangeText={(text) => { onTextChange('address', text) }} autoCapitalize={false}/>

                        </View>
                    </View> */}

                    {/* <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Password :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput secureTextEntry style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={password} editable={true} onChangeText={(text) => { onTextChange('password', text) }} />

                        </View>
                    </View> */}
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

            {
                commonState.errorMessage && <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#555555', borderRadius: 20 }}>
                    <Text style={{ color: '#FFFFFF' }}>{commonState.errorMessage}</Text>
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

export default connect(mapToProps)(AddSubject);