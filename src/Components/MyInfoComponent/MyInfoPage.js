import React, {useEffect} from "react";
import {Text, View, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

const MyInfoPage = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state);
    const user = useSelector(state => state.loginReducer.user)
    const commonState = useSelector(state => state.commonReducer)


    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({type: 'USER_INFO', payload: user})
    }, [user])


    return (
        <View style={{flex: 1}}>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 30, position: 'relative'}}>

            {/* id section */}
            <View style={{width: '100%', flexDirection: 'row'}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>UserId:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.id}</Text>
                </View>
            </View>

            {/* User name section */}
            <View style={{width: '100%', flexDirection: 'row', marginTop: 25}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>User Name:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.userName}</Text>
                </View>
            </View>

            {/* First name section */}
            <View style={{width: '100%', flexDirection: 'row', marginTop: 25}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>First Name:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.firstName}</Text>
                </View>
            </View>

            {/* Last name section */}
            <View style={{width: '100%', flexDirection: 'row', marginTop: 25}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>Last Name:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.lastName}</Text>
                </View>
            </View>

            {/* phone number section section */}
            <View style={{width: '100%', flexDirection: 'row', marginTop: 25}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>Phone Number:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.telephone}</Text>
                </View>
            </View>


            {/* Address section */}
            <View style={{width: '100%', flexDirection: 'row', marginTop: 25}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>Address:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.address}</Text>
                </View>
            </View>

            {/* Email section */}
            <View style={{width: '100%', flexDirection: 'row', marginTop: 25}}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontWeight: '500', fontSize: 16, color: '#888888'}}>Email:</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>{user.emailId}</Text>
                </View>
            </View>
        </View>

        {
          commonState.isLoading && <View style={{backgroundColor: '#88888888', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

          <View style={{backgroundColor: '#FFFFFF', width: '70%', height: 150, justifyContent: 'center', borderRadius: 10, alignItems: 'center', marginBottom: 150}}>
            <ActivityIndicator size="large" color="#039be6" />
            <Text style={{marginTop: 15, color: '#222222'}}>Loading...</Text>
          </View>
        </View>
        }

        </View>
    )
}

export default MyInfoPage;