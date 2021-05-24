import React, { useState, useEffect, useRef } from 'react'
import { axiosInstance } from '../axios'

import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Table from '@components/Transactions/Table/Table'
import Dialog from '@components/Transactions/Dialog/Dialog'

import { getSession, useSession } from 'next-auth/client'

import { connect } from 'react-redux'

import moment from 'moment'

let rows = [
    {date: '4th Aug 7AM', name: 'Rent given to Landlord', category: 'Rents', payment_mode: 'Paytm', amount: 500},
    {date: '4th Aug 7AM', name: 'School Fees', category: 'Academics', payment_mode: 'Credit Card', amount: 300},
    {date: '4th Aug 7AM', name: 'Gucci Bags', category: 'Shopping', payment_mode: 'Cash', amount: 500},
    {date: '4th Aug 7AM', name: 'NY tour', category: 'Travel', payment_mode: 'Debit Card', amount: 500},
    {date: '4th Aug 7AM', name: 'NY tour', category: 'Travel', payment_mode: 'Debit Card', amount: 500},
    {date: '4th Aug 7AM', name: 'NY tour', category: 'Travel', payment_mode: 'Debit Card', amount: 500},
    {date: '4th Aug 7AM', name: 'NY tour', category: 'Travel', payment_mode: 'Debit Card', amount: 500},
]
const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        top: 'auto',
        right: 50,
        bottom: 70,
        [theme.breakpoints.down('sm')]:{
            bottom: 70,
        },
        left: 'auto',
        position: 'fixed',
    }
}));

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}


const transactions = ({date, categoryData, session}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [transactions, setTransactions] = useState([])

    let prevDate = usePrevious(date)

    const formattedDate = moment(date).format('MMM YYYY')
    const formattedPrevDate = moment(prevDate).format('MMM YYYY')

    useEffect(async() => {
        if(formattedPrevDate !== formattedDate){
          // TODO: Add a sate fucntion to modify prev date
          // getTransactions(session, date)
        } 
        const {data} = await axiosInstance.post('/user/transactions',
        {
          date: date
        }, 
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': session.token,
          }
        })
        setTransactions(data);
    }, [])


    return (
        <>
           <Table rows={transactions} date={formattedDate} categories={categoryData.categories} />
           <Fab color="primary" aria-label="add" className={classes.root} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
            <Dialog open={open} setOpen={setOpen} categories={categoryData.categories} token={session.token} />
        </>
    )
}

export async function getServerSideProps(context) {
    try{
        const session = await getSession(context)
        if (!session) {
            return {
                redirect: {
                  destination: '/signin',
                  permanent: false,
                },
              }
        }
        return {
            props: { session }
        }
    } catch(err) {
        console.log("Error")
        return { props: {} }
    }
}

const mapStateToProps = (state) => ({
    date: state.date.date,
    categoryData: state.category
})

export default connect(mapStateToProps)(transactions)
