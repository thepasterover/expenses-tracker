import React, { useState } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Link from 'next/link'

import MuiListItem from '@material-ui/core/ListItem';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiListItemIcon-root':{
      color: '#1b1f2d',
    },
  },

}))

const ListItem = withStyles({
  root:{
    "&$selected": {
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main
      },
      color: theme.palette.primary.main,
      backgroundColor: '#ffedf1',
      borderRight: `3px solid ${theme.palette.primary.main}`,
    },
    "&:hover": {
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main
      },
      color: theme.palette.primary.main,
      backgroundColor: '#ffedf1',
      borderRight: `3px solid ${theme.palette.primary.main}`,
    }
  },
  selected: {}
})(MuiListItem)

const NavItems = ({ links, selectedLink }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState((selectedLink < 0 ? null : selectedLink))

    const handlingItemClick = (event, index) => {
      setSelectedIndex(index)
    }

    return (
        <div className={classes.root}>
          <List component="nav">
            {links.map((text, index) => (
            <Box pt={4} key={text.name}>
                <Link href={text.link} passHref>
                    <ListItem 
                    button 
                    selected={index === selectedIndex} 
                    onClick={event => handlingItemClick(event, index)}
                    style={{height: '45px'}}
                    >
                      <ListItemIcon>
                          <Icon style={{fontSize: 22}}>{text.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText primary={text.name}  />
                    </ListItem>
                </Link>
              </Box>
              ))}
          </List>
        </div>
    )
}

export default NavItems
