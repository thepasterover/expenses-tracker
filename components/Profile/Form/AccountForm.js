import React, { useState } from 'react'

import TwoFields from '@components/Profile/Form/InfoFields/TwoFields'

import { Box, TextField, Button } from '@material-ui/core'
import { toast } from 'react-toastify';

const hasNumber = (myString) => {
    return /\d/.test(myString);
}

const AccountForm = ({ data, setFormData, update }) => {
    const [ disabled, setDisabled ] = useState(false)
    const [errors, setErrors] = useState({
        usernameError: '',
        cityError: '',
        stateError: '',
        pincodeError: '',
        phoneError: ''
    })


    // Validation
    const validateUsername = (username) => {
        if(username === ''){
            setErrors({...errors, 
                usernameError: 'Username is required'
            })
        } else if (username.length >= 20) {
            setErrors({...errors,
                usernameError: 'Username cannot be greater than 20 characters!'
            })
            return
        } else if ( username.length < 3 ){
            setErrors({...errors,
                usernameError: 'Username must be minimum 3 characters long!'
            })
            return
        } else {
            setErrors({...errors,
                usernameError: ''
            })
        }
    }

    const validateCity = (city) => {
        if(hasNumber(city)){
            setErrors({...errors,
                cityError: 'City name cannot have numbers!'
            })
        } else if(city.length > 20){
            setErrors({...errors,
                cityError: 'City name cannot be more than 20 characters long!'
            })
        } else {
            setErrors({...errors,
                cityError: ''
            })
        }
    }

    const validateState = (state) => {
        if(hasNumber(state)){
            setErrors({...errors,
                stateError: 'City name cannot have numbers!'
            })
        } else if(state.length > 20){
            setErrors({...errors,
                stateError: 'City name cannot be more than 20 characters long!'
            })
        } else {
            setErrors({...errors,
                cityError: ''
            })
        }
    }

    const validatePincode = (pincode) => {
        if(isNaN(pincode)){
            setErrors({...errors,
                pincodeError: 'Enter a valid pincode!'
            })
        } else if(pincode.length > 6){
            setErrors({...errors,
                pincodeError: 'Pincode cannot be more than 6 characters!'
            })
        } else {
            setErrors({...errors,
                pincodeError: ''
            })
        }
    }

    const validatePhone = (phone) => {
        if(isNaN(phone)){
            setErrors({...errors,
                phoneError: 'Enter a valid pincode!'
            })
        } else if(phone.length > 10){
            setErrors({...errors,
                phoneError: 'Pincode cannot be more than 6 characters!'
            })
        } else {
            setErrors({...errors,
                phoneError: ''
            })
        }
    }

    const handleCity = (value) => {
        setFormData({...data, city: value})
    }

    const handleState = (value) => {
        setFormData({...data, state: value})
    }

    const handlePincode = (value) => {
        setFormData({...data, pincode: value})
    }

    const handlePhone = (value) => {
        setFormData({...data, phone: value})
    }

    const handleSave = () => {
        if(data.username === ''){
            toast.error('Please fix the errors in the form!')
        } else if(errors.usernameError !== '' 
        || errors.cityError !== '' 
        || errors.phoneError !== '' 
        || errors.pincodeError !== '' 
        || errors.phoneError !== '') {
            toast.error('Please fix the errors in the form!')
        } else {
            setDisabled(true)
            update()
            setTimeout(() => {
                setDisabled(false)
            }, 2500 * 10)
        }
    }

    return (
        <>
            <Box mt={3}>
                <TextField 
                color="primary"
                variant="outlined"
                label="Email"
                fullWidth
                helperText="Read Only"
                value={data.email}
                inputProps={{
                    readOnly: true,
                }}
                />
            </Box>
            <Box mt={3}>
                <TextField 
                color="primary"
                variant="outlined"
                label="Username"
                fullWidth
                value={data.username}
                onChange={event => { setFormData({...data, username: event.target.value}); validateUsername(event.target.value) }}
                error={errors.usernameError !== ''}
                helperText={errors.usernameError}
                />
            </Box>
            <Box mt={3}>
                <TextField 
                color="primary"
                variant="outlined"
                label="Address"
                fullWidth
                value={data.address}
                onChange={event => { setFormData({...data, address: event.target.value}) }}
                />
            </Box>
            <TwoFields 
            label1={"City"}
            label2={"State"}
            value1={data.city}
            value2={data.state}
            handler1={handleCity}
            handler2={handleState}
            errorText1={errors.cityError}
            errorText2={errors.stateError}
            validator1={validateCity}
            validator2={validateState}
            />
            <TwoFields 
            label1={"Pincode"}
            label2={"Phone Number"}
            value1={data.pincode}
            value2={data.phone}
            handler1={handlePincode}
            handler2={handlePhone} 
            phone={true}
            errorText1={errors.pincodeError}
            errorText2={errors.stateError}
            validator1={validatePincode}
            validator2={validatePhone}
            />
            <Box display="flex" justifyContent="space-around" mt={4}>
                <Button variant="contained" color="primary" disabled={disabled} onClick={handleSave}>
                    Save
                </Button>
                {/* <Button style={{color: '#0069d9'}}>
                    Reset Password
                </Button> */}
            </Box>
        </>
    )
}

export default AccountForm
