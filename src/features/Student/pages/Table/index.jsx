import React, { useEffect, useState } from 'react'
import {makeStyles, TableBody, TableRow, TableCell, InputAdornment, Toolbar, FormLabel } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import useTable from '../../../../components/CustomFields/Use/useTable';
import { STUDENT_LIST } from '../../../../constant/dataDemo';
import { Search } from '@material-ui/icons';
import Input from '../../../../components/CustomFields/Input';
import ButtonIcon from '../../../../components/CustomFields/ButtonIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Notification from '../../../../components/CustomFields/Notification';
import ConfirmDialog from '../../../../components/CustomFields/ConfirmDialog';
import Popup from '../../../../components/CustomFields/Popup';
import studentApi from '../../../../api/studentApi';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(10),
    }
}));

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'code', label: 'Code' },
    { id: 'name', label: 'Name' },
    { id: 'facultyName', label: 'Faculty' },
    { id: 'teamNames', label: 'Team ' },
    { id: 'topicNames', label: 'Topic' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
   
]

export default function TablePage(props) {

    const classes = useStyles();

    const {history} = props;

    const [records, setRecords] = useState(STUDENT_LIST);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });

    const [openPopup, setOpenPopup] = useState(false)

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    // Define the function that fetches the data from API
    const fetchData = async () => {
        
        studentApi.search().then(res=>{
            setRecords(res);
        });
    
    };

    // Trigger the fetchData after the initial render by using the useEffect hook
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
        
        studentApi.delete(id);
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


    return(
        <div className={classes.root}>
            <FormLabel>
                <h1>Student List</h1>
            </FormLabel>
            
            <Toolbar>
                <Input
                    label="Search For Code"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
            </Toolbar>

             <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.facultyName}</TableCell>
                                    <TableCell>{item.teams}</TableCell>
                                    <TableCell>{item.topicNames}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <ButtonIcon
                                            size="small"
                                            icon={<EditOutlinedIcon fontSize="small" />}   
                                            onClick= {() => history.push(`/student/${item.id}`)} 
                                        />

                                        <ButtonIcon
                                            size="small"
                                            icon={<DeleteIcon fontSize="small" />}    
                                           // onClick= {() => history.push(`/student/delete/${item.id}`)}
                                           onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this student?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item.id) }
                                            },)
                                        }}>
                                            <CloseIcon fontSize="small" />
                                        </ButtonIcon>

                                        <ButtonIcon
                                            size="small"
                                            icon={<AssignmentIndIcon fontSize="small" />}   
                                            onClick= {() => history.push(`/student/${item.id}/info`)} 
                                        />
                                        
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />

                <Popup
                    title="Employee Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {/* <EmployeeForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} 
                    /> */}
                </Popup>
            
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