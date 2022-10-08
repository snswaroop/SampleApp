import React, { useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Image, TouchableHighlight, ActivityIndicator, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view';
import Pencil from '../../Assests/draw.png';
import Delete from '../../Assests/delete.png';

const SubjectListPage = ({navigation}) => {
    const dispatch = useDispatch();
    const subjectDetails = useSelector(state => state.subjectReducer)

    const commonState = useSelector(state => state.commonReducer)

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [subjectDetails.isResponseSuccess])

    useEffect(() => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'LIST_ALL_SUBJECT' })
    }, [commonState.successMessage])

    const editSubject = (item) => {
        dispatch({ type: 'UPDATE_SUBJECT_STATES', payload: item })
        navigation.navigate('edit-subject', { name: item.title})
    }

    const addSubject = () => {
        dispatch({type: 'EMPTY_DETAILS'})
        navigation.navigate('add-subject');
    }

    const deleteSubject = (data) => {
        dispatch({ type: 'LOADING' })
        dispatch({ type: 'DELETE_SUBJECT', id: data.item.subjectId })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, position: 'relative', }}>
                {
                    subjectDetails && subjectDetails.subjectList.length > 0 ? <SwipeListView
                    style={{ marginEnd: 10, marginStart: 10, marginTop: 10, marginBottom: 10 }}
                    data={subjectDetails.subjectList}
                    keyExtractor={(item) => item.subjectId}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={{
                                backgroundColor: 'transparent',
                                height: 10,
                            }}
                        />
                    }}
                    renderItem={(data, rowMap) => {

                        return <View key={data.item.subjectId} style={{ backgroundColor: '#FFFFFF', paddingLeft: 8, paddingRight: 8, paddingTop: 8, paddingBottom: 8, }}>
                            <View style={{ padding: 4 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <Text style={{ color: '#222222', fontSize: 16 }}>Title: </Text>
                                            <Text style={{ color: '#222222', fontSize: 16 }}>{data.item.title}</Text>
                                        </View>

                                        {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <Text style={{ color: '#222222', fontSize: 16 }}>User Name: </Text>
                                            <Text style={{ color: '#222222', fontSize: 16 }}>{data.item.userName}</Text>
                                        </View> */}
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', flex: 1, marginTop: 8 }}>
                                    <Text style={{ color: '#222222', fontSize: 16 }}>Description: </Text>
                                    <Text style={{ color: '#222222', fontSize: 16 }}>{data.item.description}</Text>
                                </View>

                            </View>
                        </View>
                    }}
                    rightOpenValue={-90}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack} key={data.item.subjectId}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#2377bf', height: '100%' }}>
                                <TouchableHighlight onPress={() => { editSubject(data.item) }} underlayColor='#2377bf' style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
                                    <Image source={Pencil} style={{ height: 22, width: 22 }} />
                                </TouchableHighlight>

                                <TouchableHighlight style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { deleteSubject(data) }}>
                                    <Image source={Delete} style={{ height: 25, width: 25 }} />
                                </TouchableHighlight>

                            </View>
                        </View>
                    )}
                />
                :
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <Text style={{fontWeight: '500'}}>No Subjects found</Text>
                    </View>
                }
                

                <Pressable onPress={addSubject} style={{ backgroundColor: '#2377bf', width: 50, height: 50, alignSelf: 'flex-end', borderRadius: 30, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 30, right: 30 }}>
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
    }
})

export default SubjectListPage
