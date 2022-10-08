import React, {useState, useEffect, useMemo, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,StatusBar, TextInput, ScrollView, 
  SafeAreaView, ActivityIndicator } from 'react-native';
import Globalstyles from '../../Utils/Globalstyles';
import { useSelector, useDispatch, connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { runOnJS, runOnUI, useDerivedValue } from 'react-native-reanimated';
import APIProvider from '../../Utils/APIProvider';
import axios from 'axios';
import {loginToQB} from '../../Utils/QBConfig'


const Login = (props) => {

    /**
     * credentials for admin is admin11 and Admin11@1234 with old QB format
     * 
     * credentials for Instructor is Ins4 and ins with new QB format
     * 
     */
    
    const [username, setUsername] = useState('admin11'); //Ins4
    const [password, setPassword] = useState('Admin11@1234'); //ins
    const navigation = useNavigation();
    const  [focus, setFocus] = useState(false);
    const customFont = focus ? Globalstyles.loginInputFocused : Globalstyles.loginInput;
    const customFontPassword = !focus ? Globalstyles.loginInputFocused : Globalstyles.loginInput;

    const state = useSelector(state => state.loginReducer)
    const commonState = useSelector(state => state.commonReducer)

    
    const dispatch = useDispatch();

    function onSubmitLogin() {
      // navigation.navigate('Home')
      const data = {
        UserName: username,
        Password: password
      }
      dispatch({type: 'LOADING'})
      // dispatch({type: 'SHOW_PROGRESS', payload: {isVisible: true}})
      dispatch({type: 'GET_TOKEN', payload: data});
    }

    const moveToHome = () => {
      navigation.navigate('Home')
    }

    const setUpQB = async () => {
      // password = password + + "Fe@12E"
      var result = await loginToQB(username, password)
          dispatch({type: 'QB_INFO', payload: result})
          dispatch({type: 'STOP_LOADING'})
          navigation.navigate('Home')
    }

    useEffect(() => {
        if (state.authToken) {
          setUpQB()
        }
    }, [state.authToken])


    const updateQBUserId = () => {
      if (state.qbUserId != null) {
        //update QB userId here
      }
    }

    useMemo(() => {
      updateQBUserId()
    }, [state.qbUserId])

    return(
      <View style={{flexDirection: 'column', flex: 1}}>

        <View style={{position: 'relative', marginTop: 20,}}>
            <TextInput
                style={customFont}
                onFocus={() => setFocus(true)}
                onChangeText={setUsername}
                placeholder='Enter your User Name'
                placeholderTextColor={'#7b7b7b'}
                value={username}
                autoCapitalize="none"
            />

            <TextInput
                style={customFontPassword}
                onFocus={() => setFocus(false)}
                onChangeText={setPassword}
                placeholder='Enter your Password'
                placeholderTextColor={'#7b7b7b'}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={Globalstyles.loginButton}
                onPress={onSubmitLogin}>
                    <Text style={Globalstyles.buttonText}>Log In</Text>
            </TouchableOpacity>
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


  function mapsToProps(state){
    return {users: state.loginReducer};
  }


  export default Login