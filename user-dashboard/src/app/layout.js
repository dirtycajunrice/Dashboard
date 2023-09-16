import React from 'react';
import Head from 'next/head';
import Header from './header';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Disable th

const Layout = ({ children }) => {
  return (
    <>
      <Head>
      </Head>
      <div className="variables main-container">
        <Header />
        <main className='main-content'>{children}</main>
      </div>
    </>
  );
};

export default Layout;