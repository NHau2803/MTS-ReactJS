import React from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import studentApi from 'api/Student';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'styles/Color';
import Button from 'custom-fields/Button';
import Notification from 'custom-fields/Notification';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';
import { initialValuesAccountDefault} from 'constants/InitialValues';
import { TYPE } from 'constants/Type/type';
import { getStudentCreateObject, getStudentUpdateObject } from 'utils/getObject';
import { useFormStyles } from 'styles/Form';

export default function UpdateAccountPage(props) {

    const classes = useFormStyles();
    const { studentId } = useParams();
    const {history} = props;
    const isAddMode = !studentId;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('passwordOld' in fieldValues)
            temp.passwordFirst = fieldValues.passwordOld ? (fieldValues.passwordOld.length > 8 ? "" : "Password must be geater than 8") : "This field is required"
        if ('passwordFirst' in fieldValues)
            temp.passwordFirst = fieldValues.passwordFirst ? (fieldValues.passwordFirst.length > 8 ? "" : "Password must be geater than 8") : "This field is required"
        if ('passwordLast' in fieldValues)
            temp.passwordLast = fieldValues.passwordLast ? (fieldValues.passwordLast === fieldValues.passwordFirst ? "" : "Password do not match ") : "This field is required"

        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }


    const {
        values,
        errors,
        setErrors,
        notify,
        setNotify,
        notFound,
        handleInputChange,
        onReset
    } = useFormCustom(initialValuesAccountDefault, false, TYPE.ACCOUNT, studentId, true, validate);

    console.log(values);

    const handleSubmit = e => {
        //add or update 
        e.preventDefault();
        
        if(isAddMode){

            const studentCreate = getStudentCreateObject(values);
            studentApi.create(studentCreate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Create Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/student'), 1500);
                    
                }else{
                    setNotify({
                        isOpen: true,
                        message: "Sorry, Create Unsuccessfully",
                        type: "error"
                    });
                }
            });

        }else{

            const studentUpdate = getStudentUpdateObject(values);
            studentApi.update(studentId, studentUpdate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Update Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/student'), 1500);
                    
                }else{
                    setNotify({
                        isOpen: true,
                        message: "Sory, Update Unsuccessfully",
                        type: "error"
                    });
                }
            });
        }

    }
    return (
        <div className={classes.root} >
        <FormGroup onSubmit={handleSubmit}>

            <FormLabel>
                <h1>Update Password</h1>
            </FormLabel>
            
            <Grid container className={classes.grid}>
            
                <Grid item xs={12} sm={3} className={classes.gridRight}>
                    <FormGroup>
             
                    <Input
                        label={values.username || ""}
                        onChange={handleInputChange}
                        error={errors.username}
                        disabled={true}
                    />
                   <br/>
                    <Input
                        label="Password Old"
                        value={values.passwordOld || ""}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <br/>
                    <Input
                        label="Password New"
                        value={values.passwordFirst || ""}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <br/>
                    <Input
                        label="Confirm Password"
                        value={values.passwordLast || ""}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    </FormGroup>
                </Grid>
            
            </Grid>
            <Grid item xs={12} className={classes.submit}>
                <Button
                    type="submit"
                    text={"Update"} 
                    startIcon={<UpdateIcon />}
                    onClick={handleSubmit}
                    background = {SET_BACKGROUND_COLOR_PRIMARY_DARK}
                    disabled={notFound ? true : false}
                />
                <Button
                    text="Reset"
                    color="default"
                    startIcon={<RefreshIcon />}
                    onClick={onReset} 
                />
            </Grid>
            </FormGroup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}




