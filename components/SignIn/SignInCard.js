import { useState } from  'react'

import { useRouter } from 'next/router'
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
    OutlinedInput
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import TitleLogo from '@components/Auth/TitleLogo'

import { toast } from 'react-toastify'

const SignInCard = () => {
    const router = useRouter()
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const signInHandler = async() => {
        const res = await signIn('credentials', {email: email, password: password, redirect: false})
        if (res?.error) toast.error(res.error)
        if (res.url) router.push('/')
    }

    return (
        <>
            <Box>
                <Card elevation={1} variant="outlined">
                    <CardContent>
                        <Box p={1}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box>
                                    <Typography variant="h3">Sign In</Typography>
                                </Box>
                                <Box pt={1}>
                                    <Typography variant="body1" color="secondary">One step closer to your financial independence!</Typography>
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
                            </Box>
                            <Box display="flex" justifyContent="flex-end" mt={1}>
                                <Typography variant="subtitle2" style={{color: '#0069d9'}} >Forgot password?</Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                style={{width: '100%', minHeight: '7vh'}}
                                onClick={signInHandler}
                                >Sign in</Button>
                            </Box>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Typography variant="subtitle2" color="secondary">Not a member yet? <span style={{color: '#0069d9'}}>Register</span></Typography>
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
