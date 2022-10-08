import { StyleSheet } from "react-native";

export default StyleSheet.create({
    textinput:{
        color:'blue'
    },
    toolbar: {
        backgroundColor:'#039be6'
    },
    loginInput: {
        height: 40,
        width:'100%',
        marginBottom:20,
        // margin: 12,
        // marginRight:30,
        textAlign:'center',
        display:'flex',
        borderWidth: 1,
        padding: 10,
        fontSize:20,
        color:'black',
        // borderRadius:20,
        borderBottomColor:'#8e8e8e',
        borderColor:'transparent'
        
    },
    loginInputFocused: {
        height: 40,
        width:'100%',
        marginBottom:20,
        // margin: 12,
        // marginRight:30,
        textAlign:'center',
        display:'flex',
        borderWidth: 2,
        padding: 10,
        fontSize:20,
        color:'black',
        // borderRadius:20,
        borderBottomColor:'#43968e',
        borderColor:'transparent'
    },
    loginButton: {
        width:'100%',
        height:60,
        marginTop:20,
        // marginBottom:40,
        backgroundColor:'#2377bf',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        color: '#d2f7f4',
        fontSize:24,
    },

    buttonBlue: {
        backgroundColor:'#2377bf',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    }, 

    verticalSpacing: {
        marginTop: 8,
        marginBottom: 8,
    },

    textWhite: {
        color: '#FFFFFF'
    }
})