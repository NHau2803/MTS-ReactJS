import React, { useEffect, useState } from 'react'
import { TableBody, TableRow, TableCell, InputAdornment, Toolbar, FormLabel } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Search } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CachedIcon from '@material-ui/icons/Cached';
import useTableCustom from 'custom-fields/Use/useTableCustom';
import Input from 'custom-fields/Input';
import ButtonIcon from 'custom-fields/ButtonIcon';
import ConfirmDialog from 'custom-fields/ConfirmDialog';
import Notification from 'custom-fields/Notification';
import { useTableStyles } from 'styles/Table';
import teamApi from 'api/Team';
import { useParams } from 'react-router-dom';

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'facultyName', label: 'Faculty' },
    { id: 'topicName', label: 'Topic ' },
    { id: 'studentTotal', label: 'Total' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
]

export default function TablePage(props) {

    const classes = useTableStyles();
    const {history} = props;
    const { topicId } = useParams();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    //console.log(history.location.pathname); <=> useRouteMatch()???

    const fetchData = async () => {

        if(topicId){
            teamApi.searchByTopicId(topicId).then(res=>{
                res.errorMessage
                ? setNotify({
                    isOpen: true,
                    message: res.errorMessage,
                    type: 'error'
                })
                : setRecords(res.result);

            })
        }else{
            teamApi.search().then(res=>{
                res.errorMessage
                ? setNotify({
                    isOpen: true,
                    message: res.errorMessage,
                    type: 'error'
                })
                : setRecords(res.result);

            })
        }
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
        
        teamApi.delete(id).then(res=>{
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
                <h1 className={classes.title}>Team List</h1>
            </FormLabel>
            
            <Toolbar>
                <Input
                    label="Search For Name"
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
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.facultyName}</TableCell>
                                    <TableCell>{item.topicName}</TableCell>
                                    <TableCell>{item.studentTotal}</TableCell>
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
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this Team?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                },)
                                        }}>
                                        </ButtonIcon>

                                        <ButtonIcon
                                            size="small"
                                            icon={<VisibilityIcon fontSize="small" />}   
                                            onClick= {() => history.push(`${history.location.pathname}/${item.id}/view`)} 
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