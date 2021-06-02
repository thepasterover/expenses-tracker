import React, { useState } from 'react'

import { useRouter } from 'next/router'

import Link from 'next/link'

import { 
    Box, 
    Typography, 
    TextField,
    Button,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { axiosInstance } from '../../../axios'
import { toast } from 'react-toastify'

const SignUpCard = () => {

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    

    const signUpUser = async() => {
        try {
            setDisabled(true)
            const data = await axiosInstance.post('/auth/signup', {
                username: username,
                email: email,
                password: password
            })
            toast.success(data.message)
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
            router.push('/signin')
        } catch(err) {
            if(err.response){
                setDisabled(false)
                toast.error(err.response.data.error)
            }
        }
    }

    return (
        <>
            <Box>
                <Box p={{xs: 0, sm: 1, md: 1}}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box>
                            <Typography variant="h3">Sign Up</Typography>
                        </Box>
                        <Box pt={1}>
                            <Typography variant="body1" color="secondary">Get on track to your finanical independence</Typography>
                        </Box>
                    </Box>
                    <Box mt={3}>
                        <Box>
                            <TextField
                            color="primary"
                            variant="outlined"
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField
                            color="primary"
                            variant="outlined"
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            />
                        </Box>
                        <Box mt={2}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>setShowPassword(!showPassword)}
                                        onMouseDown={event => event.preventDefault()}
                                        edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}

                                        </IconButton>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-confirm-password">ConfirmPassword</InputLabel>
                                <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>setShowPassword(!showPassword)}
                                        onMouseDown={event => event.preventDefault()}
                                        edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}

                                        </IconButton>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            style={{width: '100%', minHeight: '7vh'}}
                            disabled={disabled}
                            onClick={signUpUser}
                            >Sign Up</Button>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Typography color="secondary">
                                Already have an account?&nbsp;
                                <Link href='/signin' passHref>
                                        <span style={{color: '#0069d9', cursor: 'pointer'}}>
                                            Sign In
                                        </span>
                                    </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SignUpCard
