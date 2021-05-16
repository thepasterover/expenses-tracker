import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Box from'@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'

import SubCards from '@components/Dashboard/Transactions/SubCards'

const useStyles = makeStyles((theme) => ({
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
  icon: {
    fontSize: "30px"
  },
  subtext: {
    color: '#848E98'
  }
}))

const transactionIcons = [
  {icon: 'business', color: '#ff3378', category: "Rents", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'school', color: '#68cfff', category: "Academics", transactions: [ {name: 'Exam Fees', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'restaurant', color: '#69C393', category: "Food", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'flight_takeoff', color: '#fdb574', category: "Travel", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'play_circle_filled', color: '#ffe100', category: "Entertainment", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'local_mall', color: '#e4a5fd', category: "Shopping", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'medical_services', color: 'red', category: "Medicines", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]},
  {icon: 'grid_view', color: '#F6C4C4', category: "Others", transactions: [ {name: 'Rent Given to landlord', date: new Date(), amount: '400' }, {name: 'Hello World', date:  new Date(), amount: '500'}]}
]

const TransactionCard = ({ category, count, amount}) => {
    const classes = useStyles()
    const transaction = transactionIcons.find(t => category.toLowerCase() === t.category.toLowerCase())
    const {color, icon, transactions} = transaction

    const [ shouldHide, setShouldHide ] = useState(true)

    return (
      <Box mt={3}>
        <Card className={classes.root} style={{borderLeft: `3px solid ${color}`}} elevation={0} onClick={() => {setShouldHide(!shouldHide)}}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Box flexShrink={1} p={1}>
                  <Icon style={{color: color}} className={classes.icon}>
                    {icon}
                  </Icon>
              </Box>
              <Box flexGrow={1} ml={2}>
                <Typography variant="body1">
                  <strong>{category}</strong>
                </Typography>
                <Typography variant="subtitle2" className={classes.subtext}>
                  {count} Transactions
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  ₹{amount}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        {transactions.map((t, index) => (<SubCards key={index} shouldHide={shouldHide} name={t.name} date={t.date.toString()} color={color} amount={t.amount} />))}
        
      </Box>
      
    )
}

export default TransactionCard
