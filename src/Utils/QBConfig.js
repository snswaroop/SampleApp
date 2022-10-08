import QB from 'quickblox-react-native-sdk'
import { NativeEventEmitter } from 'react-native'

const appSettings = {
    appId: '97689',
    authKey: 'g2E5Cfa4JrbOpyn',
    authSecret: '5c2vHjkgQC626hL',
    accountKey: 'GsQxUyixv2VTQhNV7Pys',
};

const setupQB = () => {
    QB.settings
        .init(appSettings)
        .then(function () {
            // SDK initialized successfully
        })
        .catch(function (e) {
            // Some error occurred, look at the exception message for more details
            console.log(e)
        });
}

const loginToQB = async (username, password) => {
    const loginParams = {
        login: username,
        password: password
    };




    return await QB.auth
        .login(loginParams)
        .then(function (info) {
            // signed in successfully, handle info as necessary
            // info.user - user information
            // info.session - current session

            

            const chatParams = {
                userId: info.user.id,
                password: loginParams.password
            }

            if (QB.chat.isConnected) {

                QB.chat.isConnected().then(function(connected) {
                    if (connected === false) {
                    }else {
                        initializeWebRTC()
                    }
                })
                
            }
            else {
            QB.chat
                .connect(chatParams)
                .then(function (response) {
                    // connected successfully
                    initializeWebRTC()
                })
                .catch(function (e) {
                    // some error occurred
                    console.log(e)
                    // initializeWebRTC()
                });
            }

            

            return info;
        })
        .catch(function (e) {
            // handle error
            return e
        });
}

const registerToQB = async (fullname, email, loginId, password, phone, tag) => {

    const createUserParams = {
        email: email,
        fullName: fullname,
        login: loginId,
        password: password,
        phone: phone,
        tags: [tag]
    };

    return await QB.users.create(createUserParams).then(function (user) {
        return user
    }).catch(function (e) {
        console.log(e)
        return e
    })
}

const initializeWebRTC = () => {
    QB.webrtc.init().then(function(response) {
        console.log(response)
    }).catch(function(error) {
    }) 
}


export { setupQB, loginToQB, registerToQB, initializeWebRTC }