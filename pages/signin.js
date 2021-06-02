import React from 'react'

import Head from 'next/head'

import { getSession } from 'next-auth/client'

import SigninForm from '@components/SignIn/SignInForm'

const signin = () => {
    return (
      <>
        <Head>
          <title>Sign In | Expenses Tracker</title>
        </Head>
        <SigninForm />
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



export default signin

