import React, { useState, useEffect } from 'react'

import TotalSavings from '@components/Savings/TotalSavings'
import WishList from '@components/Savings/WishList/WishList'
import WishListForm from '@components/Savings/WishList/WishListForm/WishListForm'

import { getSession } from 'next-auth/client'

import { makeStyles } from '@material-ui/core/styles'

import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import {axiosInstance} from '../axios'

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

const savings = ({ session, wishlists }) => {
    const classes = useStyles();
    const [ open, setOpen ] = useState(false)
    const [ wishLists, setWishLists ] =  useState([...wishlists])

    const addWishList = async(subject, totalAmount, savingsAmount) => {
        try {
            const { data } = await axiosInstance.post('/user/savings/add', {
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
                createdAt: new Date()
            }])
        } catch(err) {
            console.log(err)
        }
    }
    
    const editWishList = async(wishlistId, subject, totalAmount, savingsAmount, currentAmount) => {
        try {
            await axiosInstance.post('/user/savings/edit', {
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
            const foundWishlist = wishLists.find(w => w._id === wishlistId)
            const filteredWishLists = wishLists.filter(w => w._id !== wishlistId)
            foundWishlist.subject = subject
            foundWishlist.total_amount = totalAmount
            foundWishlist.savings_amount = savingsAmount
            foundWishlist.current_amount = currentAmount
            setWishLists([...filteredWishLists, foundWishlist])
        } catch(err) {
            console.log(err)
        }
    }

    const deleteWishList = async(wishlistId) => {
        try {
            await axiosInstance.post('/user/savings/delete', {
                wishlistId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
            const filteredWishLists = wishLists.filter(w => w._id !== wishlistId)
            setWishLists([...filteredWishLists])
        } catch(err) {
            console.log(err)
        }
    }

    const changeStatus = async(wishlistId) => {
        try {
            await axiosInstance.post('/user/savings/changestatus', {
                wishlistId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.token,
                }
            })
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <TotalSavings 
            wishLists={wishLists}
            />
            <WishList 
            wishlists={wishLists}
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
        console.log(err)
        return { props: { wishlists: [] } }
    }
}


export default savings
