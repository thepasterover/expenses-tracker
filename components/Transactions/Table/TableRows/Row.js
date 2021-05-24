import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { TableRow, TableCell, Box, Typography, Icon } from '@material-ui/core'
import { format } from 'date-fns'

import Dialog from '../../Dialog/Dialog'

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: 'pointer'
  }
}));

const Row = ({classRoot, row, color, icon, categories, categoryIndex}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <>
      <TableRow onClick={() => setOpen(true)} className={classes.row}>
        <TableCell classes={{root: classRoot}}>
          <Box display="flex" alignItems="center">
            <Box>
              <Icon style={{color: color}} fontSize="small">{icon}</Icon>
            </Box>
            <Box ml={2}>
              <Typography variant="body2">
              {row.subject}
              </Typography>
              <Typography variant="caption" style={{color: '#848E98'}}>
                { format(new Date(row.date), 'p, do iii') }
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell classes={{root: classRoot}}>{row.payment_mode.charAt(0).toUpperCase() + row.payment_mode.slice(1)}</TableCell>
        <TableCell classes={{root: classRoot}}>₹{row.amount}</TableCell>
      </TableRow>

      <Dialog 
      open={open} 
      setOpen={setOpen} 
      categories={categories}
      data={{
        type: 'Edit',
        id: row._id,
        date: row.date,
        subject: row.subject,
        amount: row.amount,
        paymentMode: row.payment_mode,
        description: row.description,
        categoryIndex: categoryIndex
      }} 
      />
    </>
  )
}

export default Row
