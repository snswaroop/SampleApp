
const initialState = {
    scheduleLists: [],
    scheduleListsBySubject: [],
    taskId: 0,
    schedule: 0,
    topic: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    scheduleNavigation: '',
    Topic:'',
    Description:'',
    StartDateTime: '',
    EndDateTime: '',
    RepeatTask: '',
    mlaGrade: [],
    isResponseSuccess: false,
}

const ScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_DISPLAY_SCHEDULE':
            return { ...state, scheduleLists: action.list, isResponseSuccess: false }

        case 'LIST_INPROCESS_SCHEDULE':
            return { ...state, scheduleLists: action.list, isResponseSuccess: false }

        case 'UPDATE_SCHEDULE_TASK': {
            return { ...state, [action.payload.key]: action.payload.value }
        }    

        case 'ADD_SCHEDULE': {
            return { ...state, [action.payload.key]: action.payload.value}
        }

        case 'LIST_SCHEDULES_BY_SUBJECT':
            return { ...state, scheduleListsBySubject: action.list, isResponseSuccess: false }

        case 'DELETE_SCHEDULE_TASK':
            return { isResponseSuccess: false }
    }

    return state;
}

export default ScheduleReducer;