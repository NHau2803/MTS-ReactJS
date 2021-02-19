import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'styles/Color';
import Button from 'custom-fields/Button';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';
import { TYPE } from 'constants/Type/type';
import { initialFValuesDeadlinesDefault, initialFValuesTopicDefault, LIST_DEFAULT } from 'constants/InitialValues';
import Notification from 'custom-fields/Notification';
import Select from 'custom-fields/Select';
import TypeTopicListAPI from 'api/GetListForSelect/typeTopicListAPI';
import { useFormStyles } from 'styles/Form';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import AddIcon from '@material-ui/icons/Add';
import DateTimePicker from 'custom-fields/DateTimePicker';
import {  getTopicCreateObject } from 'utils/getObject';
import topicApi from 'api/Topic';
import { checkValidation } from 'utils/validation';


export default function AddEditPage(props) {

    const classes = useFormStyles();
    const {history} = props;
    const { topicId } = useParams();
    const isAddMode = !topicId;    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        temp = checkValidation(temp, fieldValues);
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
   
    /**********************DEADLINE********************** */
    const [deadlines, setDeadlines] = useState(isAddMode ? initialFValuesDeadlinesDefault : []); //get values first | after change values with hook
    const [disableUseEffect, setDisableUseEffect] = useState(false);
    

    useEffect(() => { 
        const fetchData = async () => {
            if(!disableUseEffect && !isAddMode){
                if(values.deadlines !== undefined){
                    setDeadlines(values.deadlines);
                    setDisableUseEffect(true);
                }
            }
        }
        fetchData()
     });

    console.log(deadlines);

    const handleRemoveFields = id => {
        console.log(deadlines)
        const deadlinesChange  = [...deadlines];
        deadlinesChange.splice(deadlinesChange.findIndex(deadline => deadline.id === id), 1);
        setDeadlines(deadlinesChange);
        console.log(deadlines);
    }

    const handleAddFields = () => {
        setDeadlines([...deadlines, 
            { id: Number(deadlines[deadlines.length-1].id) + 1,
            startDeadline: new Date('2001-01-01T12:00:00'),
            endDeadline: new Date('2001-01-07T12:00:00'),
            content: '', }
        ])
    }

    const handleDeadlineChange = (id, event) => {
       
        const { name, value } = event.target
        const newValues = deadlines.map(deadline => {
            if(id === deadline.id) {
                deadline[name] = value
            }
            return deadline;
        })  
        setDeadlines(newValues);
    }


    /**************************************************** */

    const handleSubmit = e => {
    //add or update 
        e.preventDefault();

        if(isAddMode){

            const topicCreate = getTopicCreateObject(values, deadlines)
            topicApi.create(topicCreate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Create Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/topic'), 1500);
                    
                }else{
                    setNotify({
                        isOpen: true,
                        message: "Sorry, Create Unsuccessfully",
                        type: "error"
                    });
                }
            });

        }else{

            const topicUpdate = getTopicCreateObject(values, deadlines);
            topicApi.update(topicId, topicUpdate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Update Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/topic'), 1500);
                    
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
                        placeholder="Ex: do-an-cuoi-ky"
                        value={values.code || ""}
                        onChange={handleInputChange}
                        error={errors.code}
                    />
                    <br/>
                    <Input
                        name="name"
                        label="Name"
                        placeholder="Ex: Do An Cuoi Ki 2021"
                        value={values.name || ""}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <br/>
                    <DateTimePicker
                        name="startTime"
                        label="Start Time"
                        value={values.startTime || new Date()}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <DateTimePicker
                        name="endTime"
                        label="End Time"
                        value={values.endTime || new Date()}
                        onChange={handleInputChange}
                        error={values.startTime >= values.endTime
                            ? "Invalid"
                            : ""
                        }
                    />
                    <br/>
                     <Select
                        name="typeTopicId"
                        label="Type Topic"
                        value={values.typeTopicId || ""}
                        onChange={handleInputChange}
                        options={TypeTopicListAPI() || LIST_DEFAULT()}
                        error={errors.typeTopicId}
                    />
                    <br/>
                    <FormLabel>
                        {isAddMode 
                        ? <h1>Create Deadlines</h1>
                        : <h1>Update Deadlines</h1>
                        }
                    </FormLabel>
                    {
                        deadlines.map(deadline => (
                            
                            <FormGroup key={deadline.id}>
                                {/* {setCount(count+1)} */}
                                {/* <FormLabel>Deadline</FormLabel> */}
                                <br/>
                                <DateTimePicker
                                    name="startDeadline"
                                    label="Start Deadline"
                                    value={deadline.startDeadline || new Date()}
                                    onChange={event => handleDeadlineChange(deadline.id, event)}
                                />
                                <br/>
                                <DateTimePicker
                                    name="endDeadline"
                                    label="End Deadline"
                                    value={deadline.endDeadline || new Date()}
                                    onChange={event => handleDeadlineChange(deadline.id, event)}
                                    error={deadline.endDeadline <=  deadline.startDeadline
                                           ? "Invalid"
                                           : ""
                                        }
                                />
                                <br/>
                                <Input
                                    name="content"
                                    label="content"
                                    placeholder="Ex: Finsh exams"
                                    value={deadline.content || ""}
                                    onChange={event => handleDeadlineChange(deadline.id, event)}
                                    error={errors.content}
                                />
                                
                                <IconButton 
                                    className={classes.iconPrimary}
                                    disabled={deadlines.length === 1} 
                                    onClick={() => handleRemoveFields(deadline.id)}
                                >
                                    <HighlightOffOutlinedIcon />
                                </IconButton>
                            </FormGroup>                          
                        ))
                    }
                    </FormGroup>

                    <FormGroup>
                        <br/>
                        <IconButton 
                            className={classes.iconPrimary}
                            onClick={() => handleAddFields()}
                        >
                            <AddIcon />
                        </IconButton>
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




