import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '../components/Dashboard/Card'
import TransactionChart from '@components/Dashboard/TransactionChart'
import Transactions from '../components/Dashboard/Transactions/Transactions'

import {getSession, signOut} from 'next-auth/client'

import { connect } from 'react-redux'

import moment from 'moment'
import { axiosInstance } from '../axios'

const cards = [
  {number: '4008 **** **** 7533', balance: '25,889', company: 'Visa'},
  {number: '4875 **** **** 3432', balance: '55,487', company: 'Master Card'},
  {number: '4565 **** **** 4342', balance: '42,643', company: 'Rupay'},
]

// TODO: Setup Overflow for cards
// TODO: Connect Cards to Server
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    overflowX: 'auto'
  }
}))

const categoryIcons = [
  {icon: 'business', color: '#ff3378', category: "Rents"},
  {icon: 'school', color: '#68cfff', category: "Academics"},
  {icon: 'restaurant', color: '#69C393', category: "Food"},
  {icon: 'flight_takeoff', color: '#fdb574', category: "Travel"},
  {icon: 'play_circle_filled', color: '#ffe100', category: "Entertainment"},
  {icon: 'local_mall', color: '#e4a5fd', category: "Shopping"},
  {icon: 'medical_services', color: 'red', category: "Medicines"},
  {icon: 'grid_view', color: '#F6C4C4', category: "Others"}
]

const Home = ({date, categories, session}) => {
  const classes = useStyles()
  const formattedDate = moment(date).format('MMM YYYY')
  const [groupedTransactions, setGroupedTransaction] = useState([])

  const formattedCategories = categoryIcons.map((t) => {
    let category = categories.find(e => e.name === t.category.toLowerCase())
    if(category) {
      t._id = category._id
    }
    return t
  })

  useEffect(async () => {
    try{
      const {data} = await axiosInstance.post('/user/transactions/categories',
      {
        date: date
      }, 
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': session.token,
        }
      })
      setGroupedTransaction([...data])
    } catch(err) {
      console.log(err)
    }
  }, [date])

  return (
    <div>
      <Head>
        <title>Dashboard | Expenses Tracker</title>
      </Head>
      <Grid container className={classes.wrapper}>
        {/* <TransactionChart /> */}
        
        {cards.map((card, index) => {
          return (
            <Card number={card.number} balance={card.balance} company={card.company} key={index} index={index} />
          )
        })}
      </Grid>
      <Transactions date={formattedDate} groupedTransactions={groupedTransactions} categories={formattedCategories} />
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
    return { props: { session } }
  } catch(err) {
    return {props: {}}
  }
}

const mapStateToProps = (state) => ({
  date: state.date.date,
  categories: state.category.categories
})

export default connect(mapStateToProps)(Home)