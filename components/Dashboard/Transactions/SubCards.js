import { makeStyles } from '@material-ui/core/styles'

import Box from'@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { format } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: '3px solid #ff3378', 
    borderRadius: '3px',
    maxHeight: '70px',
  },
  subtext: {
    color: '#848E98'
  },
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'vi'
  }
}))

const subCards = ({shouldHide, subject, date, amount, color}) => {
    const classes = useStyles()
    return (
      <Box p={3} style={{ display: shouldHide ? 'none' : '' }}>
        <Fade in={!shouldHide}>
        <Card className={classes.root} elevation={0} style={{borderLeft: `3px solid ${color}`}}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1} ml={1}>
                <Typography variant="body1">
                  <strong>{subject}</strong>
                </Typography>
                <Typography variant="subtitle2" className={classes.subtext}>
                  { format(new Date(date), 'p, do iii') }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  ₹{amount}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        </Fade>
      </Box>
    )
}

export default subCards
