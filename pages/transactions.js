import React, { useState, useEffect, useRef } from 'react'
import { axiosInstance } from '../axios'

import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Table from '@components/Transactions/Table'
import Dialog from '@components/Transactions/Dialog'

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
        right: 40,
        bottom: 70,
        [theme.breakpoints.down('sm')]:{
            bottom: 70,
        },
        left: 'auto',
        position: 'fixed',
    }
}));

const transactions = ({transactions, date, categoryData, session}) => {
    
    if (categoryData.loading) return null
    
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    // TODO: Handle Categories Error case
    


    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }

    const prevDate = usePrevious(date)

    const formattedPrevDate = moment(prevDate).format('MMM YYYY')
    const formattedDate = moment(date).format('MMM YYYY')

    useEffect(() => {
        console.log("did update")
        console.log("PrevDate: " + formattedPrevDate)
        console.log("Current Date: " + formattedDate)
        if(formattedPrevDate !== formattedDate){
          console.log("Changed")
        }
    }, [date])

    return (
        <>
           <Table rows={rows} date={formattedDate} />
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
        const res = await axiosInstance.get('/user/transactions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.token,
            }
        })
        const transactions = res.data
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
