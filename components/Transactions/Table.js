import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Box from'@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'


const transactionIcons = [
  {icon: 'business', color: '#ff3378', category: "Rents"},
  {icon: 'school', color: '#68cfff', category: "Academics"},
  {icon: 'restaurant', color: '#69C393', category: "Food"},
  {icon: 'flight_takeoff', color: '#fdb574', category: "Travel"},
  {icon: 'play_circle_filled', color: '#ffe100', category: "Entertainment"},
  {icon: 'local_mall', color: '#e4a5fd', category: "Shopping"},
  {icon: 'medical_services', color: 'red', category: "Medicines"},
  {icon: 'grid_view', color: '#F6C4C4', category: "Others"}
]

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: 'none'
  }
}));

const Transactions = ({ rows, date }) => {
    const classes = useStyles()
    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(10)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    }

    return (
      <>
        <Box display="flex" justifyContent="space-between" mx={2} mb={2}>
          <Typography variant="h6">
            Transactions
          </Typography>
          <Typography variant="h6">
            {date}
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell classes={{root: classes.root}}>Name</TableCell>
                <TableCell classes={{root: classes.root}}>Payment Mode</TableCell>
                <TableCell classes={{root: classes.root}}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const transaction = transactionIcons.find(t => row.category.toLowerCase() === t.category.toLowerCase())
                const {color, icon} = transaction
                return (
                  <TableRow key={index} onClick={() => console.log(index)}>
                    <TableCell classes={{root: classes.root}}>
                      <Box display="flex" alignItems="center">
                        <Box>
                          <Icon style={{color: color}} fontSize="small">{icon}</Icon>
                        </Box>
                        <Box ml={2}>
                          <Typography variant="body2">
                          {row.name}
                          </Typography>
                          <Typography variant="caption" style={{color: '#848E98'}}>
                            {row.date}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell classes={{root: classes.root}}>{row.payment_mode}</TableCell>
                    <TableCell classes={{root: classes.root}}>₹{row.amount}</TableCell>
                </TableRow>
              )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage} 
        />

      </>
    )
}

export default Transactions
