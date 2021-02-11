import studentApi from 'api/Student';
import teacherApi from 'api/Teacher';
import teamApi from 'api/Team';
import { TYPE } from 'constants/Type/type';
import { useEffect, useState } from 'react'
import { getStudentObject, getTeacherObject, getTeamObject } from 'utils/getObject';

export function useFormCustom(initialFValuesDefault, isAddMode, type , id, validateOnChange = false, validate) {

    const [values, setValues] = useState(isAddMode ? initialFValuesDefault : []);
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [notFound, setNotFound] = useState(false);

    function getInfo(){
        console.log(isAddMode);
        console.log(type);
        switch(type){

            case TYPE.STUDENT:
                studentApi.find(id).then(res => {
                    if(res.errorMessage === null){
                        let object = getStudentObject(res.result);
                        console.log(object);
                        setValues(object);
                    }else{
                        setValues(initialFValuesDefault);
                        setNotify({
                            isOpen: true,
                            message: res.errorMessage,
                            type: 'error'
                        });
                        setNotFound(true);
                    }
                });
                break;
            
            case TYPE.TEACHER:
                teacherApi.find(id).then(res => {
                    if(res.errorMessage === null){
                        let object = getTeacherObject(res.result);
                        console.log(object);
                        setValues(object);
                    }else{
                        setValues(initialFValuesDefault);
                        setNotify({
                            isOpen: true,
                            message: res.errorMessage,
                            type: 'error'
                        });
                        setNotFound(true);
                    }
                });
                break;

                case TYPE.TEAM:
                    teamApi.find(id).then(res => {
                        if(res.errorMessage === null){
                            let object = getTeamObject(res.result);
                            console.log(object);
                            setValues(object);
                        }else{
                            setValues(initialFValuesDefault);
                            setNotify({
                                isOpen: true,
                                message: res.errorMessage,
                                type: 'error'
                            });
                            setNotFound(true);
                        }
                    });
                    break;

            default:
                setValues([]);
                setNotFound(true);
                break;

        }
        
        
    }

    useEffect(isAddMode? ()=>{console.log('add mode!')} : () => { getInfo(); }, []);
      
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
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



