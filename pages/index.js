import React, { useEffect, useRef } from 'react'

import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '../components/Dashboard/Card'
import Transactions from '../components/Dashboard/Transactions/Transactions'

import {getSession, signOut} from 'next-auth/client'

import { connect } from 'react-redux'

import moment from 'moment'

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

const Home = ({date}) => {
  const classes = useStyles()

  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }
  // const prevDate = usePrevious(date)

  // const formattedPrevDate = moment(prevDate).format('MMM YYYY')
  // const formattedDate = moment(date).format('MMM YYYY')

  // useEffect(() => {
  //   console.log("did update")
  //   console.log("PrevDate: " + prevDate)
  //   console.log("Current Date: " + date)
  //   if(date !== prevDate){
  //     console.log("Changed")
  //   }
  // }, [date])

  return (
    <div>
      <Head>
        <title>Expenses Tracker</title>
      </Head>
      <button onClick={signOut}>Sign out</button>
      <Grid container className={classes.wrapper}>
        {cards.map((card, index) => {
          return (
            <Card number={card.number} balance={card.balance} company={card.company} key={index} index={index} />
          )
        })}
      </Grid>
      <Transactions date={date} />
    </div>
  )
}


export const getServerSideProps = async(context) => {
  try {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
              destination: '/signin',
              permanent: false,
            },
          }
    }
    return { props: { } }
  } catch(err) {
    return {props: {}}
  }
}

const mapStateToProps = (state) => ({
  date: state.date.date,
})

export default connect(mapStateToProps)(Home)