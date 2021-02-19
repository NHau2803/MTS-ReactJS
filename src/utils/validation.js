
export const checkValidation = (temp, fieldValues) =>{
    if ('code' in fieldValues)
        temp.code = fieldValues.code ? "" : "This field is required."
    if ('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "This field is required."
    if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('phone' in fieldValues)
        temp.phone = fieldValues.phone ? "" : "This field is required."
    if ('facultyId' in fieldValues)
        temp.facultyId = fieldValues.facultyId.length !== 0 ? "" : "This field is required."
    if ('academyId' in fieldValues)
        temp.academyId = fieldValues.academyId.length !== 0 ? "" : "This field is required."
    if ('positionId' in fieldValues)
        temp.positionId = fieldValues.positionId.length !== 0 ? "" : "This field is required."
    if ('username' in fieldValues)
        temp.username = fieldValues.username ? "" : "This field is required."
    if ('password' in fieldValues)
        temp.password = fieldValues.password ? (fieldValues.password.length > 8 ? "" : "Password must be geater than 8") : "This field is required"
    if ('topicId' in fieldValues)
        temp.topicId = fieldValues.topicId.length !== 0 ? "" : "This field is required."
    if ('typeTopicId' in fieldValues)
        temp.typeTopicId = fieldValues.typeTopicId.length !== 0 ? "" : "This field is required."
    // if ('content' in fieldValues)
    //     temp.content = fieldValues.content.length !== 0 ? "" : "This field is required."

    
    return temp;  
}