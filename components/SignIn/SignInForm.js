import Image from 'next/image'

import TitleLogo from '@components/Auth/TitleLogo'
import SignInCard from '@components/SignIn/SignInCard'
import BottomLinks from '@components/Auth/BottomLinks'

import { makeStyles } from '@material-ui/core/styles'

import { 
    Box, 
    Hidden
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to left, #fff 50%, #ff3378 50%)',
        height: '100vh',
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: 'row',

        [theme.breakpoints.down('sm')]:{
            padding: '20px',
            background: '#ff3378',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-around",
            alignItems: 'center',

        }
    },

}))

const SignInForm = () => {
    const classes = useStyles()

    return (
        <>
            <Box 
            className={classes.root}
            >   
                <TitleLogo />

                <SignInCard />

                <Hidden mdUp>
                    <BottomLinks />
                </Hidden>

                <Hidden smDown>
                    <Box>
                        <Image
                        src='/signin.svg'
                        height={520}
                        width={520}
                        />
                        <BottomLinks />
                    </Box>
                </Hidden>
            </Box>
        </>
    )
}

export default SignInForm
