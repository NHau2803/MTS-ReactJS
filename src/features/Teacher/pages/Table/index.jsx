import React, { useEffect, useState } from 'react'
import { TableBody, TableRow, TableCell, InputAdornment, Toolbar, FormLabel } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Search } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import useTableCustom from 'custom-fields/Use/useTableCustom';
import Input from 'custom-fields/Input';
import ButtonIcon from 'custom-fields/ButtonIcon';
import CachedIcon from '@material-ui/icons/Cached';
import ConfirmDialog from 'custom-fields/ConfirmDialog';
import Notification from 'custom-fields/Notification';
import { changeListToText } from 'utils/converter';
import teacherApi from 'api/Teacher';
import { useTableStyles } from 'styles/Table';

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

    const classes = useTableStyles();
    const {history} = props;
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const fetchData = async () => {
        
        teacherApi.search().then(res=>{
            res.errorMessage
            ? setNotify({
                isOpen: true,
                message: res.errorMessage,
                type: 'error'
            })
            : setRecords(res.result);

        });
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
        teacherApi.delete(id).then(res=>{
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
                                                title: 'Are you sure to delete this teacher?',
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