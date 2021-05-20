import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import theme from 'theme';

import { KeyboardDatePicker, DatePicker } from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const drawerWidth = 210;

const useStyles = makeStyles(() => ({
    appBar: {
        [theme.breakpoints.up('md')]:{
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    },
    navTitle: {
        flexGrow: 1
    },
    navIcon: {
        marginLeft: theme.spacing(2.5),
    }
}))

const MyAppBar = () => {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" edge="start" className={classes.appBar} color="default" elevation={0}>
                <Toolbar>
                    <Typography variant="h5" noWrap className={classes.navTitle}>
                        Dashboard 
                    </Typography>
                    <Icon onClick={() => setIsOpen(true)}>today</Icon>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            open={isOpen}
                            autoOk={false}
                            onClose={() => setIsOpen(false)}
                            disableToolbar
                            views={["year", "month"]}
                            value={selectedDate}
                            onChange={handleDateChange}
                            TextFieldComponent={() => null}
                        />
                    </MuiPickersUtilsProvider>
                    <Icon className={classes.navIcon}>notifications</Icon>
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default MyAppBar
