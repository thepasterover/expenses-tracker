import React, { useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Table from '@components/Transactions/Table'
import Dialog from '@components/Transactions/Dialog'

import { getSession } from 'next-auth/client'

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
        bottom: 40,
        [theme.breakpoints.down('sm')]:{
            bottom: 70,
        },
        left: 'auto',
        position: 'fixed',
    }
}));

const transactions = ({transactions}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    return (
        <>
           <Table rows={rows} />
           <Fab color="primary" aria-label="add" className={classes.root} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
            <Dialog open={open} setOpen={setOpen} />
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
        const res = await axios.get('http://localhost:5000/api/user/transactions')
        const transactions = res.data
        return {
            props: { transactions }
        }
    } catch(err) {
        return { props: {} }
    }
}

export default transactions
