
/***************************STUDENT**************************************/
export const getStudentObject = (result) => {
    return {
        id: result.id,
        code: result.code,
        name: result.name,
        gender: String(result.gender),
        birthday: new Date(result.birthday),
        email: result.email,
        tickDefaultEmail: false,
        phone: result.phone,
        facultyId: Number(result.facultyId),
        username: 'Not Allow',
        tickDefaultUsername: true,
        password: 'Not Allow',
        tickDefaultPassword: true
    }
}

export const getStudentCreateObject = (values) => {
    return {
        code: values.code,
        name: values.name,
        gender: values.gender.toUpperCase(),
        birthday:values.birthday.toISOString(),
        email: values.email,
        phone: values.phone,
        facultyId: values.facultyId,
        username: values.username,
        password: values.password,
    }
}

export const getStudentUpdateObject = (values) => {
    return {
        id: values.id,
        code: values.code,
        name: values.name,
        gender: values.gender.toUpperCase(),
        birthday:values.birthday.toISOString(),
        email: values.email,
        phone: values.phone,
        facultyId: values.facultyId,
    }
}



/***************************TEACHER**************************************/

export const getTeacherCreateObject = (values) => {
    return {
        code: values.code,
        name: values.name,
        gender: values.gender.toUpperCase(),
        birthday:values.birthday.toISOString(),
        email: values.email,
        phone: values.phone,
        academyId: values.academyId,
        positionId: values.positionId,
        facultyId: values.facultyId,
        username: values.username,
        password: values.password,
    }
}

export const getTeacherUpdateObject = (values) => {
    return {
        id: values.id,
        code: values.code,
        name: values.name,
        gender: values.gender.toUpperCase(),
        birthday:values.birthday.toISOString(),
        email: values.email,
        phone: values.phone,
        academyId: values.academyId,
        positionId: values.positionId,
        facultyId: values.facultyId,
    }
}

export const getTeacherObject = (result) => {
    return {
        id: result.id,
        code: result.code,
        name: result.name,
        gender: String(result.gender),
        birthday: new Date(result.birthday),
        email: result.email,
        tickDefaultEmail: false,
        phone: result.phone,
        academyId: Number(result.academyId),
        positionId: Number(result.positionId),
        facultyId: Number(result.facultyId),
        username: 'Not Allow',
        tickDefaultUsername: true,
        password: 'Not Allow',
        tickDefaultPassword: true
    }
}


/***************************TEAM**************************************/

export const getTeamCreateObject = (values) => {
    return {
       name: values.name,
       topicId: values.topicId
    }
}

export const getTeamUpdateObject = (values) => {
    return {
       id: values.id,
       name: values.name,
       topicId: values.topicId
    }
}

export const getTeamObject = (result) =>{
    return {
        id: result.id,
        name: result.name,
        topicId: result.topicId,
        topicName: result.topicName
    }
}


/***************************TOPIC**************************************/


export const getTopicObject = (result) =>{
    return {
        id: result.id,
        code: result.code,
        name: result.name,
        startTime: new Date(result.startTime),
        endTime: new Date(result.endTime),
        facultyId: Number(result.facultyId),
        teacherId: Number(result.teacherId),
        typeTopicId: Number(result.typeTopicId),
        deadlines: result.deadlines
    }
}

export const getTopicCreateObject = (values, deadlines) => {

    const newDeadlines = deadlines.map(deadline => {
        deadline["startDeadline"] = new Date(deadline.startDeadline).toISOString()
        deadline["endDeadline"] = new Date(deadline.endDeadline).toISOString()
        return deadline;
    })  

    return {
        id: values.id,
        code: values.code,
        name: values.name,
        startTime: new Date(values.startTime).toISOString(),
        endTime: new Date(values.endTime).toISOString(),
        facultyId: 1, // need data of teacher when login
        teacherId: 1,
        typeTopicId: Number(values.typeTopicId),
        deadlines: newDeadlines
    }
}

// export const getDeadlinesCreateObject = (deadlines) => {

//     const newDeadlines = deadlines.map(deadline => {
//         deadline["startDeadline"] = new Date(deadline.startDeadline).toISOString()
//         deadline["endDeadline"] = new Date(deadline.endDeadline).toISOString()
//         return deadline;
//     })  
//    return newDeadlines
// }


/***************************ANALYSIS**************************************/


export const getAnalysisGenderObject = (result) =>{
    return [
        {
            name: "Male",
            value: result.PercentMale,
            total: result.male,
        },
        {
            name: "Female",
            value: result.PercentFemale,
            total: result.female,
        },
    ];
}
export const getAnalysisActiveObject = (result) =>{
    return [
        {
            name: "Active",
            value: result.PercentActive,
            total: result.active,
        },
    ];
}

export const getAnalysisTotalObject = (result) =>{
    return [
        {
            name: "Active",
            value: result.PercentActive,
            total: result.active,
        },
    ];
}