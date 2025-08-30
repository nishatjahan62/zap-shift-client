import React from 'react';
import Navbar from '../Pages/Shared/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl lg:mx-auto min-w-sm '>
            <Navbar></Navbar>
          <div className='mx-8'>  <Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;