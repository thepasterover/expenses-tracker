import { Typography, Box } from '@material-ui/core'

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Spendings = ({ totalSpendingThisMonth, totalSpendingLastMonth }) => {

    const difference = totalSpendingThisMonth - totalSpendingLastMonth
    let differenceView
    difference > 0 ? 
    differenceView = (
        <Typography variant="subtitle1" color="error">
            ₹{difference}
            <ArrowUpwardIcon style={{fontSize: '16px'}} />
        </Typography>
    ) : 
    differenceView = (
        <Typography variant="subtitle1" style={{ color: '#28A745' }}>
            ₹{difference}
            <ArrowUpwardIcon style={{fontSize: '16px'}} />
        </Typography>
    )
    return (
        <>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography variant="h5" color="secondary">Total Spending: </Typography>
                </Box>
                <Box pl={2} pr={1}>
                    <Typography variant="h4">₹ {totalSpendingThisMonth} </Typography>
                </Box>
                <Box>
                    {differenceView}
                </Box>
            </Box>
        </>
    )
}

export default Spendings
