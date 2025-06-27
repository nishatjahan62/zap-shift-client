import React from 'react';
import Navbar from '../Pages/Shared/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl lg:mx-auto min-w-sm '>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;