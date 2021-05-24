import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { TableRow, TableCell, Box, Typography, Icon } from '@material-ui/core'
import { format } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: 'pointer'
  }
}));

const Row = ({classRoot, row, color, icon}) => {
  const classes = useStyles()
  return (
    <>
      <TableRow onClick={() => console.log(row._id)} className={classes.row}>
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
                { format(new Date(row.date), 'do iii, p') }
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell classes={{root: classRoot}}>{row.payment_mode.charAt(0).toUpperCase() + row.payment_mode.slice(1)}</TableCell>
        <TableCell classes={{root: classRoot}}>₹{row.amount}</TableCell>
        </TableRow>
    </>
  )
}

export default Row
