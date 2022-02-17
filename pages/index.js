import React from 'react'

import Head from 'next/head'

// Styles:
import NavBar from '@components/Home/NavBar'
import Hero from '@components/Home/Hero'

const index = () => {
    return (
        <>
            <Head>
                <title>Home | Expenses Tracker</title>
            </Head>
            <NavBar />
            <Hero />
        </>
    )
}

export default index