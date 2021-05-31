import React, { useState, useEffect } from 'react'

import { 
    Box, 
    TextField, 
    InputAdornment, 
    FormControl, 
    OutlinedInput, 
    InputLabel ,
    Button
} from '@material-ui/core'


const WishListTextFields = ({setOpen, type, add, data, edit, change, status, setStateStatus, del}) => {

    const [ subject, setSubject ] = useState( data.subject || '')
    const [ totalAmount, setTotalAmount ] = useState(data.totalAmount || null)
    const [ savingsAmount, setSavingsAmount ] = useState(data.savingsAmount || null)
    const [ currentAmount, setCurrentAmount ] = useState(data.currentAmount || '0')
    const [ disabled, setDisabled ] = useState(false)
    

    const onClickAdd = () => {
        setOpen(false)
        add(subject, totalAmount, savingsAmount)
        setSubject('')
        setTotalAmount(null)
        setSavingsAmount(null)
    }

    const onClickEdit = () => {
        setOpen(false)
        edit(data.id, subject, totalAmount, savingsAmount, currentAmount)
    }

    const onClickChange = () => {
        setDisabled(true)
        change(data.id)
        setStateStatus(!status)
        setTimeout(() => {
            setDisabled(false)
        }, 2000)
    }

    let viewBtns
    type.toLowerCase() === 'add' ? 
    viewBtns = (
        <Box>
            <Button variant="contained" color="primary" onClick={onClickAdd}>
                Add
            </Button>
        </Box>
    ) :
    viewBtns = (
        <>
            <Box>
                <Button variant="contained" style={{color: '#fff', backgroundColor: '#848E98'}} onClick={onClickChange} disabled={disabled}>
                    {status ? 'Hold' : 'Unhold'}
                </Button>
            </Box>
            <Box>
                <Button variant="contained" color="primary" onClick={onClickEdit}>
                    Edit
                </Button>
            </Box>
            <Box>
                <Button variant="contained" style={{color: '#fff', backgroundColor: '#c82333'}} onClick={() => { setOpen(false); del(data.id) }}>
                    Delete
                </Button>
            </Box>
        </>
    )

    return (
        <>
            <Box mt={2}>
                <TextField
                color="primary"
                variant="outlined"
                fullWidth
                label="Subject"
                value={subject || ""}
                onChange={event => setSubject(event.target.value)}
                />
            </Box>
            <Box mt={2}>
                <TextField
                color="primary"
                variant="outlined"
                fullWidth
                label="Total Amount"
                value={totalAmount || ""}
                onChange={event => setTotalAmount(event.target.value)}
                />
            </Box>
            <Box mt={2}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Savings Amount</InputLabel>
                    <OutlinedInput 
                        id="outlined-adornment-password"
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">/ month</InputAdornment>
                        }
                        value={savingsAmount || ""}
                        onChange={event => setSavingsAmount(event.target.value)}
                    />
                </FormControl>
            </Box>
            { type.toLowerCase() === 'edit' &&  
            <Box mt={2}>
                <TextField
                color="primary"
                variant="outlined"
                fullWidth
                label="Current Amount"
                value={currentAmount || ""}
                onChange={event => setCurrentAmount(event.target.value)}
                />
            </Box>}
            
            <Box display="flex" justifyContent="space-around" pt={5}>
                {viewBtns}
            </Box>
        </>
    )
}

export default WishListTextFields
