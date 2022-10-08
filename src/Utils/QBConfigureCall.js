import { NativeEventEmitter } from 'react-native'
import QB from 'quickblox-react-native-sdk'

const emitter = new NativeEventEmitter(QB.webrtc)

function configureCall() {
    

function onCall (event) {
  const {
    type, // "@QB/CALL"
    payload
  } = event
  const {
    userId, // id of QuickBlox user
    session, // incoming (new) session
    userInfo // custom data (object)
  } = payload
  // handle as necessary

  console.log("on Call")
}

function onCallAccept (event) {
  const {
    type, // "@QB/ACCEPT"
    payload
  } = event
  const {
    userId, // id of QuickBlox user
    session, // session
    userInfo // custom data (object)
  } = payload
  // handle as necessary

  console.log("call accepted")
}

function onHangUp (event) {
  const {
    type, // "@QB/HANG_UP"
    payload
  } = event
  const {
    userId, // id of QuickBlox user
    session, // session
    userInfo // custom data (object)
  } = payload
  // handle as necessary

  console.log("on Hang")
}

function onNotAnswer (event) {
  const {
    type, // "@QB/NOT_ANSWER"
    payload
  } = event
  const {
    userId, // id of QuickBlox user
    session // session
  } = payload
  // handle as necessary


  console.log("on Not answer")
}

function onReject (event) {
  const {
    type, // "@QB/REJECT"
    payload
  } = event
  const {
    userId,  // id of QuickBlox user
    session, // session
    userInfo // custom data (object)
  } = payload
  // handle as necessary
  console.log("on Reject")
}

function onCallEnd (event) {
  const {
    type, // "@QB/CALL_END"
    payload
  } = event
  const {
    session // session
  } = payload
  // handle as necessary
  console.log("on Call end")
}

function onVideoTrackReceived (event) {
  const {
    type, // "@QB/RECEIVED_VIDEO_TRACK"
    payload
  } = event
  const {
    userId,   // id of QuickBlox user
    sessionId // id of QuickBlox WebRTC session
  } = payload
  // handle as necessary

  console.log("on Video Track received")
}

function onPeerStateChanged (event) {
  const {
    type, // "@QB/PEER_CONNECTION_STATE_CHANGED"
    payload
  } = event
  const {
    userId, // id of QuickBlox user
    session, // session
    state // new peerconnection state (one of QB.webrtc.RTC_PEER_CONNECTION_STATE)
  } = payload
  // handle as necessary
}

const oncallListener = emitter.addListener(QB.webrtc.EVENT_TYPE.CALL, onCall)
const onCallAcceptListener = emitter.addListener(QB.webrtc.EVENT_TYPE.ACCEPT, onCallAccept)
const onHangUpListener = emitter.addListener(QB.webrtc.EVENT_TYPE.HANG_UP, onHangUp)
const onNotAnswered = emitter.addListener(QB.webrtc.EVENT_TYPE.NOT_ANSWER, onNotAnswer)
const onRejectListener = emitter.addListener(QB.webrtc.EVENT_TYPE.REJECT, onReject)
const onCallEndListener = emitter.addListener(QB.webrtc.EVENT_TYPE.CALL_END, onCallEnd)
const onVideoTrackLister = emitter.addListener(QB.webrtc.EVENT_TYPE.RECEIVED_VIDEO_TRACK, onVideoTrackReceived)
const onPeerStateChangedListener = emitter.addListener(QB.webrtc.EVENT_TYPE.PEER_CONNECTION_STATE_CHANGED, onPeerStateChanged)

}

const  removeEmitter = () => {
  // emitter.removeSubscription(oncallListener)
emitter.remove(QB.webrtc.EVENT_TYPE.CALL)

emitter.remove(QB.webrtc.EVENT_TYPE.ACCEPT)

emitter.remove(QB.webrtc.EVENT_TYPE.HANG_UP)

emitter.remove(QB.webrtc.EVENT_TYPE.NOT_ANSWER)

emitter.remove(QB.webrtc.EVENT_TYPE.REJECT)

emitter.remove(QB.webrtc.EVENT_TYPE.CALL_END)

emitter.remove(QB.webrtc.EVENT_TYPE.RECEIVED_VIDEO_TRACK)

emitter.remove(QB.webrtc.EVENT_TYPE.PEER_CONNECTION_STATE_CHANGED)
}

export {configureCall, removeEmitter}