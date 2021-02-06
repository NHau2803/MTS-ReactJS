import React, { useEffect, useState } from 'react'
import {makeStyles, TableBody, TableRow, TableCell, InputAdornment, Toolbar, FormLabel } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Search } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import useTable from 'custom-fields/Use/useTable';
import Input from 'custom-fields/Input';
import ButtonIcon from 'custom-fields/ButtonIcon';
import Popup from 'custom-fields/Popup';
import ConfirmDialog from 'custom-fields/ConfirmDialog';
import { STUDENT_LIST, TEACHER_LIST } from 'constant/dataDemo';
import Notification from 'custom-fields/Notification';
import studentApi from 'api/studentApi';
import { changeListToText } from 'utils/converter';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(10),
    },
    tableCell: {
        maxWidth: theme.spacing(35),
    }
}));

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'code', label: 'Code' },
    { id: 'name', label: 'Name' },
    { id: 'academyName', label: 'Academy' },
    { id: 'positonName', label: 'Positon' },
    { id: 'facultyName', label: 'Faculty' },
    { id: 'topicNames', label: 'Topic' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
   
]

export default function TablePage(props) {

    const classes = useStyles();

    const {history} = props;

    const [records, setRecords] = useState(TEACHER_LIST);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });

    const [openPopup, setOpenPopup] = useState(false)

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    //console.log(history.location.pathname); <=> useRouteMatch()???

    // Define the function that fetches the data from API
    // const fetchData = async () => {
        
    //     studentApi.search().then(res=>{
    //         setRecords(res);
    //     });
    
    // };

    // // Trigger the fetchData after the initial render by using the useEffect hook
    // useEffect(() => { fetchData(); }, []);

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
                <h1 className={classes.title}>Teacher List</h1>
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
                                    <TableCell>{item.academyName}</TableCell>
                                    <TableCell>{item.positonName}</TableCell>
                                    <TableCell>{item.facultyName}</TableCell>
                                    <TableCell className={classes.tableCell}>{changeListToText(item.topicNames)}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <ButtonIcon
                                            size="small"
                                            icon={<EditOutlinedIcon fontSize="small" />}   
                                            onClick= {() => history.push(`${history.location.pathname}/${item.id}`)} 
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
                                        </ButtonIcon>

                                        <ButtonIcon
                                            size="small"
                                            icon={<AssignmentIndIcon fontSize="small" />}   
                                            onClick= {() => history.push(`${history.location.pathname}/${item.id}/info`)} 
                                        />
                                        
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