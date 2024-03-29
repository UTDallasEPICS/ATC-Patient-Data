import React, { useEffect } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import '../styles/globals.css'
import { MyAppProps } from '../types';
import { useRouter } from 'next/router';
import Navbar from "../components/Navbar";

// serves as the entry point for the pages, ONLY here so we can use material-ui
export default function MyApp({ Component, pageProps }: MyAppProps) {
  // part of the installation for global-wide material ui format
  useEffect((): void => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();
  const role = 'Admin' // TODO: needs to come from role check

  return (
    <React.Fragment>
      <Head>
        <title>{router.pathname}</title>
        <link rel='icon' href='/atc-logo.png' />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserProvider>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Navbar role={role}>
            <Component {...pageProps} />
          </Navbar>
        </ThemeProvider>
      </UserProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};