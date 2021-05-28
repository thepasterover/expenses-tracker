import React from 'react'

import Head from 'next/head'

import { getSession } from 'next-auth/client'

import ProfileContent from '@components/Profile/ProfileContent'

const profile = ({session}) => {
    
    return (
        <>
            <Head>
                <title>Profile | Expenses Tracker</title>
            </Head>
            <ProfileContent user={session.user} token={session.token} /> 
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
        return {
            props: { session }
        }
    } catch(err) {
        console.log(err)
        return { props: { } }
    }
}

export default profile
