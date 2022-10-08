import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Globalstyles from '../../Utils/Globalstyles';
import QB from 'quickblox-react-native-sdk'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';



const HomeMain = ({ navigation }) => {

    const state = useSelector(state => state)
    const user = useSelector(state => state.loginReducer.user)
    const instructorReducer = useSelector(state => state.instructorReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'USER_INFO', payload: user })
    }, [])

    // const fetchInsDetails = () => useCallback(() => {
    //     console.log("calling")
    // }, [user.type])


    // if (user) {
    //     console.log(user)
    //     console.log("----------")
    //     if (user.userType === 'instructor') {
    //         console.log("entered")
    //         fetchInsDetails()
    //     }
    // }

    useEffect(() => {
        if (user) {
            if (user.userType === 'instructor') {
                dispatch({type: 'GET_SUB_BY_INS_REQ', data: user.id})
                renderInstructorDetails()
            }
        }
    }, [user])


    const clickStudents = () => {
        console.log(navigation)
        navigation.navigate('student-list')
    }

    const clickInstructors = () => {
        navigation.navigate('instructor')
    }

    const makeCall = () => {
        const params = {
            opponentsIds: [135482026],
            type: QB.webrtc.RTC_SESSION_TYPE.VIDEO
        }

        QB.webrtc
            .call(params)
            .then(function (session) {
                console.log("session created")
                console.log(session)
                /* session created */
})
            .catch(function (e) {
                /* handle error */
                console.log("Error")
                console.log(e)
            })

    }

    const renderAdminDetails = () => {
        return <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]}>
                <Text style={[Globalstyles.textWhite]}>Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]} onPress={clickStudents}>
                <Text style={[Globalstyles.textWhite]}>Students</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]} onPress={clickInstructors}>
                <Text style={[Globalstyles.textWhite]}>Instructors</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 1, }}></View>
        </View>
    }

    const renderInstructorDetails = () => {
        return <View style={{flex: 1}}>
            {
                instructorReducer.subjectList.length > 0 ?<FlatList data={instructorReducer.subjectList} key={(item) => item.subjectId} renderItem={({item}) => {
                    return <View key={item.subjectId} style={{flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FFFFFF', paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#555555'}}>Title: </Text>
                        <Text style={{fontSize: 16, color: '#222222', fontWeight: '600'}}>{item.title}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                        <Text style={{fontSize: 16, color: '#555555'}}>Description: </Text>
                        <Text style={{fontSize: 16, color: '#222222', fontWeight: '600'}}>{item.description}</Text>
                        </View>
                    </View>
                }} /> 
                : 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 22, fontWeight: '600', color: '#555555'}}>No subject added yet.</Text>
                </View>
            }
        </View>
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE' }}>

            <View style={{ flex: 1, width: '100%', paddingTop: 8, paddingBottom: 8 }}>

                {
                    user && user.userType === 'admin' && renderAdminDetails()
                }
                {
                    user && user.userType === 'instructor' && renderInstructorDetails()
                }

                {/* <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]}>
                <Text style={[Globalstyles.textWhite]}>Syllabus</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]}>
                <Text style={[Globalstyles.textWhite]}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]}>
                <Text style={[Globalstyles.textWhite]}>Instructor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[Globalstyles.buttonBlue, Globalstyles.verticalSpacing]} onPress={makeCall}>
                <Text style={[Globalstyles.textWhite]}>Make Call</Text>
            </TouchableOpacity> */}

            </View>


        </View>
    )
}

export default HomeMain;
