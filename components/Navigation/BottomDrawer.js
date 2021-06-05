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



const BottomDrawer = ({ links, selectedIndex, setNav }) => {
    const classes = useStyles()
    const router = useRouter();

    const onLink = (item, index) => {
      setNav(item.name, index)
      router.push(item.link)
    };
    return (
        <>
        <Hidden smUp>
          <BottomNavigation
          value={selectedIndex} 
          className={classes.root} 
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
          >
            {links.map((item, index) => (
                <BottomNavigationAction key={index} icon={<Icon> {item.icon} </Icon>} label={item.name} onClick={() => onLink(item, index)}/>
            ))}
          </BottomNavigation>
        </Hidden>
        </>
    )
}

export default BottomDrawer
