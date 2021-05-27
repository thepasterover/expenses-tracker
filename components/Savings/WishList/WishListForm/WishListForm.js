import React, { useState } from 'react'

import WishListTextFields from './WishListTextFields'

import {
    Box, 
    Dialog, 
    DialogTitle,
    IconButton
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

const WishListFrom = ({ open, setOpen, type, data, add, edit, change, status, setStateStatus, del}) => {
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
                    <WishListTextFields
                    setOpen={setOpen} 
                    type={type}
                    data={data} 
                    add={add} 
                    edit={edit}
                    change={change}
                    status={status}
                    setStateStatus={setStateStatus}
                    del={del}
                    />
                </Box>
            </Dialog>
        </>
    )
}

export default WishListFrom
