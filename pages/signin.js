import React, { useState } from 'react'

import Image from 'next/image'
import Head from 'next/head'

import {  signIn, getSession } from 'next-auth/client'
import { Button, Divider, Grid, TextField, Typography } from '@material-ui/core'

import Box from '@material-ui/core/Box'


const signin = () => {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    return (
      <>
        <Head>
          <title>Sign In | Expenses Tracker</title>
        </Head>
        <Grid 
        container
        spacing={6} 
        align = "center"
        alignItems="center"
        justify="space-between"
        >
          <Grid item md={6} sm={12} >
            <Box pt={{xs: 2, md: 10}}>
              <Image 
              src='/financially_independent.jpg'
              height="435"
              width="725"
              />
              </Box>
          </Grid>
          <Divider />
          <Grid item md={6} sm={12} align="center" >
            <Box pt={{xs: 0, md: 8}}>
              <Box p={4}>
                <Box mb={1}>
                <Typography variant="h4">
                  Sign In
                </Typography>
                </Box>
                <Typography variant="h6" style={{color: '#848E98'}}>
                  Get your financial life in your hands!
                </Typography>
              </Box>
              <Box pb={2}>
                <TextField
                label="Email" 
                fullWidth
                color="primary"
                value={email}
                onChange={() => setEmail(event.target.value)}
                />
              </Box>
              <Box  pb={2}>
                <TextField
                label="Password" 
                fullWidth
                color="primary"
                value={password}
                onChange={() => setPassword(event.target.value)}
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button 
                color="primary" 
                variant="contained" 
                onClick={() => signIn('credentials', {email: email, password: password})}
                disableElevation
                >Sign In</Button>
                <Button style={{color: '#1976d2'}} size="small" inputprops={{style: {textTransform: 'capitalize'}}}>Forgot your password?</Button>
              </Box>
              </Box>
          </Grid>
        </Grid>
      </>
    )
}


export async function getServerSideProps(context) {
  try{
      const session = await getSession(context)
      if (session) {
          return {
              redirect: {
                destination: '/',
                permanent: false,
              },
            }
      }
      return {
          props: {  }
      }
  } catch(err) {
      console.log(err)
  }
}



export default signin

