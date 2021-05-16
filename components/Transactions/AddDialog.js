import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {Box, Dialog, DialogTitle, DialogContent, TextField, Typography, Icon, Grid, Fab} from '@material-ui/core'
import { IconButton, Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '30px',
    cursor: 'pointer',
    color: '#848E98'
  },
  fab: {
    top: 'auto',
    right: 'auto',
    bottom: 10,
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
    return (
        <>
          <Dialog fullScreen open={open}>
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
            <Box px={4} pt={0}>
              <DialogContent>
                  <TextField  
                    label="Date"
                    fullWidth
                    color="primary"
                  />
                <Box mt={3}>
                  <TextField  
                    label="Name"
                    fullWidth
                    color="primary"
                  />
                  </Box>
                <Box mt={3}>
                  <TextField  
                    label="Amount"
                    fullWidth
                    color="primary"
                  />
                </Box>
                <Box mt={3}>
                  <TextField  
                    label="Description"
                    multiline
                    fullWidth
                    color="primary"
                    rows={2}
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
              {/* <Box mt={2} display="flex" justifyContent="center">
                <DialogActions>
                  <Button color="primary" variant="contained" disableElevation>
                    Save
                  </Button>
                </DialogActions>
              </Box> */}
              <Box className={classes.fab}>
                <Fab variant="extended" color="primary">
                  Save
                </Fab>
              </Box>
            </Box>
          </Dialog>
        </>
    )
}

export default AddDialog
