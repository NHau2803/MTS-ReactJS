
export const GENDER_LIST = [
    { id: 'MALE', title: 'Male' },
    { id: 'FEMALE', title: 'Female' },
]

// For Select Fields
export const LIST_DEFAULT = () => ([
    { "id": 1, "title": '' },
])

export const LIST_ROLES = () => ([
    { "id": 1, "title": 'STUDENT' },
    { "id": 1, "title": 'TEACHER' },
    { "id": 1, "title": 'ADMIN' },
    { "id": 1, "title": 'ACCOUNTANT' },
])

export const initialValuesStudentDefault = {
    id: 0,
    code: '',
    name: '',
    gender: 'MALE',
    birthday: new Date('01/01/2021'),
    tickDefaultEmail: true,
    email: '',
    phone: '',
    facultyId: '',
    username: '',
    tickDefaultUsername: true,
    password: '',
    tickDefaultPassword: true
}

export const initialValuesTeacherDefault = {
    id: 0,
    code: '',
    name: '',
    gender: 'MALE',
    birthday: new Date('01/01/2021'),
    tickDefaultEmail: true,
    email: '',
    phone: '',
    academyId:'',
    positionId: '',
    facultyId: '',
    username: '',
    tickDefaultUsername: true,
    password: '',
    tickDefaultPassword: true
}

export const initialFValuesTeamDefault = {
    id: 0,
    name: '',
    topicId: '',
    topicName: '',
}

export const initialFValuesTopicDefault = {
    id: 0,
    code: '',
    name: '',
    startTime: new Date('2001-01-01T12:00:00'),
    endTime: new Date('2001-01-01T12:00:00'),
    facultyId: '',
    teacherId: '',
    typeTopicId: '',
    deadlines: [
        {
            startDeadline: new Date('2001-01-01T12:00:00'),
            endDeadline: new Date('2001-01-01T12:00:00'),
            content: '',
        },

    ],
}
