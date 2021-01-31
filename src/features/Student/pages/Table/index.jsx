import React, { useState } from 'react'
import {makeStyles, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import useTable from '../../../../components/CustomFields/Use/useTable';
import { STUDENT_LIST } from '../../../../constant/dataDemo';
import { Search } from '@material-ui/icons';
import Input from '../../../../components/CustomFields/Input';
import ButtonIcon from '../../../../components/CustomFields/ButtonIcon';
import DeleteIcon from '@material-ui/icons/Delete';


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

    const handleSearch = e => {
        let target = e.target;

        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    console.log(items);
                    return items.filter(x => x.code.toLowerCase().includes(target.value.toLowerCase()));
            }
        })
    };

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


    return(
        <div className={classes.root}>

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
                                            onClick= {() => history.push(`/student/add/${item.id}`)} 
                                        />
                                        <ButtonIcon
                                            size="small"
                                            icon={<DeleteIcon fontSize="small" />}    
                                            onClick= {() => history.push(`/student/delete/${item.id}`)}
                                        />
                                    </TableCell>
                                    {/* <TableCell>
                                        <ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </ActionButton>

                                        <ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </ActionButton>
                                    </TableCell> */}

                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
        </div>
    );
}