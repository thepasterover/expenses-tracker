import { useState } from  'react'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn } from 'next-auth/client'

import { 
    Box, 
    Typography, 
    Card, 
    CardContent,
    TextField,
    Button,
    Hidden,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import TitleLogo from '@components/Auth/TitleLogo'

import { toast } from 'react-toastify'

const SignInCard = () => {
    const router = useRouter()
    const [ disabled, setDisabled ] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const[errors, setErrors] = useState({
        emailError: '',
        passwordError: ''
    })
    
    const validateEmail = (email) => {
        const pattern = /\S+@\S+\.\S+/
        if(email === ''){
            setErrors({...errors,
                emailError: 'Email is required',
            })
            return
        } else if (!pattern.test(email)){
            setErrors({...errors,
                emailError: 'Enter a valid email',
            })
            return
        } else {
            setErrors({...errors,
                emailError: '',
            })
            return
        }
    }

    const validatePassword = (password) => {
        if(password === ''){
            setErrors({...errors,
                passwordError: 'Password is required'
            })
            return
        } else {
            setErrors({...errors,
                passwordError: ''
            })
            return
        }
    }
    
    const signInHandler = async() => {
        if(email === '' || password === ''){
            toast.error('Please fill the form!')
            validateEmail(email)
            validatePassword(password)
        } else if(errors.emailError !== '' || errors.passwordError !== ''){
            toast.error('Please fix the errors in the form!')
        } else {
            setDisabled(true)
            const res = await signIn('credentials', {email: email, password: password, redirect: false})
            if (res?.error) {
                toast.error(res.error)
                setDisabled(false)
            }
            if (res.url) {
                router.push('/dashboard')
            }
        }
    }

    return (
        <>
            <Box>
                <Card elevation={1} variant="outlined">
                    <CardContent>
                        <Box p={{xs: 0, sm: 1, md: 1}}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box>
                                    <Typography variant="h4">Sign In</Typography>
                                </Box>
                                <Box pt={1}>
                                    <Typography variant="subtitle2" color="secondary">One step closer to your financial independence!</Typography>
                                </Box>
                            </Box>
                            <Box mt={3}>
                                <Box>
                                    <TextField
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    value={email}
                                    onChange={event => { setEmail(event.target.value); validateEmail(event.target.value) }}
                                    error={errors.emailError !== ''}
                                    helperText={errors.emailError}
                                    />
                                </Box>
                                <Box mt={2}>
                                    <FormControl 
                                    variant="outlined" 
                                    fullWidth 
                                    error={errors.passwordError !== ''}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                        id="outlined-adornment-password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={event => {setPassword(event.target.value); validatePassword(event.target.value)}}
                                        onBlur={event => validatePassword(event.target.value)}
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
                            </Box>
                            <Box display="flex" justifyContent="flex-end" mt={1}>
                                <Link href='#' passHref>
                                    <Typography variant="subtitle2" style={{color: '#0069d9', cursor: 'pointer'}} >Forgot password?</Typography>
                                </Link>
                            </Box>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                style={{width: '100%', minHeight: '5vh'}}
                                onClick={signInHandler}
                                disabled={disabled}
                                >Sign in</Button>
                            </Box>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Typography variant="subtitle2" color="secondary">
                                    Don't have an account?&nbsp;
                                    <Link href='/signup' passHref>
                                        <span style={{color: '#0069d9', cursor: 'pointer'}}>
                                            Sign up
                                        </span>
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Hidden smDown>
                    <TitleLogo />
                </Hidden>
            </Box>
        </>
    )
}

export default SignInCard
