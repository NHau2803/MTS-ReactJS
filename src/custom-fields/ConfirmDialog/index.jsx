import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, DialogContentText } from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Button from '../Button';


// const useStyles = makeStyles(theme => ({
   
// }))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
 //   const classes = useStyles()

    return (
        <Dialog 
            open={confirmDialog.isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title">
                <IconButton>
                    <NotListedLocationIcon />
                </IconButton>
                {confirmDialog.title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {confirmDialog.subTitle}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}
