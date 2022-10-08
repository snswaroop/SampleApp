import React, { useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view';
import Pencil from '../../Assests/draw.png';
import Delete from '../../Assests/delete.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const AdminListPage = ({ navigation }) => {

    const dispatch = useDispatch();
    const adminDetails = useSelector(state => state.adminReducer)

    const commonState = useSelector(state => state.commonReducer)

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_ADMIN' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_ADMIN' })
    }, [adminDetails.isResponseSuccess])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_ADMIN' })
    }, [commonState.successMessage])





    const editAdmin = (item) => {
        dispatch({ type: 'UPDATE_STATES', payload: item })
        navigation.navigate('edit-admin')
    }

    const addAdmin = () => {
        navigation.navigate('add-admin');
    }

    const deleteAdmin = (data) => {
        dispatch({ type: 'DELETE_ADMIN', id: data.item.id })
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, position: 'relative' }}>
                {
                    adminDetails.adminList.length > 0 ? <SwipeListView
                        data={adminDetails.adminList}
                        keyExtractor={(item) => item.id}
                        renderItem={(data, rowMap) => {

                            return <View style={{ backgroundColor: '#DDDDDD', paddingBottom: 1, }}>
                                <View style={{ backgroundColor: '#FAFAFA', paddingLeft: 8, paddingTop: 8, paddingBottom: 8 }}>
                                    <View style={{ padding: 4, }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <Text style={{ color: '#222222', fontSize: 16 }}>Name: </Text>
                                                    <Text style={{ color: '#222222', fontSize: 16, fontWeight: '600' }}>{data.item.firstName} {data.item.lastName}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', flex: 1, marginTop: 5 }}>
                                                    <Text style={{ color: '#222222', fontSize: 16 }}>User Name: </Text>
                                                    <Text style={{ color: '#222222', fontSize: 16, fontWeight: '600' }}>{data.item.userName}</Text>
                                                </View>
                                            </View>

                                        </View>

                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 8 }}>
                                            <Text style={{ color: '#222222', fontSize: 16 }}>Email Id: </Text>
                                            <Text style={{ color: '#222222', fontSize: 16, fontWeight: '600' }}>{data.item.emailId}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        }}
                        rightOpenValue={-90}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>
                                <View style={{ flexDirection: 'row', backgroundColor: '#2377bf', height: '100%' }}>
                                    <TouchableHighlight onPress={() => { editAdmin(data.item) }} underlayColor='#2377bf' style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
                                        <Image source={Pencil} style={{ height: 22, width: 22 }} />
                                    </TouchableHighlight>

                                    <TouchableHighlight style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { deleteAdmin(data) }}>
                                        <Image source={Delete} style={{ height: 25, width: 25 }} />
                                    </TouchableHighlight>

                                </View>
                            </View>
                        )}
                    /> : <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={{ fontWeight: '500' }}>No Students List found</Text>
                    </View>

                }

                <Pressable onPress={addAdmin} style={{ backgroundColor: '#2377bf', width: 50, height: 50, alignSelf: 'flex-end', borderRadius: 30, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 30, right: 30 }}>
                    <Text style={{ color: '#FFFFFF', fontWeight: '300', fontSize: 30, }}>+</Text>
                </Pressable>
            </View>
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
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 15,
        alignItems: 'flex-end',
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: '#FAFAFA',
        height: '100%',
        paddingBottom: 1
    }
})

export default AdminListPage;