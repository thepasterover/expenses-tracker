import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import theme from 'theme';

import { DatePicker } from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDate } from '../../store/date/action'

import Button from '@material-ui/core/Button'

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

const MyAppBar = ({date, setDate}) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    
    const handleDateChange = (date) => {
        setDate(date)
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" edge="start" className={classes.appBar} color="default" elevation={0}>
                <Toolbar>
                    <Typography variant="h5" noWrap className={classes.navTitle}>
                        Dashboard 
                    </Typography>
                    <Icon onClick={() => setIsOpen(true)} style={{cursor: 'pointer'}}>today</Icon>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            open={isOpen}
                            autoOk={true}
                            onClose={() => setIsOpen(false)}
                            disableToolbar
                            views={["year", "month"]}
                            value={selectedDate}
                            onChange={handleDateChange}
                            TextFieldComponent={() => null}
                        />
                    </MuiPickersUtilsProvider>
                    <Icon className={classes.navIcon} style={{cursor: 'pointer'}}>notifications</Icon>
                </Toolbar>
            </AppBar> 
        </>
    )
}

const mapStateToProps = (state) => ({
    date: state.date.date,
})

const mapDispatchToProps = (dispatch) => {
    return {
      setDate: bindActionCreators(setDate, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar)
