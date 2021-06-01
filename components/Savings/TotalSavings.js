import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles' 

import { Box, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    info_space: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start'
        }
    }
}))

const getTotal = (wishLists, key) => {
    return wishLists.reduce((n, w) => n + parseInt(w[key]), 0) 
}

const TotalSavings = ({wishLists}) => {
    const classes = useStyles()
    const [ totalAmount, setTotalAmount ] = useState(0)
    const [ totalSavingsAmount, setSavingsTotalAmount ] = useState(0)
    const [ totalCurrentAmount, setCurrentTotalAmount ] = useState(0)

    useEffect(() => {
        setTotalAmount( getTotal(wishLists, 'total_amount'))
        setSavingsTotalAmount(getTotal(wishLists, 'savings_amount'))
        setCurrentTotalAmount(getTotal(wishLists, 'current_amount'))
    }, [wishLists])

    const info = [
        {key: 'Total Amount', value: totalAmount},
        {key: 'Savings Amount', value: totalSavingsAmount},
        {key: 'Current Amount', value: totalCurrentAmount},
    ]
    return (
        <>
            <Typography variant="h5">
                Savings
            </Typography>
            <Box mt={3}>
                {info.map((inf, index) => (
                    <Box display="flex" className={classes.info_space} pt={1} key={index}>
                        <Box pr={{xs: 0, sm: 3, md: 4}}>
                            <Typography variant="subtitle1" color="secondary">
                                {inf.key}
                            </Typography>
                        </Box>
                        <Box px={{xs: 0, sm: 3, md: 4}}>
                            <Typography variant="subtitle1" color="secondary">
                                :
                            </Typography>
                        </Box>
                        <Box px={{xs: 0, sm: 3, md: 4}}>
                            <Typography variant="subtitle1">
                                ₹{inf.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {index === 1 && <span >/ month</span>}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                
            </Box>
        </>
    )
}

export default TotalSavings
