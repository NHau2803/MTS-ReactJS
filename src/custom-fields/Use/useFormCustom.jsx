import studentApi from 'api/Student';
import teacherApi from 'api/Teacher';
import teamApi from 'api/Team';
import topicApi from 'api/Topic';
import { initialFValuesDeadlinesDefault } from 'constants/InitialValues';
import { TYPE } from 'constants/Type/type';
import { useEffect, useState } from 'react'
import { getStudentObject, getTeacherObject, getTeamObject, getTopicObject } from 'utils/getObject';

export function useFormCustom(initialFValuesDefault, isAddMode, type , id, validateOnChange = false, validate) {

    const [values, setValues] = useState(isAddMode ? initialFValuesDefault : []);
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [notFound, setNotFound] = useState(false);
    
    useEffect(()=>{
        if(isAddMode)
        {
            console.log('add mode!')
        }
        else{
            const setValueOjb=(result, funcGetObj)=>{
                if(result.errorMessage===null)
                {
                    let object = funcGetObj(result.result);
                    console.log(object);
                    setValues(object);
                }
                else{
                    setValues(initialFValuesDefault);
                    setNotify({
                        isOpen: true,
                        message: result.errorMessage,
                        type: 'error'
                    });
                    setNotFound(true);
                }
            }
            const getInfo=async ()=>{
                console.log(type);
                switch(type){
                    case TYPE.STUDENT:
                        const studentResult=await studentApi.find(id)
                        setValueOjb(studentResult,getStudentObject)
                        break;
                    case TYPE.TEACHER:
                        const teacherResult=await teacherApi.find(id)
                        setValueOjb(teacherResult,getTeacherObject)
                        break;
                    case TYPE.TEAM:
                        const teamResult=await teamApi.find(id)
                        setValueOjb(teamResult,getTeamObject)
                        break;
                    case TYPE.TOPIC:
                        const topicResult=await topicApi.find(id)
                        setValueOjb(topicResult,getTopicObject)
                        break;
                    case TYPE.ACCOUNT:
                        setValues({
                            username: '',
                            passwordOld: '',
                            passwordNew: '',
                            passwordConfirm: '',
                        })     
                        break;
                    // case TYPE.DEADLINE:
                    //     setValues(initialFValuesDeadlinesDefault)     
                    //     break;
                    default:
                        setValues([]);
                        setNotFound(true);
                        break;
                }
            }
            getInfo()
        }
    },[])

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange){
            validate({ [name]: value })
        }
    }

    const onReset = () => {
        setValues(initialFValuesDefault);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        notify,
        setNotify,
        notFound,
        handleInputChange,
        onReset
    }
}



