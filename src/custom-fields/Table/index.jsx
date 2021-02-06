import { TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import React from 'react'

export default function TableMapItem(props) {


    const { listItem } = props;
    
    return (
        
        <TableContainer>
        <TableBody>
            {
                listItem().map(item =>
                    (<TableRow>
                        
                        <TableCell>{item}</TableCell>
                    
                    </TableRow>)
                )
            }
        </TableBody>
        </TableContainer>
        
    )
}
