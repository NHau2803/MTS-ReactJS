
export const GENDER_LIST = [
    { id: 'MALE', title: 'Male' },
    { id: 'FEMALE', title: 'Female' },
]

// For Select Fields
export const LIST_DEFAULT = () => ([
    { "id": 1, "title": '' },
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

