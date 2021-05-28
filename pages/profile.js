import React from 'react'

import Head from 'next/head'

import AvatarContent from '@components/Profile/AvatarContent'
import AccountInfo from '@components/Profile/AccountInfo'

const profile = () => {
    return (
        <>
            <Head>
                <title>Profile | Expenses Tracker</title>
            </Head>
            <AvatarContent />
            <AccountInfo />  
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const session = await getSession(context)
        if (session) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
                }
        }
        return {
            props: {  }
        }
    } catch(err) {
        return {
            props: { }
        }
    }
}

export default profile
