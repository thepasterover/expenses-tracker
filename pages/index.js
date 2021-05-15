import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '../components/Dashboard/Card'
import Transactions from '../components/Dashboard/Transactions/Transactions'

const cards = [
  {number: '4008 **** **** 7533', balance: '25,889', company: 'Visa'},
  {number: '4875 **** **** 3432', balance: '55,487', company: 'Master Card'},
  {number: '4565 **** **** 4342', balance: '42,643', company: 'Rupay'},
]

// TODO: Setup Overflow for cards
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    overflowX: 'auto'
  }
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>Expenses Tracker</title>
      </Head>
      <Grid container className={classes.wrapper}>
        {cards.map((card, index) => {
          return (
            <Card number={card.number} balance={card.balance} company={card.company} key={index} index={index} />
          )
        })}
      </Grid>
      <Transactions />
    </div>
  )
}
