import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, makeStyles, Paper, } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import RadioGroup from 'custom-fields/RadioGroup';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import { useForm } from 'custom-fields/Use/useForm';
import studentApi from 'api/studentApi';
import { FACULTY_LIST } from 'constant/dataDemo';
import { getNameFromFullName } from 'utils/converter';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'constant/color';
import Button from 'custom-fields/Button';
import Checkbox from 'custom-fields/Checkbox';
import DealinesTable from 'features/Topic/components/Deadline';




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
    username: '',
    password: '',
}

export default function AccountPage(props) {

    const classes = useStyles();

    const { studentId } = useParams();

  //  const [student, setStudent] = useState([]);

    const isAddMode = !studentId;


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.name = fieldValues.password ? "" : "This field is required."
      
        
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
    } = useForm(initialFValuesDefault, isAddMode, true, validate);

    const handleSubmit = e => {
        //add or update 
        e.preventDefault();
        const teacherObject = {
            username: values.username,
            name: values.name,
            startTime:values.startTime.toISOString(),
            endTime:values.endTime.toISOString(),
            typeTopicId: Number(values.typeTopicId)
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
                <h1>Update Account</h1>
                <h3>Nguyen Van A</h3>
            </FormLabel>
            
            <Grid container className={classes.grid}>

                <Grid item xs={12} sm={3}>
                {/* <h3>Info</h3> */}

                    <FormGroup>
                    <Input
                        name="username"
                        label="username"
                        placeholder="Ex: An.197CT11122"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <br/>
                    <Input
                        name="password"
                        label="Password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                    />
                   
                    </FormGroup>


                </Grid>
             
            </Grid>



            {/* <DealinesTable /> */}

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




