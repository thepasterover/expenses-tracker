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
    OutlinedInput,
    FormHelperText
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
    const [errors, setErrors] = useState({
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '' 
    })

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
    
    const validateEmail = (email) => {
        const pattern = /\S+@\S+\.\S+/
        
        if(email === ''){
            setErrors({...errors, 
                emailError: 'Email is required!'
            })
            return
        } else if (!pattern.test(email)){
            setErrors({...errors,
                emailError: 'Enter a valid email!',
            })
            return
        } else {
            setErrors({...errors,
                emailError: ''
            })
            return
        }
    }

    const validatePassword = (password) => {
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if(password === ''){
            setErrors({...errors,
                passwordError: 'Password is required!'
            })
            return
        } else if (password.length >= 50) {
            setErrors({...errors,
                passwordError: 'Password cannot be greater than 50 characters!'
            })
            return
        } else if ( password.length < 8 ){
            setErrors({...errors,
                passwordError: 'Password must be minimum 8 characters long!'
            })
            return
        } 
        else if(!pattern.test(password)){
            setErrors({...errors,
                passwordError: 'Password must contain one uppercase and lowercase letter, one digit and one special letter!'
            })
            return
        } else if (password === confirmPassword){
            setErrors({...errors, 
                confirmPasswordError: ''
            })
            return
        } else {
            setErrors({...errors,
                passwordError: ''
            })
            return
        }
    }

    const validateConfirmPassword = (confirmPasswordValue) => {
        if(confirmPasswordValue === ''){
            setErrors({...errors,
                confirmPasswordError: 'Confirm Password is required!'
            })
            return
        } else if(password !== confirmPasswordValue) {
            setErrors({...errors,
                confirmPasswordError: 'Password and Confirm Password does not match!'
            })
            return
        } else {
            setErrors({...errors,
                confirmPasswordError: ''
            })
            return
        }
    }

    const signUpUser = async() => {
        try {
            if(username === '' || email === '' || password === '' || confirmPassword === ''){
                toast.error('Please fill the form!')
            } else if(errors.usernameError !== '' || errors.emailError !== '' || errors.passwordError !== '' || errors.confirmPasswordError !== ''){
                toast.error('Please fix the errors in the form!')
                setDisabled(true)
            } else {
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
            }
        } catch(err) {
            if(err.response){
                setDisabled(false)
                toast.error(err.response.data.error)
            } else {
                toast.error('Something went wrong!')
            }
        }
    }

    return (
        <>
            <Box>
                <Box p={{xs: 0, sm: 1, md: 1}}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box>
                            <Typography variant="h4">Sign Up</Typography>
                        </Box>
                        <Box pt={1}>
                            <Typography variant="subtitle2" color="secondary">Get on track to your finanical independence</Typography>
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
                            onChange={event => {setUsername(event.target.value); validateUsername(event.target.value)}}
                            error={errors.usernameError !== ''}
                            helperText={errors.usernameError}
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField
                            color="primary"
                            variant="outlined"
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={event => {setEmail(event.target.value); validateEmail(event.target.value)}}
                            error={errors.emailError !== ''}
                            helperText={errors.emailError}
                            />
                        </Box>
                        <Box mt={2} style={{maxWidth: '330px'}}>
                            <FormControl variant="outlined" fullWidth error={errors.passwordError !== ''}>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={event => {setPassword(event.target.value); validatePassword(event.target.value)}}
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
                                <FormHelperText id='outlined-adornment-password'>{errors.passwordError}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl variant="outlined" fullWidth error={errors.confirmPasswordError !== ''}>
                                <InputLabel htmlFor="outlined-adornment-confirm-password">ConfirmPassword</InputLabel>
                                <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={event => {setConfirmPassword(event.target.value); validateConfirmPassword(event.target.value)}}
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
                                <FormHelperText id='outlined-adornment-confirm-password'>{errors.confirmPasswordError}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            style={{width: '100%', minHeight: '5vh'}}
                            disabled={disabled}
                            onClick={signUpUser}
                            >Sign Up</Button>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Typography color="secondary" variant="subtitle2">
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
