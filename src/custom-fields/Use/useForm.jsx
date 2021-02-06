import { useState } from 'react'

export  function useForm(initialFValuesDefault, isAddMode, validateOnChange = false, validate) {

    //console.log({initialFValues});

    // const getStudent=async ()=> {
    //     const reuslt=await studentApi.find(1)
    //     setValues(reuslt)
    // }
    const [values, setValues] = useState(initialFValuesDefault);
    const [errors, setErrors] = useState({});
      
    // useEffect(getStudent,[])
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {

        setValues(initialFValuesDefault);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


// const useStyles = makeStyles(theme => ({
//     root: {
//         '& .MuiFormControl-root': {
//         //    width: '80%',
//             margin: theme.spacing(1),            
//             // margin: "2rem auto 1rem auto",
//         }
//     }
// }))

// export function Form(props) {
    
//     const classes = useStyles();
//     const { children, ...other } = props;
//     return (
//         <form className={classes.root} autoComplete="off" {...other}>
//             {props.children}
//         </form>
//     )
// }

