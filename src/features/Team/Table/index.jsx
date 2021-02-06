import React, { useEffect, useState } from 'react'
import {makeStyles, TableBody, TableRow, TableCell, Toolbar, FormLabel, InputAdornment } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Search } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ButtonIcon from 'custom-fields/ButtonIcon';
import ConfirmDialog from 'custom-fields/ConfirmDialog';
import Popup from 'custom-fields/Popup';
import { TEAM_LIST, TOPIC_LIST } from 'constant/dataDemo';
import studentApi from 'api/studentApi';
import useTable from 'custom-fields/Use/useTable';
import Input from 'custom-fields/Input';
import { changeListToText } from 'utils/converter';
import Notification from 'custom-fields/Notification';

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
    { id: 'name', label: 'Name' },
    { id: 'topicName', label: 'Type Topic ' },
    { id: 'studentTotal', label: 'Total' },
    { id: 'action', label: 'Action' },
   
]

export default function TablePage(props) {

    const classes = useStyles();

    const {history} = props;

    const [records, setRecords] = useState(TEAM_LIST);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });

    const [openPopup, setOpenPopup] = useState(false)

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    //console.log(history.location.pathname); <=> useRouteMatch()???

    // // Define the function that fetches the data from API
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
                        x => x.name.toLowerCase().includes(target.value.toLowerCase())
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
                <h1 className={classes.title}>Team List</h1>
            </FormLabel>
            
            <Toolbar>
                <Input
                    label="Search For Team Name"
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
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.topicName}</TableCell>
                                    <TableCell>{item.studentTotal}</TableCell>
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
                                            icon={<VisibilityIcon fontSize="small" />}   
                                            onClick= {() => history.push(`${history.location.pathname}/${item.id}/s`)} 
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