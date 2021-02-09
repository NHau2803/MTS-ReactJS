import React from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import RadioGroup from 'custom-fields/RadioGroup';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import studentApi from 'api/Student/studentApi';
import { getNameFromFullName } from 'utils/converter';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'constants/color';
import Button from 'custom-fields/Button';
import Checkbox from 'custom-fields/Checkbox';
import FacultyListAPI from 'api/Select/facultyList';
import Notification from 'custom-fields/Notification';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';
import {GENDER_LIST, initialValuesStudentDefault, LIST_DEFAULT} from 'constants/initialValues';
import { TYPE } from 'constants/type';
import { getStudentCreateObject, getStudentUpdateObject } from 'utils/getObject';
import { useFormStyles } from 'styles';

export default function AddEditPage(props) {

    const classes = useFormStyles();
    const { studentId } = useParams();
    const {history} = props;
    const isAddMode = !studentId;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? (fieldValues.password.length > 8 ? "" : "Password must be geater than 8") : "This field is required"

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
    } = useFormCustom(initialValuesStudentDefault, isAddMode, TYPE.STUDENT, studentId, true, validate);

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
                {isAddMode 
                ? <h1>Create a Student</h1>
                : <h1>Update Student</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
            
                <Grid item xs={12} sm={3} className={classes.gridLeft}>
                    <FormGroup>
                    <Input
                        name="code"
                        label="Code"
                        placeholder="Ex: 197CT11122"
                        value={values.code || ""}
                        onChange={handleInputChange}
                        error={errors.code}
                        disabled={
                            !isAddMode
                            ? true
                            : false
                        }
                    />
                    <br/>
                    <Input
                        name="name"
                        label="Name"
                        placeholder="Ex: Nguyễn Văn An"
                        value={values.name || ""}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <br/>
                    <RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender || "MALE"}
                        onChange={handleInputChange}
                        items={GENDER_LIST}
                    />
                    <br/>
                    <DatePicker
                        name="birthday"
                        label="Birthday"
                        value={values.birthday || new Date()}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <Input
                        name="phone"
                        label="Phone"
                        placeholder="Ex: 0946111222"
                        value={values.phone || ""}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <br/>
                    </FormGroup>

                </Grid>
                <Grid item xs={12} sm={3} className={classes.gridRight}>
                    <FormGroup>
                     
                    <Select
                        name="facultyId"
                        label="Faculty"
                        value={values.facultyId || ""}
                        onChange={handleInputChange}
                        options={FacultyListAPI() || LIST_DEFAULT()}
                        error={errors.facultyId}
                    />
                    <br/>
                    <Input
                        name="email"
                        label="Email"
                        placeholder="Ex: an.197CT11122@vanlanguni.vn"
                        value={
                            ! isAddMode
                            ? values.email = values.email || ""
                            :
                                values.tickDefaultEmail 
                                ? values.email = getNameFromFullName(values.name)+ "." + values.code + "@vanlanguni.vn" 
                                : values.email 
                            
                        }
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={values.tickDefaultEmail}
                    />
                    <Checkbox
                        name="tickDefaultEmail"
                        label="Default"
                        value={values.tickDefaultEmail || false}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="username"
                        label="Username"
                        placeholder="Ex: an.197CT11122"
                        value={
                            !isAddMode
                            ? values.username || ""
                            : 
                                values.tickDefaultUsername 
                                ? values.username = getNameFromFullName(values.name)+ "." + values.code 
                                : values.username
                            
                            }
                        onChange={handleInputChange}
                        error={errors.username}
                        disabled={
                                !isAddMode
                                ? true
                                : values.tickDefaultUsername
                            }
                    />
                    <Checkbox 
                        name="tickDefaultUsername"
                        label="Default"
                        value={values.tickDefaultUsername || false}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={
                            !isAddMode 
                            ? values.password || ""
                            :
                                values.tickDefaultPassword 
                                ? values.password = values.code
                                : values.password
                           
                            }
                        onChange={handleInputChange}
                        error={errors.password}
                        disabled={
                            !isAddMode
                            ? true
                            : values.tickDefaultPassword
                        }
                    
                    />
                    <Checkbox
                        name="tickDefaultPassword"
                        label="Default"
                        value={values.tickDefaultPassword || false}
                        onChange={handleInputChange}
                    />

                    </FormGroup>
                </Grid>
            
            </Grid>
            <Grid item xs={12} className={classes.submit}>
                <Button
                    type="submit"
                    text={isAddMode ? "Save": "Update"} 
                    startIcon={isAddMode ? <SaveIcon />: <UpdateIcon />}
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




