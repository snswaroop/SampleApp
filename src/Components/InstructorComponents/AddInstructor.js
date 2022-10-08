import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


const AddInstructor = ({ navigation }) => {

    const [userName, setUserName] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [emailId, setEmailId] = useState()
    const [altEmail, setAltEmailId] = useState()
    const [skypeId, setSkypeId] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const state = useSelector(state => state.instructorReducer)
    const commonState = useSelector(state => state.commonReducer)

    const dispatch = useDispatch();

    const onTextChange = (key, value) => {
        if (key === 'password') {
            setShowErrorMessage(false)
        }
        dispatch({ type: "ADD_INSTRUCTOR", payload: { key: key, value: value } })
    }

    useEffect(() => {
        if (commonState.successMessage) {
            navigation.goBack();
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

    const onBlurChange = () => {
        if (state.password.length > 0) {
            setShowErrorMessage(false)
        }
        else {
            setShowErrorMessage(true)
        }
    }

    const onFocusChanged = () => {
        if (state.password.length > 0) {
            setShowErrorMessage(false)
        }
        else {
            setShowErrorMessage(true)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15 }}>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>User Name :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={userName} editable={true} onChangeText={(text) => { onTextChange('userName', text) }} />
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>First Name :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={firstName} editable={true} onChangeText={(text) => { onTextChange('firstName', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Last Name :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={lastName} editable={true} onChangeText={(text) => { onTextChange('lastName', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>phoneNumber :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={phoneNumber} editable={true} keyboardType='numeric' onChangeText={(text) => { onTextChange('telephone', text) }} />
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>emailId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={emailId} editable={true} onChangeText={(text) => { onTextChange('emailId', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Alt EmailId :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={altEmail} editable={true} onChangeText={(text) => { onTextChange('aliasMailId', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Skype Id :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={skypeId} editable={true} onChangeText={(text) => { onTextChange('skypeId', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Address :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={address} editable={true} onChangeText={(text) => { onTextChange('address', text) }} />

                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Password :</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <TextInput secureTextEntry style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }} value={password} editable={true} onChangeText={(text) => { onTextChange('password', text) }} onBlur={onBlurChange} onFocus={onFocusChanged} />
                            { showErrorMessage ? <Text style={{fontSize: 14, color: '#000000', fontWeight: '700', marginTop: 10 }}>*Password cannot be empty.</Text> : null }
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

            {
                commonState.errorMessage && <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#555555', borderRadius: 20 }}>
                    <Text style={{ color: '#FFFFFF' }}>{commonState.errorMessage}</Text>
                </View> 
            }
        </View>
    )
}

export default AddInstructor;