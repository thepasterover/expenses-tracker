import React, { useState, useEffect } from 'react'

import TotalSavings from '@components/Savings/TotalSavings'
import WishList from '@components/Savings/WishList/WishList'
import WishListForm from '@components/Savings/WishList/WishListForm/WishListForm'

import Head from 'next/head'

import { getSession } from 'next-auth/client'

import { makeStyles } from '@material-ui/core/styles'

import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import {axiosInstance} from '../axios'
import { toast } from 'react-toastify'

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

const savings = ({ session, wishlists, error }) => {
    const classes = useStyles();
    const [ open, setOpen ] = useState(false)
    const [ wishLists, setWishLists ] =  useState([...wishlists])

    useEffect(() => {
        if(error){
            toast.error(error)
        }
    }, [error])

    const addWishList = async(subject, totalAmount, savingsAmount) => {
        try {
            
            const res = await axiosInstance.post('/user/savings/add', {
                subject: subject,
                totalAmount: totalAmount,
                savingsAmount: savingsAmount
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
            setWishLists([...wishLists, {
                _id: data.wishListId,
                subject: subject,
                total_amount: totalAmount,
                savings_amount: savingsAmount,
                current_amount: 0,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }])
            toast.success(res.data.message)
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.error)
            }
        }
    }
    
    const editWishList = async(wishlistId, subject, totalAmount, savingsAmount, currentAmount) => {
        try {
            const res = await axiosInstance.post('/user/savings/edit', {
                wishlistId,
                subject,
                totalAmount,
                savingsAmount,
                currentAmount
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
            toast.success(res.data.message)
            const foundWishlist = wishLists.find(w => w._id === wishlistId)
            const filteredWishLists = wishLists.filter(w => w._id !== wishlistId)
            foundWishlist.subject = subject
            foundWishlist.total_amount = totalAmount
            foundWishlist.savings_amount = savingsAmount
            foundWishlist.current_amount = currentAmount
            setWishLists([...filteredWishLists, foundWishlist])
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.error)
            }
        }
    }

    const deleteWishList = async(wishlistId) => {
        try {
            const res = await axiosInstance.post('/user/savings/delete', {
                wishlistId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
            toast.success(res.data.message)
            const filteredWishLists = wishLists.filter(w => w._id !== wishlistId)
            setWishLists([...filteredWishLists])
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.error)
            }
        }
    }

    const changeStatus = async(wishlistId) => {
        try {
            const res = await axiosInstance.post('/user/savings/changestatus', {
                wishlistId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
            toast.success(res.data.message)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <Head>
                <title>Savings | Expenses Tracker</title>
            </Head>
            <TotalSavings 
            wishLists={wishLists}
            />
            <WishList 
            wishlists={wishLists}
            setWishLists={setWishLists}
            edit={editWishList}
            change={changeStatus}
            del={deleteWishList}
            />

            <Fab color="primary" aria-label="add" className={classes.root} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>

            <WishListForm
            open={open}
            setOpen={setOpen}
            type='Add'
            data={{}}
            add={addWishList}
            />

        </>
    )
}


export async function getServerSideProps(context) {
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
        const { data } = await axiosInstance.get('/user/savings', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.token,
            }
        })
        return {
            props: { session, wishlists: data }
        }
    } catch(err) {
        let error
        if(err.response){
            error = err.response.data.error
        }
        return { props: { wishlists: [], error: error || 'Something went wrong!' } }
    }
}


export default savings
