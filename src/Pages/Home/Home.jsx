import React from 'react';
import Banner from '../../components/Hero/Banner';
import OurServices from '../../components/OurServices/OurServices';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import TrustedCompanies from '../../components/TrustedCompany/TrustedCompanies';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedCompanies></TrustedCompanies>
        </div>
    );
};

export default Home;