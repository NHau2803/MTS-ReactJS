
/**********************02:31  - 29/01/2021************************** */


// import React, { useState } from 'react';
// import { Form, Formik, useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core';
// import Select from '../../../../components/CustomFields/Select'
// import { FACULTY_LIST } from '../../../../constant/dataDemo';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         margin: "5rem auto 1rem auto",
//     },
//     grid: {
//         //background: "red",
//         padding: theme.spacing(1),
//     }
// }));

// const validationSchema = yup.object({
//     code: yup.string().min(10, 'minimum 8 characters length').required('Code is required'),
    
//     name: yup.string().required('name is required'),

//     facultyId: yup.string().required('faculty is required'),

// });

// export default function AddEditPage(){

//     const classes = useStyles();

//     const [state, setState] = useState({
//         code: '197ct31311',
//         name: 'Nguyễn Công Hậu',
//         facultyId: 1, 
//       });

//     const formik = useFormik({

//         initialValues: {
//             code: '197ct31311',
//             name: 'Nguyễn Công Hậu',
//             facultyId: 1, 
//         },

//         validationSchema: validationSchema,

//         onSubmit: (values) => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });

//     const handleChange = (event) => {
//         const name = event.target.name;
//         setState({
//           ...state,
//           [name]: event.target.value,
//         });
//     };

//     return (
//         <Formik>
//             <Form onSubmit={formik.handleSubmit} className={classes.root}>
//                 <Grid item xs={12} className={classes.grid}>
//                     <TextField
//                         id="code"
//                         name="code"
//                         label="Code"
//                         value={formik.values.code}
//                         onChange={formik.handleChange}
//                         error={formik.touched.code && Boolean(formik.errors.code)}
//                         helperText={formik.touched.code && formik.errors.code}
//                         variant="outlined"
//                         size="small"
//                     />
//                 </Grid>

//                 <Grid item xs={12} className={classes.grid}>
//                     <TextField
//                         id="name"
//                         name="name"
//                         label="Name"
//                         value={formik.values.name}
//                         onChange={formik.handleChange}
//                         error={formik.touched.name && Boolean(formik.errors.name)}
//                         helperText={formik.touched.name && formik.errors.name}
//                         variant="outlined"
//                         size="small"
//                     />
//                 </Grid>

//                 <Grid item xs={12} className={classes.grid}>
//                     <Select
//                         id="faculty"
//                         name="faculty"
//                         label="Faculty"
//                         value={formik.FACULTY_LIST}
//                         error={formik.touched.name && Boolean(formik.errors.name)}
//                         onChange={handleChange}
//                         options ={FACULTY_LIST()}
//                         variant="outlined"
                        

//                     />
//                 </Grid>

//                 <Grid item xs={12} className={classes.grid}>
//                     <Button color="primary" variant="contained" type="submit">
//                         Submit
                        
//                     </Button>
//                 </Grid>
//             </Form>
//         </Formik>
//     );
// };


/****************************************update 8:04***************** */

import React, { useState, useEffect } from 'react'
import { Checkbox, Grid, makeStyles, } from '@material-ui/core';
import { FACULTY_LIST } from '../../../../constant/dataDemo';
import { Form, useForm } from '../../../../components/CustomFields/Use/useForm';
import Input from '../../../../components/CustomFields/Input';
import Select from '../../../../components/CustomFields/Select';
import Button from '../../../../components/CustomFields/Button';
import RadioGroup from '../../../../components/CustomFields/RadioGroup';
import DatePicker from '../../../../components/CustomFields/DatePicker';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
    },
    grid: {
        //background: "red",
        padding: theme.spacing(1),
    }
}));

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
]

const initialFValues = {
    id: 0,
    code: '',
    facultyId: '',
    gender: 'male',
    birthday: new Date('2001-01-01T12:00:00'),
}

export default function AddEditPage(props) {

    const classes = useStyles()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('facultyId' in fieldValues)
            temp.facultyId = fieldValues.facultyId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

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
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values);
    }


    return (
        <Form onSubmit={handleSubmit} className={classes.root}>
            <Grid container>

                <Grid item xs={12} className={classes.grid}>
                    <Input
                        name="code"
                        label="Code"
                        value={values.code}
                        onChange={handleInputChange}
                        error={errors.code}
                    />
                </Grid>

                <Grid item xs={12} className={classes.grid}>
                    <Select
                        name="facultyId"
                        label="Faculty"
                        value={values.facultyId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.facultyId}
                    />
                </Grid>

                <Grid item xs={12} className={classes.grid}>
                    <RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                </Grid>

                <Grid item xs={12} className={classes.grid}>
                    <DatePicker
                        name="birthday"
                        label="Birthday"
                        value={values.birthday}
                        onChange={handleInputChange}
                    />
                </Grid>
                
                <Grid item xs={12} className={classes.grid}>
                    <Button
                        type="submit"
                        text="Submit" 
                    />
                    <Button
                        text="Reset"
                        color="default"
                        onClick={resetForm} 
                    />
                </Grid>

               

  
            </Grid>
        </Form>
    )
}




