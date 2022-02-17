import React from 'react'
import Link from 'next/link'

// Styles:
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btn: {
        textTransform: 'none',
        borderRadius: '20px',
        marginLeft: '10px'
    },
    title: {
      flexGrow: 1,
      fontWeight: 800
    },
}));

const NavBar = () => {

    const classes = useStyles()

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" elevation={0} color="default">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Expendit
                        </Typography>
                        <Link href='/signin' passHref>
                            <Button 
                                className={classes.btn}
                                color="primary"
                                variant='contained'
                                disableElevation
                            >
                                Sign In
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}

export default NavBar