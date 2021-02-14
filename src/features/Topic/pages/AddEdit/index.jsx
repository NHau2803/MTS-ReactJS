import React, { useState } from 'react'
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
import { initialFValuesDeadlinesDefault, initialFValuesTopicDefault } from 'constants/InitialValues';
import Notification from 'custom-fields/Notification';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import TypeTopicListAPI from 'api/GetListForSelect/typeTopicListAPI';
import { useFormStyles } from 'styles/Form';
import { formatDateTime } from "utils/converter";
import AddEditDeadlines from 'features/Topic/components/Deadline';
import { set } from 'date-fns';
import DateTimePicker from 'custom-fields/DateTimePicker';


export default function AddEditPage(props) {

    const classes = useFormStyles();
    const {history} = props;
    const { topicId } = useParams();
    const isAddMode = !topicId;
    const [count, setCount] = useState(0);
    

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
    } = useFormCustom(initialFValuesTopicDefault, isAddMode, TYPE.TOPIC, topicId, true, validate);
   
    console.log(values);

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
                ? <h1>Create a Topic</h1>
                : <h1>Update Topic</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={3}>
                <FormGroup>
                    <Input
                        name="code"
                        label="Code"
                        placeholder="Ex: 197CT11122"
                        value={values.code}
                        onChange={handleInputChange}
                        error={errors.code}
                    />
                    <br/>
                    <Input
                        name="name"
                        label="Name"
                        placeholder="Ex: Nguyễn Văn An"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <br/>
                    <DateTimePicker
                        name="startTime"
                        label="Start Time"
                        value={values.startTime}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <DateTimePicker
                        name="endTime"
                        label="End Time"
                        value={values.endTime}
                        onChange={handleInputChange}
                        error={values.startTime >= values.endTime
                            ? "Invalid"
                            : ""
                        }
                    />
                    <br/>
                    <Select
                        nampe="typeTopicId"
                        label="Type Topic"
                        value={values.typeTopicId}
                        onChange={handleInputChange}
                        options={TypeTopicListAPI() || ""}
                        error={errors.typeTopicId}
                    />
                    <br/>
                    {
                        // values.deadlines.map(deadline => (
                            
                        //     <FormGroup key={deadline.id}>
                        //         {/* {setCount(count+1)} */}
                        //         <FormLabel>Deadline</FormLabel>
                        //         <br/>
                        //         <DateTimePicker
                        //             name="startDeadline"
                        //             label="Start Deadline"
                        //             format = "datetime"
                        //             value={deadline.startDeadline}
                        //             onChange={handleInputChange}
                        //         />
                        //         <br/>
                        //         <DateTimePicker
                        //             name="endDeadline"
                        //             label="End Deadline"
                        //             value={deadline.endDeadline}
                        //             onChange={handleInputChange}
                        //             // error={deadline.endDeadline < deadline.startDeadline
                        //             //        ? "End Daadline need than Start Deadline"
                        //             //        : ""
                        //             //     }
                        //         />
                        //         <br/>
                        //         <Input
                        //             name="content"
                        //             label="content"
                        //             placeholder="Ex: Finsh exams"
                        //             value={deadline.content}
                        //             onChange={handleInputChange}
                        //             error={errors.code}
                        //         />
                        //         <br/>
                        //     </FormGroup>
                        // ))
                        
                    }
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




