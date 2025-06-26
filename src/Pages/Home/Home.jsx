import React from 'react';
import Banner from '../../components/Hero/Banner';
import OurServices from '../../components/OurServices/OurServices';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import TrustedCompanies from '../../components/TrustedCompany/TrustedCompanies';
import Features from '../../components/Features/features';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedCompanies></TrustedCompanies>
            <Features></Features>

        </div>
    );
};

export default Home;