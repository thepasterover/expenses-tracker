import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'

import NavItems from './NavItems'

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      spacing: 8
}))



const MyDrawer = ({links, selectedLink}) => {

    const classes = useStyles();

    return (
        <>
          <Hidden xsDown>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
            > 
              <div className={classes.toolbar} >
                <Grid container justify = "center" alignItems="center" direction="row" style={{ minHeight: '10vh' }}>
                    <Typography variant="h6" color="primary"> Moneyit </Typography>
                </Grid>
              </div>
              <Box pl={2}>
                <NavItems links={links} selectedLink={selectedLink} />
              </Box>
          </Drawer>
        </Hidden>   
        </>
    )
}

export default MyDrawer
