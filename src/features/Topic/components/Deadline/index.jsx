import React from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'styles/Color';
import Button from 'custom-fields/Button';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';
import { TYPE } from 'constants/Type/type';
import { initialFValuesTopicDefault } from 'constants/InitialValues';
import Notification from 'custom-fields/Notification';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import TypeTopicListAPI from 'api/GetListForSelect/typeTopicListAPI';
import { useFormStyles } from 'styles/Form';


export default function AddEditDeadlines(props) {

    const classes = useFormStyles();
    const {history} = props;
    const { topicId } = useParams();
    const isAddMode = !topicId;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('topicId' in fieldValues)
            temp.topicId = fieldValues.topicId.length !== 0 ? "" : "This field is required."
        
        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        notify,
        setNotify,
        notFound,
        handleInputChange,
        onReset
    } = useFormCustom(initialFValuesTopicDefault, isAddMode, TYPE.DEADLINE, topicId, true, validate);
   
   const handleSubmit = e => {
    //add or update 
        e.preventDefault();
        
        // if(isAddMode){

        //     const topicCreate = gettopicCreateObject(values);
        //     topicApi.create(topicCreate).then(res=>{
        //         if(res.success){
        //             setNotify({
        //                 isOpen: true,
        //                 message: "Create Successfully",
        //                 type: "success"
        //             });
        //             setTimeout(() => history.push('/admin/topic'), 1500);
                    
        //         }else{
        //             setNotify({
        //                 isOpen: true,
        //                 message: "Sorry, Create Unsuccessfully",
        //                 type: "error"
        //             });
        //         }
        //     });

        // }else{

        //     const topicUpdate = gettopicUpdateObject(values);
        //     topicApi.update(topicId, topicUpdate).then(res=>{
        //         if(res.success){
        //             setNotify({
        //                 isOpen: true,
        //                 message: "Update Successfully",
        //                 type: "success"
        //             });
        //             setTimeout(() => history.push('/admin/topic'), 1500);
                    
        //         }else{
        //             setNotify({
        //                 isOpen: true,
        //                 message: "Sory, Update Unsuccessfully",
        //                 type: "error"
        //             });
        //         }
        //     });
        // }

    }

    return (
        <div className={classes.root}>
        <FormGroup onSubmit={handleSubmit}>
            <FormLabel>
                {isAddMode 
                ? <h1>Create Deadlines</h1>
                : <h1>Update Deadlines</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={3}>
                <FormGroup>
                   
                    <DatePicker
                        name="startTime"
                        label="Start Time"
                        value={values.startTime}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <DatePicker
                        name="endTime"
                        label="End Time"
                        value={values.endTime}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <Input
                        name="content"
                        label="Content"
                        placeholder="Ex: Nộp bài nha"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
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




