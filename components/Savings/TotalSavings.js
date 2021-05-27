import React, { useEffect, useState } from 'react'

import { Box, Typography } from '@material-ui/core'

const getTotal = (wishLists, key) => {
    return wishLists.reduce((n, w) => n + parseInt(w[key]), 0) 
}

const TotalSavings = ({wishLists}) => {
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
            <Box mt={3} mx={2}>
                {info.map((inf, index) => (
                    <Box display="flex" justifyContent="flex-start" pt={1} key={index}>
                        <Box pr={4}>
                            <Typography variant="subtitle1" color="secondary">
                                {inf.key}
                            </Typography>
                        </Box>
                        <Box px={4}>
                            <Typography variant="subtitle1" color="secondary">
                                :
                            </Typography>
                        </Box>
                        <Box px={4}>
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
