import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {Box, Dialog, DialogTitle, DialogContent, TextField, Typography, Icon, Grid, Fab} from '@material-ui/core'
import { IconButton, Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '30px',
    cursor: 'pointer',
    color: '#848E98'
  },
  fab: {
    top: 'auto',
    right: 'auto',
    bottom: 35,
    left: '45%',
    position: 'fixed',
  }
}));


const transactionIcons = [
  {icon: 'business', color: '#ff3378', category: "Rents"},
  {icon: 'school', color: '#68cfff', category: "Academics"},
  {icon: 'restaurant', color: '#69C393', category: "Food"},
  {icon: 'flight_takeoff', color: '#fdb574', category: "Travel"},
  {icon: 'play_circle_filled', color: '#ffe100', category: "Entertainment"},
  {icon: 'local_mall', color: '#e4a5fd', category: "Shopping"},
  {icon: 'medical_services', color: 'red', category: "Medicines"},
  {icon: 'grid_view', color: '#F6C4C4', category: "Others"},
]

const AddDialog = ({open, setOpen}) => {
    const classes = useStyles()
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [date, setDate] = useState(new Date())
    const [name, setName] = useState('')
    const [amount, setAmount] = useState()
    const [description, setDescription] = useState('')

    const addTransaction = async() => {
      try {
        console.log(date, name, amount, description)
      } catch(err) {
        console.log(err)
      }
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
                    />
                  </MuiPickersUtilsProvider>
                  <Box mt={2}>
                    <TextField  
                      label="Name"
                      fullWidth
                      color="primary"
                      value={name || ""}
                      onChange={event => setName(event.target.value)}
                    />
                    </Box>
                  <Box mt={2}>
                    <TextField  
                      label="Amount"
                      fullWidth
                      color="primary"
                      value={amount || ""}
                      onChange={event => setAmount(event.target.value)}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField  
                      label="Description"
                      multiline
                      fullWidth
                      color="primary"
                      rows={2}
                      value={description || ""}
                      onChange={event => setDescription(event.target.value)}
                    />
                  </Box>
                </DialogContent>
                <Box px={1} mt={3}>
                  <Typography variant="subtitle1">
                    <strong>Select Category</strong>
                  </Typography>
                  <Box mt={2}>
                    <Grid container>
                      {transactionIcons.map((t, index) => ( 
                        <Grid item key={index} xs={4} sm={2}>
                          <Box p={3} display="flex" flexDirection="column" alignContent="center" alignItems="center">
                            <Box onClick={() => setSelectedCategory(index)}>
                              <Icon style={{ color: ( selectedCategory === index && t.color )}} className={classes.icon}>
                                {t.icon}
                              </Icon>
                            </Box>
                            <Box pt={1} >
                              <Typography variant="body2" style={{color: ( selectedCategory !== index && '#848E98')}} component="div">
                                <Box fontWeight="fontWeightBold">
                                  {t.category}
                                </Box>
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                      
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
