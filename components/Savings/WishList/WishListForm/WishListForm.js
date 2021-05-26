import React, { useState } from 'react'

import WishListTextFields from './WishListTextFields'

import {
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    Typography, 
    Icon, 
    Grid, 
    Fab, 
    Button,
    IconButton
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

const WishListFrom = ({open, setOpen, type}) => {
    return (
        <>
            <Dialog fullScreen open={open}>
                <Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" px={1}>
                        <Box>
                            <DialogTitle id="form-dialog-title">{type} Savings</DialogTitle>
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                            <Box>
                                <IconButton onClick={() => setOpen(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box px={4}>
                    <WishListTextFields type={type} />
                </Box>
            </Dialog>
        </>
    )
}

export default WishListFrom
