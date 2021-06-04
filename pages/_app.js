import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import Layout from '../layouts/Layout';

import '../styles/globals.css'

import { Provider } from 'next-auth/client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { wrapper } from '../store/store'
import Spinner from '@components/Spinner/Spinner';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleStart = () => { setLoading(true); };
    const handleComplete = () => { setLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router])

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            {loading ? <Spinner /> : <Component {...pageProps} />}
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp)