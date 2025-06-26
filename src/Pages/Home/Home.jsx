import React from 'react';
import Banner from '../../components/Hero/Banner';
import OurServices from '../../components/OurServices/OurServices';
import HowItWorks from '../../components/HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;