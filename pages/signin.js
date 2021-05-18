import React from 'react'
import {  signIn } from 'next-auth/client'
import { Box, TextField } from '@material-ui/core'



const signin = () => {
    return (
      <>
        <Box>
            <TextField
            label="Email" 
            fullWidth
            color="primary"
            />
            <TextField
            label="Password" 
            fullWidth
            color="primary"
            />
            <button onClick={() => signIn('credentials', {user: 'hello'})}>Sign in</button>
        </Box>
      </>
    )
}


export default signin
