import {all} from 'redux-saga/effects'
import loginSaga from './LoginSaga'
import adminSaga from './AdminSagas'
import instructorSaga from './InstructorSaga'
import studentSaga from './StudentSagas'
import subjectSagas from './SubjectSaga'
import enrollmentSagas from './EnrollmentSagas'
import scheduleSagas from './ScheduleSagas'
import gradeSagas from './GradeSagas'

function* rootSaga() {
    yield all([
        loginSaga(),
        adminSaga(),
        instructorSaga(),
        studentSaga(),
        subjectSagas(),
        enrollmentSagas(),
        scheduleSagas(),
        gradeSagas()

    ])
}

export default rootSaga;