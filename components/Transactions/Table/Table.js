import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Box, Typography, Paper  } from'@material-ui/core'

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  TableFooter,
} from '@material-ui/core'

import Rows from './TableRows/Rows'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: 'none'
  }
}));

const Transactions = ({ rows, date, categories, setTransactions, token }) => {
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
        {rows.length > 0 ? 
        <>
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
              <Rows 
                transactions={rows}
                categories={categories}
                page={page}
                rowsPerPage={rowsPerPage}
                classRoot={classes.root}
                setTransactions={setTransactions}
                token={token}
              />
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                rowsPerPageOptions={[]}
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage} 
                />
              </TableRow>
            </TableFooter>
          </Table>
          </TableContainer>
        </>
        : 
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        >
          <Typography variant="h6" align="center" color="secondary">Tap '+' to add a Transaction</Typography>
        </Box>
      }
        

      </>
    )
}

export default Transactions
