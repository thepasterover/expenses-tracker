import React, { useState } from 'react'

import WishListForm from './WishListForm/WishListForm'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import { Box, Typography, Card, CardContent, LinearProgress, Hidden } from '@material-ui/core'

import { format } from 'date-fns'

const useStyles = makeStyles(theme => ({
    root: {
        borderLeft: '3px solid #ff3378', 
        borderRadius: '3px', 
        maxHeight: '70px',
        transition: "transform 0.10s ease-in-out",
        "&:hover": {
        transform: "scale3d(1.02, 1.02, 1)" 
        },
        cursor: 'pointer'
    },
    subtext: {
        color: '#848E98'
    },
}))

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 5,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main[theme.palette.type === 'light' ? 800 : 1200],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main,
    },
}))(LinearProgress)

const kFormatter = (num) =>  {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const getProgess = (currentAmount, totalAmount) => {
    return Math.round((currentAmount / totalAmount) * 100)
}

const getStatusColor = (status) => status ? '#81cb92' : '#DF4857'

const WishListItem = ({ id, date, subject, totalAmount, savingsAmount, currentAmount, status, edit, change, del }) => {
    const [open, setOpen] = useState(false)
    const [ stateStatus, setStateStatus ] = useState((status !== undefined) ? status : '')
    const classes = useStyles()
    return (
        <>
            <Box mt={4}>
                <Card 
                elevation={0} 
                className={classes.root} 
                style={{borderLeft: `3px solid ${getStatusColor(stateStatus)}`}}
                onClick={() => setOpen(true)}
                >
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between" alignContent="center" >
                            <Box flexShrink={2}>
                                <Typography variant="body1">
                                   <strong>{subject}</strong>
                                </Typography>
                                <Typography variant="subtitle2" className={classes.subtext}>
                                    ₹{kFormatter(savingsAmount)} / month
                                </Typography>
                            </Box>
                            <Box flexGrow={1} mx={3}>
                                <Box display="flex" justifyContent="space-between" pb={1} >
                                    <Typography variant="body1">
                                        ₹{kFormatter(currentAmount)}
                                    </Typography>
                                    <Hidden xsDown>
                                        <Typography variant="caption" className={classes.subtext}>
                                            {format(new Date(date), 'PPp')}
                                        </Typography>
                                    </Hidden>
                                </Box>
                                <BorderLinearProgress variant="determinate" value={getProgess(currentAmount, totalAmount)} />
                            </Box>
                            <Box flexShrink={1} alignSelf="flex-end">
                                <Typography variant="h6">
                                   <strong> ₹{kFormatter(totalAmount)}</strong>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <WishListForm 
            open={open}
            setOpen={setOpen}
            type='Edit'
            data={{
                id,
                subject,
                totalAmount,
                savingsAmount,
                currentAmount,
                status
            }}
            status={stateStatus}
            setStateStatus={setStateStatus}
            edit={edit}
            change={change}
            del={del}
            />
        </>
    )
}

export default WishListItem
