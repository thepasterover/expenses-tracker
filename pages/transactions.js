import React, { useState, useEffect, useRef } from 'react'
import { axiosInstance } from '../axios'

import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Table from '@components/Transactions/Table'
import Dialog from '@components/Transactions/Dialog/Dialog'

import { getSession, useSession } from 'next-auth/client'

import { connect } from 'react-redux'

import moment from 'moment'

const rows = [
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

const transactions = ({transactions, date, categoryData, session}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    // let prevDate = usePrevious(date)

    // useEffect(() => {
    //     console.log("did update")
    //     console.log("PrevDate: " + prevDate)
    //     console.log("Current Date: " + date)
    //     if(prevDate !== date){
            
    //       console.log("Changed")
          
    //     }
    //     console.log(date)
    // }, [date])

    return (
        <>
           <Table rows={rows} date={date} />
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
        // const res = await axiosInstance.get('/user/transactions', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': session.token,
        //     }
        // })
        const transactions = "res.data"
        return {
            props: { transactions, session }
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
