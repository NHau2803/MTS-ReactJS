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
import { initialFValuesDeadlinesDefault } from 'constants/InitialValues';
import Notification from 'custom-fields/Notification';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import TypeTopicListAPI from 'api/GetListForSelect/typeTopicListAPI';
import { useFormStyles } from 'styles/Form';
import { formatDateTime } from "utils/converter";
import AddEditDeadlines from 'features/Topic/components/Deadline';
import { set } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import AddIcon from '@material-ui/icons/Add';
import DateTimePicker from 'custom-fields/DateTimePicker';


export default function AddEditDealinesPage(props) {

    const classes = useFormStyles();
    const {history} = props;
    const { topicId } = useParams();
    const isAddMode = !topicId;
    const [count, setCount] = useState(0);
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('content' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
    
        
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
        onReset
    } = useFormCustom(initialFValuesDeadlinesDefault, isAddMode, TYPE.DEADLINE, topicId, true, validate);
   
    const handleRemoveFields = id => {
        values.splice(values.findIndex(deadline => deadline.id === id), 1);
        setValues(values);
    }

    const handleAddFields = () => {
        setValues([...values, 
            { id: Number(values[values.length-1].id) + 1,
            startDeadline: new Date('2001-01-01T12:00:00'),
            endDeadline: new Date('2001-01-01T12:00:00'),
            content: '', }
        ])
    }

    const handleInputChange = (id, event) => {
        const newValues = values.map(i => {
            if(id === i.id) {
            i[event.target.name] = event.target.value
            }
            return i;
        })  
  
        setValues(newValues);
    }

    const handleSubmit = e => {
    //add or update 
        e.preventDefault();
        

    }

    return (
        <div className={classes.root}>
        <FormGroup onSubmit={handleSubmit}>
            <FormLabel>
                {isAddMode 
                ? <h1>Create a Topic / Deadline</h1>
                : <h1>Update Topic/ Deadline</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <FormGroup>
                    {
                        values.map(deadline => (
                            
                            <FormGroup key={deadline.id}>
                                {/* {setCount(count+1)} */}
                                <FormLabel>Deadline</FormLabel>
                                <br/>
                                <DateTimePicker
                                    name="startDeadline"
                                    label="Start Deadline"
                                    format = "datetime"
                                    value={deadline.startDeadline}
                                    onChange={event => handleInputChange(deadline.id, event)}
                                />
                                <br/>
                                <DateTimePicker
                                    name="endDeadline"
                                    label="End Deadline"
                                    value={deadline.endDeadline}
                                    onChange={event => handleInputChange(deadline.id, event)}
                                    error={deadline.endDeadline < deadline.startDeadline
                                           ? "Invalid"
                                           : ""
                                        }
                                />
                                <br/>
                                <Input
                                    name="content"
                                    label="content"
                                    placeholder="Ex: Finsh exams"
                                    value={deadline.content}
                                    onChange={event => handleInputChange(deadline.id, event)}
                                    error={errors.code}
                                />
                                <br/>
                                <IconButton 
                                    disabled={values.length === 1} 
                                    onClick={() => handleRemoveFields(deadline.id)}
                                >
                                    <HighlightOffOutlinedIcon />
                                </IconButton>
                            </FormGroup>

                            
                        ))
                    }
                    </FormGroup>
                    <FormGroup>
                    <IconButton 
                        onClick={() => handleAddFields}
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




