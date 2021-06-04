import React, { useState } from 'react'

import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import { 
    CssBaseline, 
    AppBar, 
    Toolbar, 
    Typography, 
    Icon, 
    Avatar, 
    Menu,
    MenuItem,
    MenuList,
    Popper,
    Grow,
    Paper,
    ClickAwayListener  
} from '@material-ui/core'
import theme from 'theme';

import { signOut } from 'next-auth/client'

import { DatePicker } from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDate } from '../../store/date/action'

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
    },
    avatar: {
        cursor: 'pointer',
        width: 32,
        height: 32,
        marginLeft: theme.spacing(2.5),
    }
}))

const MyAppBar = ({date, setDate, title, avatar}) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    const handleDateChange = (date) => {
        setDate(date)
    }

    // Avatar Menu Handlers
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }

    setOpen(false);
    };

    const handleSignOut = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        signOut()
    }
    
    function handleListKeyDown(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
    }
    }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" edge="start" className={classes.appBar} color="default" elevation={0}>
                <Toolbar>
                    <Typography variant="h5" noWrap className={classes.navTitle}>
                        {title?.name}
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
                            maxDate={new Date()}
                        />
                    </MuiPickersUtilsProvider>
                    <Icon className={classes.navIcon} style={{cursor: 'pointer'}}>notifications</Icon>
                    <Avatar 
                    src={`https://expenditserver.herokuapp.com${avatar}`}
                    className={classes.avatar}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    />

                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <Link href='/profile'>
                                <MenuItem>Profile</MenuItem>
                            </Link>
                                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>


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
