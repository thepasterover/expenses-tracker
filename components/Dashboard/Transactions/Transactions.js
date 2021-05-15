import React, { useState } from 'react'

import Box from'@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers"

import TransactionCard from '@components/Dashboard/Transactions/TransactionCard'



const Transactions = () => {
    const [selectedDate, handleDateChange] = useState(new Date())
    const transactions = [
      {category: "Rents", count: 4, amount: 1800},
      {category: "Academics", count: 4, amount: 1800},
      {category: "Food", count: 2, amount: 1800},
      {category: "Travel", count: 4, amount: 1800},
      {category: "Entertainment", count: 4, amount: 1800},
      {category: "Shopping", count: 4, amount: 1800},
      {category: "Medicines", count: 4, amount: 1800},
      {category: "Others", count: 4, amount: 1800},
    ]

    return (
      <>
        {/* Header and Nav */}
        <Box display="flex" justifyContent="space-between" mt={4} mb={-1} >
            <Typography variant="h6">
              <strong>Transactions</strong>
            </Typography>
            <Box display="flex" justifyContent="center">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  variant="inline"
                  views={["year", "month"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                  autoOk
                  inputVariant="standard"
                />
              </MuiPickersUtilsProvider>
              {/* <Icon>expand_more</Icon> */}
            </Box>
        </Box>

        {/* Main Content */}
        {transactions.map((t, index) => <TransactionCard key={index} category={t.category} count={t.count} amount={t.amount} />)}
          
      </>
    )
}

export default Transactions
