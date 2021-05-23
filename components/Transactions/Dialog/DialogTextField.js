import React from 'react'

import { Box, TextField } from '@material-ui/core'

const DialogTextField = ({errorText, label, value, handler}) => {
    return (
        <>
            <Box mt={2}>
                <TextField 
                error={false}
                helperText={errorText}
                label={label}
                fullWidth
                color="primary"
                variant="outlined"
                value={value || ""}
                onChange={event => handler(event.target.value)}
                />
            </Box>
        </>
    )
}

export default DialogTextField
