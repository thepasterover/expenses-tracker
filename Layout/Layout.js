import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'

import AppBar from '@components/Navigation/MyAppBar'
import Drawer from '@components/Navigation/MyDrawer'
import BottomDrawer from '@components/Navigation/BottomDrawer'

import { useSession } from 'next-auth/client'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchCategories } from '../store/category/action'

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


const Layout = ({children, fetchCategories}) => {
    const classes = useStyles();
    const [ session, loading ] = useSession()

    useEffect(() => {
      fetchCategories()
    }, [])


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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Layout)
