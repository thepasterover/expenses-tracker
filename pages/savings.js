import React from 'react'

import TotalSavings from '@components/Savings/TotalSavings'
import WishList from '@components/Savings/WishList/WishList'

import { makeStyles } from '@material-ui/core/styles'

import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        top: 'auto',
        right: 50,
        bottom: 70,
        [theme.breakpoints.down('sm')]:{
            bottom: 70,
        },
        left: 'auto',
        position: 'fixed',
    }
}));

const savings = () => {
    const classes = useStyles();
    return (
        <>
            <TotalSavings />
            <WishList />
            <Fab color="primary" aria-label="add" className={classes.root}>
                <AddIcon />
            </Fab>
        </>
    )
}

export default savings
