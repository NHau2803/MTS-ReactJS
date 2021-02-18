import React, { useEffect, useState } from 'react'
import { TableBody, TableRow, TableCell, InputAdornment, Toolbar, FormLabel, Checkbox } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CachedIcon from '@material-ui/icons/Cached';
import useTableCustom from 'custom-fields/Use/useTableCustom';
import Input from 'custom-fields/Input';
import ButtonIcon from 'custom-fields/ButtonIcon';
import ConfirmDialog from 'custom-fields/ConfirmDialog';
import Notification from 'custom-fields/Notification';
import studentApi from 'api/Student';
import { useTableStyles } from 'styles/Table';
import accountApi from 'api/Account';
import Select from 'custom-fields/Select';
import { LIST_DEFAULT, LIST_ROLES } from 'constants/InitialValues';

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'username', label: 'Username' },
    { id: 'password', label: 'Password' },
    { id: 'status', label: 'Status' },
    { id: 'roles', label: 'Roles' },
    { id: 'resetPassword', label: 'Reset Password' },
    { id: 'changeRoles', label: 'Change Roles' },
    { id: 'save', label: 'Save' },
   
]

export default function TablePage(props) {

    const classes = useTableStyles();
    const {history} = props;
    const [records, setRecords] = useState([]);
    const [saveChange, setSaveChange] = useState({newPassword: "", tickDefault: true, roles: "", status: ""});
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    //console.log(history.location.pathname); <=> useRouteMatch()???

    const fetchData = async () => {
        
        accountApi.search().then(res=>{
            res.errorMessage
            ? setNotify({
                isOpen: true,
                message: res.errorMessage,
                type: 'error'
            })
            : setRecords(res.result);

        })
    };

    useEffect(() => { fetchData(); }, []);

    const handleSearch = e => {
        let target = e.target;

        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    //console.log(items);
                    return items.filter(
                        x => x.code.toLowerCase().includes(target.value.toLowerCase())
                    );
            }
        })
    };

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        
        studentApi.delete(id).then(res=>{
            res.success
            ? setNotify({
                 isOpen: true,
                 message: 'Deleted Successfully',
                 type: 'error'
             })
            : setNotify({
                 isOpen: true,
                 message: 'Sory, Deleted Unsuccessfully',
                 type: 'error'
             })
        })
    }

    const onRefresh = () => {
        console.log("Refresh!")
        fetchData();
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTableCustom(records, headCells, filterFn);


    return(
        <div className={classes.root}>
            <FormLabel>
                <h1 className={classes.title}>Account List</h1>
            </FormLabel>
            
            <Toolbar>
                <Input
                    label="Search For Username"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <ButtonIcon
                    icon={<CachedIcon />}   
                    onClick= {onRefresh} 
                />
            </Toolbar>

             <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell><VisibilityOffIcon fontSize="small" color="primary"/></TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.roles}</TableCell>
                                    <TableCell>
                                        <Input
                                            name="password"
                                            label="New Password"
                                            value={""}
                                            // onChange={handleInputChange}
                                            // error={errors.username}
                                            // disabled={
                                            //         !isAddMode
                                            //         ? true
                                            //         : values.tickDefaultUsername
                                            //     }
                                        />
                                        <Checkbox 
                                            name="tickDefaultUsername"
                                            label="Default"
                                            value={false}
                                            //onChange={handleInputChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                    <Select
                                        name="rolesId"
                                        label="Roles"
                                        value={"a"}
                                        // onChange={handleInputChange}
                                        options={LIST_ROLES() || LIST_DEFAULT()}
                                        // error={errors.facultyId}
                                    />                        
                                    </TableCell>
                                    <TableCell>
                                        <ButtonIcon
                                        // size="small"
                                            icon={<SaveIcon fontSize={"large"}/>}    
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to reset password?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                },)
                                            }}>
                                        </ButtonIcon>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />

            
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                
        </div>
    );
}