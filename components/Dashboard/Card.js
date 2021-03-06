import Image from 'next/image'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const gradientStyles = [
  'linear-gradient(123deg, rgba(255,74,107,1) 69%, rgba(200,52,78,1) 100%)',
  'linear-gradient(123deg, rgba(51,61,218,1) 69%, rgba(8,22,255,1) 100%)',
  'linear-gradient(123deg, rgba(39,204,221,1) 69%, rgba(38,204,221,1) 100%)',
]

// PUT THIS IN INDEX .JS TO VIEW BEAUTIFUL CARDS AND LOOP
// const cards = [
//   {number: '4008 **** **** 7533', balance: '25,889', company: 'Visa'},
//   {number: '4875 **** **** 3432', balance: '55,487', company: 'Master Card'},
//   {number: '4565 **** **** 4342', balance: '42,643', company: 'Rupay'},
// ]

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]:{
      maxWidth: '85%',
    },
    marginTop: '15px',
    minHeight: '150px',
  }
}))

const appCard = ({number, balance, company, index}) => {
  const classes = useStyles()
  const logo = company.replace(/\s+/g, '').toLowerCase()
    return (
      <>
        <Grid item xs={12} sm={8} md={4} >
          <Card className={classes.root} elevation={8} style={{background: gradientStyles[index]}}>
            <CardContent>
              <Box pt={1}>
                <Typography variant="subtitle2" style={{color: 'white'}}>
                  {number}
                </Typography>
              </Box>
              <Typography variant="caption" style={{color: 'white'}}>
                Card Number
              </Typography>
              <Box mt={4} >
                <Typography variant="subtitle2" style={{color: 'white'}}>
                ₹{balance}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={-1}>
                <Box flexGrow={1}>
                  <Typography variant="caption" style={{color: 'white'}}>
                      Balance
                  </Typography>
                </Box>
                <Image src={`/card_logos/${logo}.png`} 
                width={logo === 'mastercard' ? "30" : "50"} 
                height="10"
                />
                <Box ml={1}>
                  <Typography variant="caption" style={{color: 'white'}}>
                      {company}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </>
    )
}

export default appCard
