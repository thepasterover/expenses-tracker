import React from 'react'

import Head from 'next/head'

import { getSession } from 'next-auth/client'

import SignUpForm from '@components/SignUp/SignUpForm'

const signup = () => {
    return (
      <>
        <Head>
            <title>Sign up | Expenses Tracker</title>
        </Head>
        <SignUpForm />
      </>
    )
}

export async function getServerSideProps(context) {
  try{
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
      console.log(err)
  }
}

export default signup
