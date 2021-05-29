import React, { useState, useEffect, useRef } from 'react'

import Head from 'next/head'

import { axiosInstance } from '../axios'

import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import Table from '@components/Transactions/Table/Table'
import Dialog from '@components/Transactions/Dialog/Dialog'

import { getSession } from 'next-auth/client'

import { connect } from 'react-redux'

import { format } from 'date-fns'

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

const transactions = ({date, categoryData, session}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [transactions, setTransactions] = useState([])

    const formattedCategories = categoryIcons.map((t) => {
        let category = categoryData.categories.find(e => e.name === t.category.toLowerCase())
        if(category) {
          t._id = category._id
        }
        return t
    })

    const formattedDate =  format(new Date(date), 'MMM yyyy')
    useEffect(async() => {
        try{
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
        } catch(err) {
            console.log(err)
        }
        
    }, [date])


    return (
        <>
            <Head>
                <title>Transactions | Expenses Tracker</title>
            </Head>
           <Table 
           rows={transactions} 
           date={formattedDate} 
           categories={formattedCategories} 
           token={session.token}
           setTransactions={setTransactions} 
           />
           
           <Fab color="primary" aria-label="add" className={classes.root} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
            
            <Dialog 
            open={open} 
            setOpen={setOpen} 
            categories={formattedCategories} 
            token={session.token}
            data={{
                type: 'Add'
            }}
            transactions={transactions}
            setTransactions={setTransactions} 
            />
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
