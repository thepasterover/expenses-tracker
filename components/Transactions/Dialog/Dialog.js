import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {Box, Dialog, DialogTitle, DialogContent, TextField, Typography, Icon, Grid, Fab, Button} from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { MuiPickersUtilsProvider, DateTimePicker, validate } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { axiosInstance } from '../../../axios'

import Category from '../Categories/Category'
import DialogTextField  from './DialogTextField'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { toast } from 'react-toastify'

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
    const [errors, setErrors] = useState({
      subjectError: '',
      amountError: '',
      paymentModeError: '',
      descriptionError: ''
    })

    const validateSubject = (subject) => {
      if(subject === ''){
        setErrors({...errors, 
            subjectError: 'Subject is required!'
        })
        return
      } else if (subject.length <= 3) {
          setErrors({...errors, 
              subjectError: 'Subject must be greater than 3 characters!'
          })
          return
      } else if (subject.length >= 300) {
          setErrors({...errors, 
              subjectError: 'Subject must be less than 300 characters!'
          })
          return
      } else {
          setErrors({...errors, 
              subjectError: ''
          })
          return
      }
    }

    const validateAmount = (amount) => {
      if(amount === ''){
        setErrors({...errors, 
            amountError: 'Amount is required!'
        })
        return
      } else if (isNaN(amount)) {
          setErrors({...errors, 
              amountError: 'Amount must be a Number!'
          })
          return
      } else if(amount <= 0) {
          setErrors({...errors, 
              amountError: 'Amount cannot be less than or equal to 0!'
          })
          return
      } else {
          setErrors({...errors, 
              amountError: ''
          })
          return
      }
    }

    const validatePaymentMode = (paymentMode) => {
      if(paymentMode === ''){
        setErrors({...errors, 
            paymentModeError: 'Payment Mode is required!'
        })
        return
      } else if (paymentMode.length <= 3) {
          setErrors({...errors, 
              paymentModeError: 'Payment Mode  must be greater than 3 characters!'
          })
          return
      } else if (paymentMode.length >= 300) {
          setErrors({...errors, 
              paymentModeError: 'Payment Mode  must be less than 300 characters!'
          })
          return
      } else {
          setErrors({...errors, 
              paymentModeError: ''
          })
          return
      }
    }

    const validateDescription = () => {

    }

    const stateAndHandlers = [
      { label: "Subject", state: subject, handler: setSubject, validator: validateSubject, errorText: errors.subjectError },
      { label: "Amount", state: amount, handler: setAmount, validator: validateAmount, errorText: errors.amountError },
      { label: "Payment Mode", state: paymentMode, handler: setPaymentMode, validator: validatePaymentMode, errorText: errors.paymentModeError },
      { label: "Description", state: description, handler: setDescription, validator: validateDescription, errorText: errors.descriptionError }
    ]

    const addTransaction = async() => {
      try {
        if(subject === '' || amount === '' || paymentMode === ''){
          toast.error('Please fix the erros in the form!')
          validateSubject(subject)
          validateAmount(amount)
          validatePaymentMode(paymentMode)
        } else if(errors.subjectError !== '' || errors.amountError !== '' || errors.paymentModeError !== ''){
          toast.error('Please fix the erros in the form!')
        } else {
          const category = categories.find((f, index) => index === selectedCategoryIndex)
          const res = await axiosInstance.post('/user/transactions/add', {
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

          toast.success(res.data.message)
        }
      } catch(err) {
        if(err.response){
          toast.error(err.response.data.error)
        }
      }
    }

    const editTransaction = async () => {
      try {
        if(subject === '' || amount === '' || paymentMode === ''){
          toast.error('Please fix the erros in the form!')
          validateSubject(subject)
          validateAmount(amount)
          validatePaymentMode(paymentMode)
        } else if(errors.subjectError !== '' || errors.amountError !== '' || errors.paymentModeError !== ''){
          toast.error('Please fix the erros in the form!')
        } else {
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
              'Authorization': token,
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
          toast.success(res.data.message)
        }
      } catch(err) {
        if(err.response){
          toast.error(err.response.data.error)
        }
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
            'Authorization': token,
          } 
        })
        const filteredTransactions = transactions.filter(t => t._id !== data.id)
        setTransactions(filteredTransactions)
        toast.success(res.data.message)
      } catch(err) {
        if(err.response){
          toast.error(err.response.data.error)
        }
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
                    helperErrorText={s.errorText}
                    validator={s.validator}
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

