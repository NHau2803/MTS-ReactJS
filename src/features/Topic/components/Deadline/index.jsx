// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import { FormGroup, FormLabel, Grid, makeStyles, Paper, } from '@material-ui/core';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import Input from 'custom-fields/Input';
// import DatePicker from 'custom-fields/DatePicker';
// import useFormCustom from 'custom-fields/Use/useFormCustom';



// const useStyles = makeStyles((theme) => ({
//     root: {
//         margin: "5rem auto 1rem auto",
//         flexGrow: 1,
//     },
   
//     icon: {
//         fontSize: theme.spacing(10),
//     },
//     grid: {
//         display: "flex",
//         justifyContent: "center",
//         padding: theme.spacing(1),
//     },
//     gridLeft: {
//         padding: theme.spacing(2),
//     },
//     gridRight: {
//         padding: theme.spacing(2)
//     },
//     gridItem: {
//         padding: theme.spacing(2),
//     },
//     formGroup: {
//         margin: theme.spacing(1),
//     },
//     submit: {
//         //background: "red",
//     },
   
    
// }));


// const initialFValuesDefault = {
//     id: 0,
//     startTime: new Date('2001-01-01T12:00:00'),
//     endTime: new Date('2001-01-01T12:00:00'),
//     content: 'dcbdhcbh',

// }

// export default function AddEditPage(props) {

//     const classes = useStyles();

//     const { studentId } = useParams();

//   //  const [student, setStudent] = useState([]);

//     const isAddMode = !studentId;


//     const validate = (fieldValues = values) => {
//         let temp = { ...errors }
//         if ('code' in fieldValues)
//             temp.code = fieldValues.code ? "" : "This field is required."
//         if ('name' in fieldValues)
//             temp.name = fieldValues.name ? "" : "This field is required."
//         if ('typeTopicId' in fieldValues)
//         temp.typeTopicId = fieldValues.typeTopicId.length !== 0 ? "" : "This field is required."
        
//         setErrors({ ...temp })

//         if (fieldValues === values)
//             return Object.values(temp).every(x => x === "")
//     }

//     const {
//         values,
//         setValues,
//         errors,
//         setErrors,
//         handleInputChange,
//         resetForm
//     } = useFormCustom(initialFValuesDefault, isAddMode, true, validate);

//     const handleSubmit = e => {
//         //add or update 
//         e.preventDefault();
//         const teacherObject = {
//             code: values.code,
//             name: values.name,
//             startTime:values.startTime.toISOString(),
//             endTime:values.endTime.toISOString(),
//             typeTopicId: Number(values.typeTopicId)
//         }

//         if(isAddMode){
            
//             console.log(teacherObject);
//             //studentApi.create(teacherObject);
//         }else{

//             console.log(teacherObject);
//            // studentApi.create(studentNew);
//         }

//     }
//     return (
//         <div className={classes.root}>
        
//         <FormGroup onSubmit={handleSubmit}>

//             <Grid container className={classes.grid}>

//                 <Grid item xs={12} sm={3}>
                    
//                     <FormGroup>
//                     <Input
//                         name="id"
//                         label="Id"
//                         placeholder="Ex: 1"
//                         value={values.code}
//                         onChange={handleInputChange}
//                         error={errors.code}
//                     />
//                     <br/>
//                     <DatePicker
//                         name="startTime"
//                         label="Start Time"
//                         value={values.startTime}
//                         onChange={handleInputChange}
//                     />
//                     <br/>
//                     <DatePicker
//                         name="endTime"
//                         label="End Time"
//                         value={values.endTime}
//                         onChange={handleInputChange}
//                     />
//                     <br/>
//                     <Input
//                         name="content"
//                         label="Cotent"
//                         placeholder="Ex: 197CT11122"
//                         value={values.content}
//                         onChange={handleInputChange}
//                         error={errors.content}
//                     />
//                     </FormGroup>

//                 </Grid>
             
//             </Grid>

//             </FormGroup>
//         </div>
//     )
// }




