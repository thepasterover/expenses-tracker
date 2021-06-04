import React, { useEffect, useState } from 'react';

import AppBar from '@components/Navigation/MyAppBar'
import Drawer from '@components/Navigation/MyDrawer'
import BottomDrawer from '@components/Navigation/BottomDrawer'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchCategories } from '../store/category/action'
import { toast } from 'react-toastify';


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

const navLinks = [
  {name: 'Dashboard', link: '/', icon: 'dashboard'}, 
  {name: 'Transactions', link: '/transactions', icon: 'credit_card'}, 
  {name: 'Savings', link: '/savings', icon: 'savings'}, 
  {name: 'Profile', link: '/profile', icon: 'portrait'}
]


const Layout = ({children, fetchCategories}) => {
    const router = useRouter()
    const classes = useStyles();
    const [ session, loading ] = useSession()
    const [selectedLink, setSelectedLink ] = useState(navLinks.findIndex(l => l.link === router.pathname) )
    const selectedTitle = navLinks.find(l => l.link === router.pathname) || 'Title'
    const avatarUrl = session?.user?.avatar?.url ? session.user.avatar.url : '/public/images/avatars/default.jpg'

    useEffect(() => {
      try {
          fetchCategories()
      } catch(err) {
        if(session){
          toast.error('Categories could not be loaded. Please refresh the page or check your internet connection!')
        }
      }
    }, [])


    if (loading) return <p>loading</p>

    
    if(!loading && !session){
      return (
        <div>
            {children}
        </div>
      )
    }

    return (
        <div className={classes.root}>
        <AppBar 
        title={selectedTitle}
        avatar={avatarUrl}
        />
        <Drawer 
        links={navLinks}
        selectedLink={selectedLink}
        />
        <main className={classes.content}>
            <div className={classes.toolbar} />
              <Container>
                {children}
              </Container>
        </main>
      <BottomDrawer 
      links={navLinks}
      selectedLink={selectedLink}
      />
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Layout)
