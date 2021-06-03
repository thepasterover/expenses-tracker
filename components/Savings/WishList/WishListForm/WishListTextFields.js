import React, { useState } from 'react'

import { 
    Box, 
    TextField, 
    InputAdornment, 
    FormControl, 
    OutlinedInput, 
    InputLabel ,
    Button,
    FormHelperText
} from '@material-ui/core'
import { toast } from 'react-toastify'


const WishListTextFields = ({setOpen, type, add, data, edit, change, status, setStateStatus, del}) => {

    const [ subject, setSubject ] = useState( data.subject || '')
    const [ totalAmount, setTotalAmount ] = useState(data.totalAmount || '')
    const [ savingsAmount, setSavingsAmount ] = useState(data.savingsAmount || '')
    const [ currentAmount, setCurrentAmount ] = useState(data.currentAmount || '')
    const [ disabled, setDisabled ] = useState(false)
    const [ errors, setErrors ] = useState({
        subjectError: '',
        totalAmountError: '',
        savingsAmountError: '',
        currentAmountError: ''
    })
    
    const validateSubject = (subject) => {
        if(subject === ''){
            setErrors({...errors, 
                subjectError: 'Subject is required!'
            })
            return
        } else if (subject.length <= 3) {
            setErrors({...errors, 
                subjectError: 'Subject must be greater than 3 characters!'
            })
            return
        } else if (subject.length >= 300) {
            setErrors({...errors, 
                subjectError: 'Subject must be less than 300 characters!'
            })
            return
        } else {
            setErrors({...errors, 
                subjectError: ''
            })
            return
        }
    }

    const validateTotalAmount = (totalAmount) => {
        if(totalAmount === ''){
            setErrors({...errors, 
                totalAmountError: 'Total Amount is required!'
            })
            return
        } else if (isNaN(totalAmount)) {
            setErrors({...errors, 
                totalAmountError: 'Total Amount must be a Number!'
            })
            return
        } else if(totalAmount <= 0) {
            setErrors({...errors, 
                totalAmountError: 'Total Amount cannot be less than or equal to 0!'
            })
            return
        } else {
            setErrors({...errors, 
                totalAmountError: ''
            })
            return
        }
    }

    const validateSavingsAmount = (savingsAmount) =>{
        if(savingsAmount === ''){
            setErrors({...errors, 
                savingsAmountError: 'Savings Amount is required!'
            })
            return
        } else if (isNaN(savingsAmount)) {
            setErrors({...errors, 
                savingsAmountError: 'Savings Amount must be a Number!'
            })
            return
        } else if(savingsAmount <= 0) {
            setErrors({...errors, 
                savingsAmountError: 'Savings Amount cannot be less than or equal to 0!'
            })
            return
        } else {
            setErrors({...errors, 
                savingAmountError: ''
            })
            return
        }
    }

    const validateCurrentAmount = (currentAmount) => {
        if(currentAmount === ''){
            setErrors({...errors, 
                currentAmountError: 'Current Amount is required!'
            })
            return
        } else if (isNaN(currentAmount)) {
            setErrors({...errors, 
                currentAmountError: 'Current Amount must be a Number!'
            })
            return
        } else if(savingsAmount <= 0) {
            setErrors({...errors, 
                currentAmountError: 'Current Amount cannot be less than or equal to 0!'
            })
            return
        } else {
            setErrors({...errors, 
                currentAmountError: ''
            })
            return
        }
    }

    const onClickAdd = () => {
        if(subject === '' || totalAmount === '' || savingsAmount === ''){
            toast.error('Please fix the errors in the form!')
            validateSubject(subject)
            validateTotalAmount(totalAmount)
            validateSavingsAmount(savingsAmount)
        } else if(errors.subjectError !== '' || errors.totalAmountError !== '' || errors.savingAmountError !== ''){
            toast.error('Please fix the errors in the form!')
        } else {
            setOpen(false)
            add(subject, totalAmount, savingsAmount)
            setSubject('')
            setTotalAmount(null)
            setSavingsAmount(null)
        }
    }

    const onClickEdit = () => {
        if(subject === '' || totalAmount === '' || savingsAmount === '' || currentAmount === ''){
            toast.error('Please fix the errors in the form!')
            validateSubject(subject)
            validateTotalAmount(totalAmount)
            validateSavingsAmount(savingsAmount)
            validateCurrentAmount(currentAmount)
        } else if(errors.subjectError !== '' || errors.totalAmountError !== '' || errors.savingAmountError !== '' || errors.currentAmountError){
            toast.error('Please fix the errors in the form!')
        } else {
            setOpen(false)
            edit(data.id, subject, totalAmount, savingsAmount, currentAmount)
        }
        
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
                error={errors.subjectError !== ''}
                helperText={errors.subjectError}
                onBlur={event => validateSubject(event.target.value)}
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
                error={errors.totalAmountError !== ''}
                helperText={errors.totalAmountError}
                onBlur={event => validateTotalAmount(event.target.value)}
                />
            </Box>
            <Box mt={2}>
                <FormControl variant="outlined" fullWidth error={errors.savingsAmountError !== ''}>
                    <InputLabel htmlFor="outlined-adornment-savings-amount">Savings Amount</InputLabel>
                    <OutlinedInput 
                        id="outlined-adornment-password"
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">/ month</InputAdornment>
                        }
                        value={savingsAmount || ""}
                        onChange={event => setSavingsAmount(event.target.value)}
                        onBlur={event => validateSavingsAmount(event.target.value)}
                    />
                </FormControl>
                <FormHelperText id='outlined-adornment-savings-amount' style={{color :'red'}}>{errors.savingsAmountError}</FormHelperText>
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
                error={errors.currentAmountError !== ''}
                helperText={errors.currentAmountError}
                onBlur={event => validateCurrentAmount(event.target.value)}
                />
            </Box>}
            
            <Box display="flex" justifyContent="space-around" pt={5}>
                {viewBtns}
            </Box>
        </>
    )
}

export default WishListTextFields
