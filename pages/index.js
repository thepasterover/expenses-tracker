import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import Spendings from '@components/Dashboard/Spendings'
import TransactionChart from '@components/Dashboard/TransactionChart'
import Transactions from '../components/Dashboard/Transactions/Transactions'

import { Grid } from '@material-ui/core'

import {getSession} from 'next-auth/client'

import { connect } from 'react-redux'

import { format } from 'date-fns'
import { axiosInstance } from '../axios'


// TODO: Further customize chart

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

const getTotal = (lst, key) => {
  return lst.reduce((n, l) => n + parseInt(l[key]), 0) 
}

const Home = ({date, categories, session}) => {
  const formattedDate =  format(new Date(date), 'MMM yyyy')
  const [groupedTransactions, setGroupedTransaction] = useState([])
  const [formattedCategories, setFormattedCategories] = useState([])
  const [ totalSpendingThisMonth, setTotalSpendingThisMonth ] = useState(0)
  const [ totalSpendingLastMonth, setTotalSpendingLastMonth ] = useState(0)
  
  useEffect(async () => {
    let temp = []
    if (categories.length > 0 ){
      temp = categoryIcons.map((t) => {
        let category = categories.find(e => e.name === t.category.toLowerCase())
        if(category) {
          t._id = category._id
        }
        return t
      })
    }
    setFormattedCategories([...temp])
  }, [categories])
  

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
      setTotalSpendingThisMonth(getTotal(data.transactions, 'totalAmount'))
      setTotalSpendingLastMonth(data.lastMonthTotal)
      setGroupedTransaction([...data.transactions])
    } catch(err) {
      console.log(err)
    }
    
  }, [date])

  return (
    <>
      <Head>
        <title>Dashboard | Expenses Tracker</title>
      </Head>
      <Spendings 
      totalSpendingThisMonth={totalSpendingThisMonth}
      totalSpendingLastMonth={totalSpendingLastMonth}
      />
      <Grid container>
        <TransactionChart session={session} date={date} />
      </Grid>
      <Transactions date={formattedDate} groupedTransactions={groupedTransactions} categories={formattedCategories} />
    </>
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