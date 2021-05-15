import React, { useState } from 'react'

import { useRouter } from "next/router";

import { makeStyles } from '@material-ui/core/styles'

import { BottomNavigation, BottomNavigationAction, Hidden, Icon } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#fff' //theme.palette.primary.main,
  },
  label: {
    fontSize: '10px'
  }
}))

const navItems = [
  {name: 'Dashboard', link: '/', icon: 'dashboard'}, 
  {name: 'Transactions', link: '/posts', icon: 'credit_card'}, 
  {name: 'Savings', link: '/posts', icon: 'savings'}, 
  {name: 'Profile', link: '/posts', icon: 'portrait'}
]


const BottomDrawer = () => {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const router = useRouter();

    const onLink = (href) => {
      router.push(href);
    };
    return (
        <>
        <Hidden smUp>
          <BottomNavigation
          value={value} 
          className={classes.root} 
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          >
            {navItems.map((item, index) => (
                <BottomNavigationAction key={index} icon={<Icon> {item.icon} </Icon>} label={item.name} onClick={() => onLink(item.link)}/>
            ))}
            
            {/* <BottomNavigationAction icon={<Icon> credit_card </Icon>} label="Transactions"/>
            <BottomNavigationAction icon={<Icon> savings </Icon>} label="Savings" />
            <BottomNavigationAction icon={<Icon> portrait </Icon>} label="Profile" /> */}
          </BottomNavigation>
        </Hidden>
        </>
    )
}

export default BottomDrawer
