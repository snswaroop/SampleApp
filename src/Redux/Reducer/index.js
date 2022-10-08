import { combineReducers } from "redux";
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

import loginReducer from "./LoginReducer";
import AdminReducer from "./AdminReducer";
import InstructorReducer from "./InstructorReducer";
import CommonReducer from "./CommonReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from '../sagas/index';
import StudentReducer from "./StudentReducer";
import SubjectReducer from "./SubjectReducer";
import QBReducer from "./QBReducer";
import EnrollmentReducer from "./EnrollmentReducer";
import ScheduleReducer from "./ScheduleReducer";

const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({
    loginReducer: loginReducer,
    adminReducer: AdminReducer,
    instructorReducer: InstructorReducer,
    studentReducer: StudentReducer,
    subjectReducer: SubjectReducer,
    enrollmentReducer: EnrollmentReducer,
    commonReducer: CommonReducer,
    QBReducer: QBReducer,
    scheduleReducer: ScheduleReducer
})

const store = configureStore({
    middleware: [sagaMiddleware],
    reducer
})


sagaMiddleware.run(rootSaga);

export default store;