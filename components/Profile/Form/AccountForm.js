import React, { useState } from 'react'

import TwoFields from '@components/Profile/Form/InfoFields/TwoFields'

import { Box, TextField, Button, InputAdornment } from '@material-ui/core'

const AccountForm = () => {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ state, setState ] = useState('')
    const [ city, setCity ] = useState('')
    const [ pincode, setPincode ] = useState('')
    const [ phone, setPhone ] = useState('')

    return (
        <>
            <TwoFields
            label1={"First Name"}
            label2={"Last Name"}
            value1={firstName}
            value2={lastName}
            handler1={setFirstName}
            handler2={setLastName} 
            />
            <Box mt={3}>
                <TextField 
                color="primary"
                variant="outlined"
                label="Email"
                fullWidth
                />
            </Box>
            <Box mt={3}>
                <TextField 
                color="primary"
                variant="outlined"
                label="Address"
                fullWidth
                />
            </Box>
            <TwoFields 
            label1={"City"}
            label2={"State"}
            value1={city}
            value2={state}
            handler1={setCity}
            handler2={setState} 
            />
            <TwoFields 
            label1={"Pincode"}
            label2={"Phone Number"}
            value1={pincode}
            value2={phone}
            handler1={setPincode}
            handler2={setPhone} 
            phone={true}
            />
            <Box display="flex" justifyContent="space-around" mt={3}>
                <Button variant="contained" color="primary">
                    Save
                </Button>
                <Button style={{color: '#0069d9'}}>
                    Reset Password
                </Button>
            </Box>
        </>
    )
}

export default AccountForm
