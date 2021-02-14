import React from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'styles/Color';
import Button from 'custom-fields/Button';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';
import { TYPE } from 'constants/Type/type';
import { useSelectTopicStyles } from 'styles/SelectTopic';
import teamApi from 'api/Team';
import { getTeamUpdateObject, getTeamCreateObject } from 'utils/getObject';
import Notification from 'custom-fields/Notification';
import { useFormStyles } from 'styles/Form';
import { initialValuesAccountDefault } from 'constants/InitialValues';



export default function UpdateAccountPage(props) {

    const classes = useFormStyles();
    const classesSelectTopic = useSelectTopicStyles();
    const {history} = props;
    const { teamId } = useParams();
    const isAddMode = !teamId;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('passwordOld' in fieldValues)
            temp.passwordOld = fieldValues.passwordOld ? (fieldValues.passwordOld.length > 8 ? "" : "Password must be geater than 8") : "This field is required"
        if ('passwordNew' in fieldValues)
            temp.passwordNew = fieldValues.passwordNew ? (fieldValues.passwordNew.length > 8 ? "" : "Password must be geater than 8") : "This field is required"
        if ('passwordConfirm' in fieldValues)
            temp.passwordConfirm = fieldValues.passwordConfirm === values.passwordNew ? "" : "Password do not match"

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
    } = useFormCustom(initialValuesAccountDefault, false, TYPE.ACCOUNT, teamId, true, validate);
   
    const handleSubmit = e => {
        e.preventDefault();
        
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
                            name="username"
                            label="username"
                            value={values.username || ""}
                            onChange={handleInputChange}
                            error={errors.username}
                            disabled={true}
                        />
                        <br/>
                        <Input
                            name="passwordOld"
                            label="password Old"
                            value={values.passwordOld || ""}
                            onChange={handleInputChange}
                            error={errors.passwordOld}
                        />
                        <br/>
                        <Input
                            name="passwordNew"
                            label="Password New"
                            value={values.passwordNew || ""}
                            onChange={handleInputChange}
                            error={errors.passwordNew}
                        />
                        <br/>
                        <Input
                            name="passwordConfirm"
                            label="Password Confirm"
                            value={values.passwordConfirm || ""}
                            onChange={handleInputChange}
                            error={errors.passwordConfirm}
                        />
                        <br/>
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




