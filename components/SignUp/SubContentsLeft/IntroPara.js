import { Box, Typography } from '@material-ui/core'

import Typewriter from 'typewriter-effect' 

const IntroPara = () => {
    return (
        <>
            <Box mt={5}>
                <Typography variant="h3" style={{color: '#fff'}}>
                A Brilliant way to 
                <Typewriter 
                onInit={(typewriter)=> {
                    typewriter
                    .typeString("track and manage your Expenses.")
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString("get to your Financial Indpendence.")
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString("to look at your Finances.")
                    .start();
                }}
                />
                </Typography>
            </Box>
            <Box mt={5}>
                <Typography variant="subtitle1" style={{color: '#fff'}}>
                    Expendit is used by millions of users around the world to manage their expenses!
                </Typography>
            </Box>
        </>
    )
}

export default IntroPara
