import React from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import { Box, Typography, Card, CardContent, LinearProgress, Hidden } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
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

const WishListItem = () => {
    const classes = useStyles()
    return (
        <>
            <Box mt={1}>
                <Card elevation={0} className={classes.root}>
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between" alignContent="center" >
                            <Box flexShrink={2}>
                                <Typography variant="body1">
                                   <strong>Laptop</strong>
                                </Typography>
                                <Typography variant="subtitle2" className={classes.subtext}>
                                    ₹10k / month
                                </Typography>
                            </Box>
                            <Box flexGrow={1} mx={3}>
                                <Box display="flex" justifyContent="space-between" pb={1} >
                                    <Typography variant="body1">
                                        ₹150k
                                    </Typography>
                                    <Hidden xsDown>
                                        <Typography variant="caption" className={classes.subtext}>
                                            7 Months ago
                                        </Typography>
                                    </Hidden>
                                </Box>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </Box>
                            <Box flexShrink={1} alignSelf="flex-end">
                                <Typography variant="h6">
                                   <strong> ₹350k</strong>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default WishListItem
