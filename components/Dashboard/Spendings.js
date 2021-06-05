import { makeStyles } from '@material-ui/core/styles'

import { Typography, Box } from '@material-ui/core'

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const useStyles = makeStyles(theme => ({
    root:{
        display: "flex", 
        alignItems:"center",
        flexWrap: "wrap",
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            flexDirection: 'column'
        }
    }
}))


const Spendings = ({ totalSpendingThisMonth, totalSpendingLastMonth }) => {

    const classes = useStyles()

    const difference = totalSpendingThisMonth - totalSpendingLastMonth
    let differenceView
    difference > 0 ? 
    differenceView = (
        <Typography variant="h6" color="error">
            {difference}₹
            <ArrowUpwardIcon style={{fontSize: '16px'}} />
        </Typography>
    ) : 
    differenceView = (
        <Typography variant="h6" style={{ color: '#28A745' }}>
            {difference}₹
            <ArrowDownwardIcon style={{fontSize: '16px'}} />
        </Typography>
    )
    return (
        <>
            <Box className={classes.root} mb={3} ml={2}>
                <Box>
                    <Typography variant="h6" color="secondary">Total Spending: </Typography>
                </Box>
                <Box display="flex" mt={{xs: 2, sm: 2, md: 0}} alignItems="center">
                    <Box pl={{ xs:1, sm:1, md:2}} pr={{ xs:1, sm:1, md:2}} >
                        <Typography variant="h3">₹ {totalSpendingThisMonth} </Typography>
                    </Box>
                    <Box>
                        {differenceView}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Spendings
