import React, { useState } from 'react'

import { 
    Box, 
    TextField, 
    InputAdornment, 
    FormControl, 
    OutlinedInput, 
    InputLabel ,
    Button
} from '@material-ui/core'


const WishListTextFields = ({type}) => {

    const [ subject, setSubject ] = useState('')
    const [ totalAmount, setTotalAmount ] = useState()
    const [ savingsAmount, setSavingsAmount ] = useState()
    const [ currentAmount, setCurrentAmount ] = useState()

    let viewBtns
    type.toLowerCase() === 'add' ? 
    viewBtns = (
        <Box>
            <Button variant="contained" color="primary">
                Add
            </Button>
        </Box>
    ) :
    viewBtns = (
        <>
            <Box>
                <Button color="primary" variant="contained" style={{color: '#fff', backgroundColor: '#848E98'}}>
                    Hold
                </Button>
            </Box>
            <Box>
                <Button variant="contained" color="primary">
                    Edit
                </Button>
            </Box>
            <Box>
                <Button color="error" variant="contained" style={{color: '#fff', backgroundColor: '#c82333'}}>
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
            { type.toLowerCase() === 'add' &&  
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
