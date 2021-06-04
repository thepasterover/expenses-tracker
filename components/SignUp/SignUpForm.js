import { makeStyles } from '@material-ui/core/styles'

import { Box, Hidden } from '@material-ui/core'

import SignUpCard from '@components/SignUp/SubContentsRight/SignUpCard'

import TitleLogo from '@components/SignUp/SubContentsLeft/TitleLogo'
import IntroPara from './SubContentsLeft/IntroPara'
import BottomLinks from '@components/Auth/BottomLinks'

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to left, #ff3378 50%, #fff 50%)',
        height: '100vh',
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: 'row',

        [theme.breakpoints.down('sm')]:{
            padding: '20px',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between",
            alignItems: 'center',
        }
    }
}))

const SignUpForm = () => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                    <Hidden mdUp>
                        <TitleLogo />
                    </Hidden>
                    <SignUpCard />
                    <Hidden smUp>
                        <BottomLinks signup={true} />
                    </Hidden>
                <Hidden smDown>
                    <Box display="flex" justifyContent="space-around" flexDirection="column" width={500}>
                        <TitleLogo />
                        <IntroPara />
                        <BottomLinks signup={true} />
                    </Box>
                </Hidden>
            </Box>
        </>
    )
}

export default SignUpForm
