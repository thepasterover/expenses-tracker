import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {Box, Dialog, DialogTitle, DialogContent, TextField, Typography, Icon, Grid, Fab} from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { axiosInstance } from '../../../axios'

import Category from '../Categories/Category'
import DialogTextField  from './DialogTextField'
import { sub } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  fab: {
    top: 'auto',
    right: 'auto',
    bottom: 35,
    left: '45%',
    position: 'fixed',
  }
}));


const categoryIcons = [
  {icon: 'business', color: '#ff3378', category: "Rents"},
  {icon: 'school', color: '#68cfff', category: "Academics"},
  {icon: 'restaurant', color: '#69C393', category: "Food"},
  {icon: 'flight_takeoff', color: '#fdb574', category: "Travel"},
  {icon: 'play_circle_filled', color: '#ffe100', category: "Entertainment"},
  {icon: 'local_mall', color: '#e4a5fd', category: "Shopping"},
  {icon: 'medical_services', color: 'red', category: "Medicines"},
  {icon: 'grid_view', color: '#F6C4C4', category: "Others"},
]

const AddDialog = ({open, setOpen, categories, token}) => {
    const classes = useStyles()

    //TODO: Setup Error Handling for Text Fields

    const [errorText, setErrorText] = useState('')

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    const [date, setDate] = useState(new Date())
    const [subject, setSubject] = useState('')
    const [amount, setAmount] = useState()
    const [paymentMode, setPaymentMode] = useState('')
    const [description, setDescription] = useState('')
    

    const stateAndHandlers = [
      { label: "Subject", state: subject, handler: setSubject },
      { label: "Amount", state: amount, handler: setAmount },
      { label: "Payment Mode", state: paymentMode, handler: setPaymentMode },
      { label: "Description", state: description, handler: setDescription }
    ]

    

    const addTransaction = async() => {
      try {

        const category = formattedCategories.find((f, index) => index === selectedCategoryIndex)
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
        setSubject('')
        setAmount()
        setPaymentMode('')
        setDescription('')

      } catch(err) {
        console.log(err)
      }
    }

    const formattedCategories = categoryIcons.map((t) => {
      let category = categories.find(e => e.name === t.category.toLowerCase())
      if(category) {
        t._id = category._id
      }
      return t
    })

    let viewCatgories 
    if(categories.length > 0){
      viewCatgories = (
        formattedCategories.map((c, index) => (
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

    return (
        <>
          <Dialog fullScreen open={open}>
            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" px={1}>
                <Box>
                  <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
                </Box>
                <Box>
                  <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                  </IconButton>
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
                  <Fab variant="extended" color="primary" onClick={() => addTransaction()}>
                    Save
                  </Fab>
                </Box>
              </Box>
            </Box>
          </Dialog>
        </>
    )
}

export default AddDialog

