import React, { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { axiosInstance } from '../axios'

import { getSession } from 'next-auth/client'

import { Grid, Box, Typography, TextField, Button } from '@material-ui/core'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

const signup = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const signUpUser = async() => {
      try {
        const data = await axiosInstance.post('/auth/signup', {
          name: name,
          email: email,
          password: password
        })
        router.push('/signin')
      } catch(err) {
        console.log(err)
      }
    }

    return (
      <>
        <Head>
            <title>SignUp | Expenses Tracker</title>
        </Head>
        <Grid 
        container
        spacing={6} 
        alignItems="center"
        justify="space-between"
        >
          
          <Grid item md={6} sm={12} >
            <Box pt={{xs: 0, md: 8}}>
            <Box p={4}>
              <Box>
                <Typography variant="h4">
                  Sign Up
                </Typography>
              </Box>
              <Typography variant="subtitle1" style={{color: '#848E98'}}>
                One step closer to your Financial Independence!
              </Typography>
            </Box>
            <Box p={4} mt={-6}>
              <Box pb={2}>
                <TextField
                label="Name" 
                fullWidth
                color="primary"
                value={name}
                onChange={() => setName(event.target.value)}
                />
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
              <Box  pb={2}>
                <TextField
                label="Confirm Password" 
                fullWidth
                color="primary"
                value={confirmPassword}
                onChange={() => setConfirmPassword(event.target.value)}
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button 
                  color="primary" 
                  variant="contained" 
                  disableElevation
                  onClick={signUpUser}
                >Sign Up</Button>
                <Button 
                color="primary" 
                disableElevation
                style={{color: '#0d6efd', textTransform: 'capitalize'}}
                
                >Already Registered? Login <ArrowForwardOutlinedIcon fontSize="small" style={{color: '#0d6efd'}} />
                </Button>
              </Box>
            </Box>  
            </Box>
          </Grid>
          <Grid item md={6} sm={12} >
            <Box pt={{xs: 2, md: 14}}>
              <Image 
                src='/signup.jpg'
                height="350"
                width="600"
              />
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

export default signup
