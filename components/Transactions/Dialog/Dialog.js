import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {Box, Dialog, DialogTitle, DialogContent, TextField, Typography, Icon, Grid, Fab, Button} from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { axiosInstance } from '../../../axios'

import Category from '../Categories/Category'
import DialogTextField  from './DialogTextField'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { CategoryRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  fab: {
    top: 'auto',
    right: 'auto',
    bottom: 35,
    left: '45%',
    position: 'fixed',
  }
}));


const AddDialog = ({open, setOpen, categories, token, data, transactions, setTransactions}) => {
    const classes = useStyles()

    //TODO: Setup Error Handling for Text Fields

    const [errorText, setErrorText] = useState('')

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState((data.categoryIndex || 0))
    const [date, setDate] = useState((data.date || new Date()))
    const [subject, setSubject] = useState((data.subject || ''))
    const [amount, setAmount] = useState((data.amount || null))
    const [paymentMode, setPaymentMode] = useState((data.paymentMode || ''))
    const [description, setDescription] = useState(( data.description || ''))
    

    const stateAndHandlers = [
      { label: "Subject", state: subject, handler: setSubject },
      { label: "Amount", state: amount, handler: setAmount },
      { label: "Payment Mode", state: paymentMode, handler: setPaymentMode },
      { label: "Description", state: description, handler: setDescription }
    ]

    const addTransaction = async() => {
      try {

        const category = categories.find((f, index) => index === selectedCategoryIndex)
        const {data} = await axiosInstance.post('/user/transactions/add', {
          subject: subject,
          date: date,
          amount: amount,
          paymentMode: paymentMode,
          description: description,
          categoryId: category._id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          } 
        })
        setOpen(false)

        setTransactions([...transactions, {
          _id: data.transactionId,
          subject: subject,
          date: date,
          amount: amount,
          payment_mode: paymentMode,
          description: description,
          category: category._id
        }])

        setSubject('')
        setAmount()
        setPaymentMode('')
        setDescription('')


      } catch(err) {
        console.log(err)
      }
    }

    const editTransaction = async () => {
      try {
        setOpen(false)
        const category = categories.find((f, index) => index === selectedCategoryIndex)
        const res = await axiosInstance.post('/user/transactions/edit', {
          transactionId: data.id,
          subject: subject,
          date: date,
          amount: amount,
          paymentMode: paymentMode,
          description: description,
          categoryId: category._id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjBhNTBiYmU1ZjA0OTMwZjkwZmYzZmExIiwiaWF0IjoxNjIxNzgwNjQwLCJleHAiOjE2MjIwMzk4NDB9.PvffwLdMLIm5DgYHilBJkdhSDFh5f2LqAcyuCWpdi5U',
          } 
        })

        const filteredTransactions = transactions.filter(t => t._id !== data.id)
        setTransactions([{
          _id: data.id,
          subject: subject,
          date: date,
          amount: amount,
          payment_mode: paymentMode,
          description: description,
          category: category._id
        }, ...filteredTransactions])
      } catch(err) {
        console.log(err)
      } 
    }

    const deleteTransaction = async () => {
      try {
        setOpen(false)
        const res = await axiosInstance.post('/user/transactions/delete', {
          transactionId: data.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjBhNTBiYmU1ZjA0OTMwZjkwZmYzZmExIiwiaWF0IjoxNjIxNzgwNjQwLCJleHAiOjE2MjIwMzk4NDB9.PvffwLdMLIm5DgYHilBJkdhSDFh5f2LqAcyuCWpdi5U',
          } 
        })
        const filteredTransactions = transactions.filter(t => t._id !== data.id)
        setTransactions(filteredTransactions)
      } catch(err) {
        console.log(err)
      }
    }

    let viewCatgories 
    if(categories.length > 0){
      viewCatgories = (
        categories.map((c, index) => (
          <Category
          key={index}
          index={index}
          errorText={errorText} 
          setSelectedCategoryIndex={setSelectedCategoryIndex} 
          selectedCategoryIndex={selectedCategoryIndex}
          color={c.color}
          icon={c.icon}
          category={c.category}
          />
        ))
      ) 
    } else {
      viewCatgories = <p>Loading Error</p>
    }

    let viewBtn
    data.type.toLowerCase() === 'add' ? 
    viewBtn = (
      <Fab variant="extended" color="primary" onClick={() => addTransaction()}>
        Add
      </Fab>
    ) :
    viewBtn = (
      <Fab variant="extended" color="primary" onClick={() => editTransaction()}>
        Edit
      </Fab>
    )

    return (
        <>
          <Dialog fullScreen open={open}>
            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" px={1}>
                <Box>
                  <DialogTitle id="form-dialog-title">{data.type} Transaction</DialogTitle>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  {(data.type.toLowerCase() === 'edit') && 
                  <Box>
                    <IconButton onClick={() => deleteTransaction()}>
                      <DeleteOutlinedIcon 
                      style={{color: '#c82333'}}
                      />
                    </IconButton>
                  </Box>}
                  <Box pr={1}>
                    <IconButton onClick={() => setOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box px={4}>
                <DialogContent>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                    autoOk={true} 
                    fullWidth
                    variant="inline"
                    label="Date"
                    value={date}
                    onChange={setDate}
                    inputVariant="outlined"
                    maxDate={new Date()}
                    />
                  </MuiPickersUtilsProvider>

                  {stateAndHandlers.map((s, index) => (
                    <DialogTextField 
                    key={index}
                    label={s.label}
                    value={s.state}
                    handler={s.handler}
                    />
                  ))}

                </DialogContent>
                <Box px={1} mt={3}>
                  <Typography variant="subtitle1">
                    <strong>Select Category</strong>
                  </Typography>
                  <Box mt={2}>
                    <Grid container>
                        {viewCatgories}
                    </Grid>
                  </Box>
                </Box>
                <Box className={classes.fab}>
                  {viewBtn}
                </Box>
              </Box>
            </Box>
          </Dialog>
        </>
    )
}

export default AddDialog

