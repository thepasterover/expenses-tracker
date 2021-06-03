import React from 'react'

import { Box, TextField } from '@material-ui/core'

const DialogTextField = ({errorText, label, value, handler, helperErrorText, validator}) => {
    return (
        <>
            <Box mt={2}>
                <TextField 
                error={helperErrorText !== ''}
                helperText={helperErrorText}
                label={label}
                fullWidth
                color="primary"
                variant="outlined"
                value={value || ""}
                onChange={event => handler(event.target.value)}
                onBlur={event => validator(event.target.value)}
                />
            </Box>
        </>
    )
}

export default DialogTextField
