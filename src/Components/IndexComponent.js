import React, { useEffect } from "react";
import { StatusBar, TouchableOpacity, Image, Text } from 'react-native'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tick from '../Assests/tick.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './LoginComponent/Login';
import Home from './HomeComponent/Home';
import MyInfoPage from './MyInfoComponent/MyInfoPage';
import AdminListPage from './AdminListComponent/AdminListPage';
import EditAdminPage from './AdminListComponent/EditAdminPage';
import AddAdmin from './AdminListComponent/AddAdmin';
import InstructorList from "./InstructorComponents/InstructorList";
import AddInstructor from "./InstructorComponents/AddInstructor";
import EditInstructors from "./InstructorComponents/EditInstructors";
import APIProvider from "../Utils/APIProvider";
import { useDispatch, useSelector } from 'react-redux'
import StudentListPage from "./StudentComponents/StudentListPage";
import EditStudentPage from "./StudentComponents/EditStudentPage";
import AddStudent from "./StudentComponents/AddStudent";
import SubjectListPage from "./SubjectComponent/SubjectListPage";
import AddSubject from "./SubjectComponent/AddSubject";
import EditSubjectPage from "./SubjectComponent/EditSubjectPage";
import EnrollStudent from "./Enrollment/EnrollStudent";
import EnrollDisplayStudents from "./Enrollment/EnrollDisplayStudents";
import DropEnrolledStudents from "./Enrollment/DropEnrolledStudents";

import { initializeWebRTC } from '../Utils/QBConfig'
import DisplayScheduleList from "./ScheduleComponent/DisplayScheduleList";
import EditScheduleList from "./ScheduleComponent/EditScheduleList";
import AddSchedule from "./ScheduleComponent/AddSchedule";
import RemoveSchedule from "./ScheduleComponent/RemoveSchedule";
import InProcessSchedule from "./ScheduleComponent/InProcessSchedule";
import GradeList from "./GradeComponent/GradeList";

const IndexComponent = (props) => {

    const Stack = createStackNavigator();
    const state = useSelector(state => state)
    const dispatch = useDispatch();


    var user = {}
    var sub = {
        Title: state.subjectReducer.title,
        Description: state.subjectReducer.description,
        Instructor: state.subjectReducer.instructor,
        MailingAlias: state.subjectReducer.mailingAlias
    }

    const updateUserInfo = () => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'UPDATE_ADMIN_INFO', data: { id: state.adminReducer.id, values: user } })
    }

    const updateInstructorInfo = () => {
        // console.log(user)
        dispatch({ type: 'UPDATE_INSTRUCTOR_INFO', data: { id: state.instructorReducer.id, values: user } })
    }

    const updateStudentInfo = () => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'UPDATE_STUDENT_INFO', data: { id: state.studentReducer.id, values: user } })
    }

    const updateSubjectInfo = () => {
        dispatch({ type: 'LOADING' })
        dispatch({type: 'UPDATE_SUBJECT_INFO', data: {values: sub, id: state.subjectReducer.subjectId}})
    }

    const addScheduleApi = () => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'ADD_NEW_SCHEDULE_API_CALL', data: { id: 9, values: user } })
    }

    const callAddUserApi = () => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'ADD_NEW_ADMIN_API_CALL', data: user })
    }

    const callAddInstructorApi = () => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'ADD_INSTRUCTOR_POST', data: user })
    }

    const callAddStudentApi = () => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'ADD_NEW_STUDENT_API_CALL', data: user })
    }

    const callAddSubjectApi = () => {
        let subjectInfo = { Title: state.subjectReducer.title, Description: state.subjectReducer.description, Instructor: state.subjectReducer.instructor, MailingAlias: state.subjectReducer.mailingAlias }

        dispatch({ type: 'LOADING' })
        dispatch({ type: 'ADD_NEW_SUBJECT_API_CALL', data: subjectInfo })
    }

    const validateTextLength = (text) => {
        return text.length > 1
    }

    const validateInstructorSelection = (instructor) => {
        if (instructor) {
            return instructor.toString().length > 0
        }
        else return false
    }

    const checkPassword = (password) => {
        if (password) {
            if (password.length > 2) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }


    }

    const validateEmail = (email) => {
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(reg)) {

            return true;
        }
        else {
            return false
        }
    }

    const validatePhone = (phone) => {
        if (phone.length > 9) {
            return true
        }
        else {
            return false
        }
    }

    const validateUserName = (userName) => {
        if (userName.length > 2) {
            return true
        }
        else {
            return false
        }
    }

    const validateFirstName = (name) => {
        if (name.length > 2) {
            return true
        }
        else {
            return false
        }
    }

    const validateAddress = (address) => {
        return address.length > 5
    }

    const validateEditInfo = (reducer, type) => {
        if (validateFirstName(reducer.firstName)) {
            if (validatePhone(reducer.telephone)) {
                if (validateEmail(reducer.emailId)) {
                    if (reducer.aliasMailId.length > 0) {
                        if (validateEmail(reducer.aliasMailId)) {
                            if (validateAddress(reducer.address)) {
                                //call update API
                                if (type === 'admin') {
                                    updateUserInfo()
                                }
                                else if (type === 'ins') {
                                    updateInstructorInfo()
                                }
                                else if (type === 'stu') {
                                    updateStudentInfo()
                                }
                            }
                            else {
                                dispatch({ type: 'INVALID_ADDRESS', payload: { message: 'INVALID ADDRESS' } })
                            }
                        }
                        else {
                            dispatch({ type: 'INVALID_ALAIS', payload: { message: 'INVALID ALT EMAIL ID' } })
                        }
                    }
                    else {
                        if (validateAddress(reducer.address)) {
                            //call update API
                            if (type === 'admin') {
                                updateUserInfo()
                            }
                            else if (type === 'ins') {
                                updateInstructorInfo()
                            }
                            else if (type === 'stu') {
                                updateStudentInfo()
                            }
                        }
                        else {
                            dispatch({ type: 'INVALID_ADDRESS', payload: { message: 'INVALID ADDRESS' } })
                        }
                    }
                }
                else {
                    dispatch({ type: 'INVALID_EMAIL', payload: { message: 'INVALID EMAIL ID' } })
                }
            }
            else {
                dispatch({ type: 'INVALID_PHONE', payload: { message: 'INVALID PHONE' } })
            }
        }
        else {
            dispatch({ type: 'INVALID_FIRST_NAME', payload: { message: 'INVALID First NAME' } })
        }
    }

    const validateInformation = (reducer, type) => {
        if (validateUserName(reducer.userName)) {
            if (validateFirstName(reducer.firstName)) {
                if (validatePhone(reducer.telephone)) {
                    if (checkPassword(reducer.password)) {
                        if (validateEmail(reducer.emailId)) {
                            if (reducer.aliasMailId.length > 0) {
                                if (validateEmail(reducer.aliasMailId)) {
                                    if (validateAddress(reducer.address)) {
                                        if (type === 'admin') {
                                            callAddUserApi()
                                        }
                                        else if (type === 'ins') {
                                            callAddInstructorApi()
                                        }
                                        else if (type === 'stu') {
                                            callAddStudentApi()
                                        }
                                    }
                                    else {
                                        dispatch({ type: 'INVALID_ADDRESS', payload: { message: 'INVALID ADDRESS' } })
                                    }
                                }
                                else {
                                    dispatch({ type: 'INVALID_ALAIS', payload: { message: 'INVALID ALT EMAIL ID' } })
                                }
                            }
                            else {
                                if (type === 'admin') {
                                    callAddUserApi()
                                }
                                else if (type === 'ins') {
                                    callAddInstructorApi()
                                }
                                else if (type === 'stu') {
                                    callAddStudentApi()
                                }
                            }

                        }
                        else {
                            dispatch({ type: 'INVALID_EMAIL', payload: { message: 'INVALID EMAIL ID' } })
                        }

                    }
                    else {
                        if (checkPassword(reducer.password)) {
                            if (validateEmail(reducer.emailId)) {
                                if (reducer.aliasMailId.length > 0) {
                                    if (validateEmail(reducer.aliasMailId)) {
                                        if (validateAddress(reducer.address)) {
                                            if (type === 'admin') {
                                                callAddUserApi()
                                            }
                                            else if (type === 'ins') {
                                                callAddInstructorApi()
                                            }
                                            else if (type === 'stu') {
                                                callAddStudentApi()
                                            }
                                        }
                                        else {
                                            dispatch({ type: 'INVALID_ADDRESS', payload: { message: 'INVALID ADDRESS' } })
                                        }
                                    }
                                    else {
                                        dispatch({ type: 'INVALID_ALAIS', payload: { message: 'INVALID ALT EMAIL ID' } })
                                    }
                                }
                                else {
                                    if (type === 'admin') {
                                        callAddUserApi()
                                    }
                                    else if (type === 'ins') {
                                        callAddInstructorApi()
                                    }
                                    else if (type === 'stu') {
                                        callAddStudentApi()
                                    }
                                }

                            }
                            else {
                                dispatch({ type: 'INVALID_EMAIL', payload: { message: 'INVALID EMAIL ID' } })
                            }

                        }
                        else {
                            dispatch({ type: 'INVALID_PASSWORD', payload: { message: 'INVALID PASSWORD' } })
                            // console.log("invalid password. Please try again")
                        }
                        // console.log("invalid password. Please try again")
                    }
                }
                else {
                    dispatch({ type: 'INVALID_PHONE', payload: { message: 'INVALID PHONE' } })
                }
            }
            else {
                dispatch({ type: 'INVALID_FIRST_NAME', payload: { message: 'INVALID First NAME' } })
            }
        }
        else {
            dispatch({ type: 'INVALID_USER_NAME', payload: { message: 'INVALID USERNAME' } })
        }
    }

    useEffect(() => {
        user = {
            userName: state.adminReducer.userName,
            firstName: state.adminReducer.firstName,
            lastName: state.adminReducer.lastName,
            telephone: state.adminReducer.telephone,
            emailId: state.adminReducer.emailId,
            aliasMailId: state.adminReducer.aliasMailId,
            skypeId: state.adminReducer.skypeId,
            password: state.adminReducer.password,
            userType: 'admin',
            address: state.adminReducer.address
        }
    }, [state.adminReducer])

    useEffect(() => {
        user = {
            userName: state.instructorReducer.userName,
            firstName: state.instructorReducer.firstName,
            lastName: state.instructorReducer.lastName,
            telephone: state.instructorReducer.telephone,
            emailId: state.instructorReducer.emailId,
            aliasMailId: state.instructorReducer.aliasMailId,
            skypeId: state.instructorReducer.skypeId,
            password: state.instructorReducer.password,
            userType: 'instructor',
            address: state.instructorReducer.address
        }
    }, [state.instructorReducer])

    useEffect(() => {
        user = {
            userName: state.studentReducer.userName,
            firstName: state.studentReducer.firstName,
            lastName: state.studentReducer.lastName,
            telephone: state.studentReducer.telephone,
            emailId: state.studentReducer.emailId,
            aliasMailId: state.studentReducer.aliasMailId,
            skypeId: state.studentReducer.skypeId,
            password: state.studentReducer.password,
            userType: 'student',
            address: state.studentReducer.address
        }
    }, [state.studentReducer])

    useEffect(() => {
        // console.log("Subject is changing")
        // sub = {
        //     Title: state.subjectReducer.title,
        //     Description: state.subjectReducer.description,
        //     Instructor: state.subjectReducer.instructor,
        //     MailingAlias: state.subjectReducer.mailingAlias
        // }

        // console.log(sub);
    }, [state.subjectReducer])

    useEffect(() => {
        user = {
            StartDateTime: state.scheduleReducer.StartDateTime,
            EndDateTime: state.scheduleReducer.EndDateTime,
            RepeatTask: state.scheduleReducer.RepeatTask
        }
    }, [state.scheduleReducer])


    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor="#2377bf"
                barStyle="light-content"
            />
            <Stack.Navigator initialRouteName='Sign In' useLegacyImplementation={true}>
                <Stack.Screen name='Sign In' component={Login} options={{
                    title: 'Sign In',
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                }}></Stack.Screen>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false, }} ></Stack.Screen>
                <Stack.Screen name='My Info' component={MyInfoPage} options={{
                    title: 'My Info', headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                }} />
                <Stack.Screen name='admin-list' component={AdminListPage} options={{
                    title: 'Admin List', headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                }} />
                <Stack.Screen name='edit-admin' component={EditAdminPage} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                validateEditInfo(state.adminReducer, "admin")
                                // updateUserInfo() 
                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>
                    )
                }} />

                <Stack.Screen name='add-admin' component={AddAdmin} options={{
                    headerStyle: {
                        backgroundColor: '#2377bf',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                    title: 'Add Admin',
                    headerRight: () =>
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                dispatch({ type: 'DISABLE_ERROR' })
                                validateInformation(state.adminReducer, "admin")
                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>

                }} />
                <Stack.Screen name="instructor" component={InstructorList} options={{
                    headerStyle: {
                        backgroundColor: '#2377bf',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    }
                }} />
                <Stack.Screen name="add-instructor" component={AddInstructor} options={{
                    headerStyle: {
                        backgroundColor: '#2377bf',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                    title: 'Add Instructor',
                    headerRight: () =>
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                dispatch({ type: 'DISABLE_ERROR' })
                                validateInformation(state.instructorReducer, "ins")
                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>

                }} />

                <Stack.Screen name='edit-instructor' component={EditInstructors} options={{
                    headerStyle: {
                        backgroundColor: '#2377bf',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    },
                    title: 'Edit Instructor',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                validateEditInfo(state.instructorReducer, "ins")
                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>
                    )
                }} />
                <Stack.Screen name='student-list' component={StudentListPage} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Student',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />
                <Stack.Screen name='edit-student' component={EditStudentPage} options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: route.params.name,
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                validateEditInfo(state.studentReducer, "stu")
                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>
                    )
                })} />

                <Stack.Screen name='add-student' component={AddStudent} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Add Student',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () =>
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                dispatch({ type: 'DISABLE_ERROR' })
                                validateInformation(state.studentReducer, "stu")

                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>

                }} />

                <Stack.Screen name='subject-list' component={SubjectListPage} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Subject',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />

                <Stack.Screen name='add-subject' component={AddSubject} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Add Subject',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () =>
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {

                                if (validateTextLength(state.subjectReducer.title)) {
                                    if (validateTextLength(state.subjectReducer.description)) {
                                        if (validateInstructorSelection(state.subjectReducer.instructor)) {
                                            callAddSubjectApi()
                                        }
                                        else {
                                            dispatch({ type: 'SELECT_INSTRUCTOR', payload: { message: 'SELECT INSTRUCTOR' } })
                                        }
                                    }
                                    else {
                                        dispatch({ type: 'INVALID_DESC', payload: { message: 'INVALID DESC' } })
                                    }
                                }
                                else {
                                    dispatch({ type: 'INVALID_TITLE', payload: { message: 'INVALID TITLE' } })
                                }

                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>

                }} />
                <Stack.Screen name='edit-subject' component={EditSubjectPage} options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: route.params.name,
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => { updateSubjectInfo() }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>
                    )
                })} />

                <Stack.Screen name='enroll-student' component={EnrollStudent} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Enroll Student',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />

                <Stack.Screen name='display-enroll-student' component={EnrollDisplayStudents} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Enroll Student Display',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />

                <Stack.Screen name='drop-enroll-student' component={DropEnrolledStudents} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Disenroll Student',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />

                <Stack.Screen name="display-schedule-list" component={DisplayScheduleList} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Display Schedule',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />

                <Stack.Screen name="edit-schedule-list" component={EditScheduleList} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Edit Schedule',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />


                <Stack.Screen name='add-schedule' component={AddSchedule} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Add Schedule',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF',
                    headerRight: () =>
                        <TouchableOpacity
                            style={{ marginRight: 25 }}
                            onPress={() => {
                                addScheduleApi()
                            }}
                            color="#2377bf">
                            <Image style={{ width: 20, height: 20 }} source={Tick}></Image>
                        </TouchableOpacity>

                }} />

                <Stack.Screen name="remove-schedule-list" component={RemoveSchedule} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Remove Schedule',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />

                <Stack.Screen name="inprocess-schedule-list" component={InProcessSchedule} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'In-process',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }}/>

                <Stack.Screen name='grade-list' component={GradeList} options={{
                    headerStyle: {
                        backgroundColor: '#039be6',
                    },
                    headerTitle: 'Grade',
                    headerTitleStyle: {
                        color: '#FFFFFF'
                    },
                    headerTintColor: '#FFFFFF'
                }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default IndexComponent;