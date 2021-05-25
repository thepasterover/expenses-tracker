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

const TransactionCard = ({ total, count, subTransactions, categories}) => {
    const classes = useStyles()
    const {category, color, icon} = categories.find(c => c._id.toLowerCase() === subTransactions[0].category.toLowerCase())

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
                  ₹{total}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        {subTransactions.map((t, index) => (
          <SubCards 
          key={index} 
          shouldHide={shouldHide} 
          subject={t.subject} 
          date={t.date.toString()} 
          color={color} 
          amount={t.amount} 
          />))}
        
      </Box>
      
    )
}

export default TransactionCard
