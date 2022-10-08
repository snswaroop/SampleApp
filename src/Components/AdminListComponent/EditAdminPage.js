import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native'

const EditAdminPage = (props) => {

    const user = props.user

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const commonState = useSelector(state => state.commonReducer)

    const updateFields = (key, value) => {

        dispatch({ type: 'UPDATE_ADMIN', payload: { key: key, value: value } })
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


    return <View style={{ flex: 1 }}>
        <ScrollView>
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 15 }}>

                {/* id section */}
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>UserId:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#666666' }}>{user.id}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>User Name:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#C8C8C8', color: '#222222' }} value={user.userName} editable={false} />

                    </View>
                </View>


                {/* First name section */}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>First Name:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#898989', color: '#222222' }} value={user.firstName} editable={true} onChangeText={(text) => { updateFields("firstName", text) }} />
                    </View>
                </View>

                {/* Last name section */}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Last Name:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#898989', color: '#222222' }} value={user.lastName} editable={true} onChangeText={(text) => { updateFields("lastName", text) }} />
                    </View>
                </View>

                {/* phone number section section */}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Phone Number:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#898989', color: '#222222' }} value={user.telephone} editable={true} onChangeText={(text) => { updateFields("telephone", text) }} />
                    </View>
                </View>

                {/* Email section */}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Email:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#898989', color: '#222222' }} value={user.emailId} editable={true} onChangeText={(text) => { updateFields("emailId", text) }} />
                    </View>
                </View>

                {/* Email section */}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Alt Email:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#898989', color: '#222222' }} value={user.aliasMailId} editable={true} onChangeText={(text) => { updateFields("aliasMailId", text) }} />
                    </View>
                </View>


                {/* Address section */}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#888888' }}>Address:</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#898989', color: '#222222' }} value={user.address} editable={true} onChangeText={(text) => { updateFields("address", text) }} />
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
}

const mapToProps = (state) => {
    return {
        user: { id: state.adminReducer.id, userName: state.adminReducer.userName, firstName: state.adminReducer.firstName, lastName: state.adminReducer.lastName, telephone: state.adminReducer.telephone, emailId: state.adminReducer.emailId, aliasMailId: state.adminReducer.aliasMailId, skypeId: state.adminReducer.skypeId, password: state.adminReducer.password, address: state.adminReducer.address }
    }
}

export default connect(mapToProps)(EditAdminPage);