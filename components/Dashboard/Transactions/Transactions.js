import React, { useState } from 'react'

import Box from'@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'


import TransactionCard from '@components/Dashboard/Transactions/TransactionCard'



const Transactions = ({ date, groupedTransactions, categories }) => {
    return (
      <>
        {/* Header and Nav */}
        <Box display="flex" justifyContent="space-between" mt={4} mb={-1} >
            <Typography variant="h6">
              <strong>Transactions</strong>
            </Typography>
            <Typography variant="h6">
              {date.toString()}
            </Typography>
        </Box>

        {/* Main Content */}
        {groupedTransactions.length > 0 && categories.length > 0
        ? 
        groupedTransactions.map((t, index) => 
        <TransactionCard 
        key={index} 
        total={t.totalAmount}
        count={t.transactions.length}
        categories={categories}
        subTransactions={t.transactions} 
        />)
        :
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
        >
          <Typography variant="h6" align="center">No Transactions to show</Typography>
        </Box>
        }
          
      </>
    )
}

export default Transactions
