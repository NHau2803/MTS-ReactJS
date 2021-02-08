import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, makeStyles, Paper, } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import Select from 'custom-fields/Select';
import studentApi from 'api/Student/studentApi';
import { FACULTY_LIST } from 'constant/dataDemo';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'constant/color';
import Button from 'custom-fields/Button';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
        flexGrow: 1,
    },
   
    icon: {
        fontSize: theme.spacing(10),
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
    },
    gridLeft: {
        padding: theme.spacing(2),
    },
    gridRight: {
        padding: theme.spacing(2)
    },
    gridItem: {
        padding: theme.spacing(2),
    },
    formGroup: {
        margin: theme.spacing(1),
    },
    submit: {
        //background: "red",
    },
    // paper: {
    //     padding: theme.spacing(1),
    // }
   
    
}));


const initialFValuesDefault = {
    id: 0,
    name: '',
    topicId: '',
}

export default function AddEditPage(props) {

    const classes = useStyles();

    const { studentId } = useParams();

  //  const [student, setStudent] = useState([]);

    const isAddMode = !studentId;


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
        handleInputChange,
        resetForm
    } = useFormCustom(initialFValuesDefault, isAddMode, true, validate);

    const handleSubmit = e => {
        //add or update 
        e.preventDefault();
        const teacherObject = {
            name: values.name,
            topicId: Number(values.topicId)
        }

        if(isAddMode){
            
            console.log(teacherObject);
            //studentApi.create(teacherObject);
        }else{

            console.log(teacherObject);
           // studentApi.create(studentNew);
        }

    }
    return (
        <div className={classes.root}>
        <FormGroup onSubmit={handleSubmit}>
            <FormLabel>
                {isAddMode 
                ? <h1>Create a Team</h1>
                : <h1>Update Team</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>

                <Grid item xs={12} sm={3}>

                    <FormGroup>
                   
                    <Input
                        name="name"
                        label="Team Name"
                        placeholder="Ex: Team Vui Ve"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <br/>
                    <Select
                        nampe="topicId"
                        label="Topic"
                        value={values.topicId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.topicId}
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
                    />
                    <Button
                    
                        text="Reset"
                        color="default"
                        startIcon={<RefreshIcon />}
                        onClick={resetForm} 
                    />
            </Grid>
            
            </FormGroup>
        </div>
    )
}




