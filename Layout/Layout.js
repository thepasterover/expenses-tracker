import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'

import AppBar from '@components/Navigation/MyAppBar'
import Drawer from '@components/Navigation/MyDrawer'
import BottomDrawer from '@components/Navigation/BottomDrawer'

import { useSession } from 'next-auth/client'

import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]:{
        paddingBottom: theme.spacing(10)
      },
    },
}));


const Layout = ({children}) => {
    const classes = useStyles();
    const [ session, loading ] = useSession()
    if (loading) return null

    if(!loading && !session){
      return (
        <main className={classes.content}>
          <Container>
            {children}
          </Container>
        </main>
      )
    }

    return (
        <div className={classes.root}>
        <AppBar />
        <Drawer />
        <main className={classes.content}>
            <div className={classes.toolbar} />
              <Container>
                {children}
              </Container>
        </main>
      <BottomDrawer />
    </div>
    )
}

export default Layout
