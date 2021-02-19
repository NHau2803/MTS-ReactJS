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
import { initialFValuesTeamDefault } from 'constants/InitialValues';
import { useSelectTopicStyles } from 'styles/SelectTopic';
import TopicListAPI from 'api/GetListForSelect/topicListAPI';
import teamApi from 'api/Team';
import { getTeamUpdateObject, getTeamCreateObject } from 'utils/getObject';
import Notification from 'custom-fields/Notification';
import { useFormStyles } from 'styles/Form';
import { checkValidation } from 'utils/validation';



export default function AddEditPage(props) {

    const classes = useFormStyles();
    const classesSelectTopic = useSelectTopicStyles();
    const {history} = props;
    const { teamId } = useParams();
    const isAddMode = !teamId;

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
    } = useFormCustom(initialFValuesTeamDefault, isAddMode, TYPE.TEAM, teamId, true, validate);

    const handleTouchTap = (topicId, topicName) => {
        setValues({
            ...values,
            ["topicName"]: topicName,
            ["topicId"]:topicId
        })
   }
   
   const handleSubmit = e => {
    //add or update 
        e.preventDefault();
        
        if(isAddMode){

            const teamCreate = getTeamCreateObject(values);
            teamApi.create(teamCreate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Create Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/team'), 1500);
                    
                }else{
                    setNotify({
                        isOpen: true,
                        message: "Sorry, Create Unsuccessfully",
                        type: "error"
                    });
                }
            });

        }else{

            const teamUpdate = getTeamUpdateObject(values);
            teamApi.update(teamId, teamUpdate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Update Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/team'), 1500);
                    
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
                ? <h1>Create a Team</h1>
                : <h1>Update Team</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={3}>
                    <FormGroup>
                        <Input
                            name="name"
                            label="Name"
                            placeholder="Ex: Team vui ve khong quao"
                            value={values.name || ""}
                            onChange={handleInputChange}
                            error={errors.name}
                        />
                        <br/>
                        <Input
                            name="topicName"
                            label="Select Topic"
                            value={values.topicName || ""}
                            disabled={true}
                        />
                        <br/>
                        <List className={classesSelectTopic.root} subheader={<li />}>
                            {TopicListAPI().map((items) => (
                                <li key={items.facultyName} className={classesSelectTopic.listSection}>
                                <ul className={classesSelectTopic.ul}>

                                    <ListSubheader className={classesSelectTopic.subHeader}> {items.facultyName} </ListSubheader>
                                        
                                        {items.topicList.map((item) => (
                                        <ListItem
                                            key={item.topicId}
                                            button
                                            onClick={() => handleTouchTap(item.topicId, item.topicName)}
                                            >
                                            <ListItemText
                                                primary={`- `+item.topicName}
                                            />
                                        </ListItem>
                                        ))}
                                </ul>
                                </li>
                            ))}
                        </List>
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




