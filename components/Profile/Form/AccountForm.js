import React, { useState } from 'react'

import TwoFields from '@components/Profile/Form/InfoFields/TwoFields'

import { Box, TextField, Button } from '@material-ui/core'

const AccountForm = ({ data, setFormData, update }) => {
    const [ disabled, setDisabled ] = useState(false)

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
        setDisabled(true)
        update()
        setTimeout(() => {
            setDisabled(false)
        }, 2500 * 10)
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
                onChange={event => { setFormData({...data, username: event.target.value}) }}
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
            />
            <TwoFields 
            label1={"Pincode"}
            label2={"Phone Number"}
            value1={data.pincode}
            value2={data.phone}
            handler1={handlePincode}
            handler2={handlePhone} 
            phone={true}
            />
            <Box display="flex" justifyContent="space-around" mt={3}>
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
