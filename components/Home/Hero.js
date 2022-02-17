import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Styles
import { 
    Box, 
    Hidden,
    Typography,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        width:  '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    boxSection1: {
       
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
        [theme.breakpoints.smDown]: {
            width: '100%',
            alignItems: 'center'
        },
        padding: '0px 25px'
    },
    boxSection2: {
        [theme.breakpoints.smDown]: {
            width: '0%',
        },
        padding: '0px 25px'
    },
    heroText: {
        fontWeight: '800'
    },
    subText: {
        paddingTop: '15px'
    },
    btn: {
        textTransform: 'none',
        borderRadius: '30px',
        marginTop: '15px',
        width: '170px',
        height:  '50px'
    },

}))



const Hero = () => {

    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box 
                display='flex'
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems='space-around'
                className={classes.boxSection1}
            >
                <Typography variant='h2' className={classes.heroText}>
                    Handle your money <br /> wisely!
                </Typography>
                <Typography variant='h6' className={classes.subText}>
                    An Online service with which will get rid of chaos in finances and get more profit
                    from your business
                </Typography>
                <Link href='/signup' passHref>
                    <Button 
                        className={classes.btn}
                        color="primary"
                        variant='contained'
                        disableElevation
                    >
                        Try for free
                    </Button>
                </Link>
            </Box>
            <Hidden smDown>
                <Box 
                    width={'40%'}
                    display='flex'
                    justifyContent={'center'}
                >
                    <Image 
                        src='/Piggy bank-pana.svg'
                        height={520}
                        width={520}
                    />
                </Box>
            </Hidden>
        </Box>
    )
}

export default Hero