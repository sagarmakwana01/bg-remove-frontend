import React from 'react'
import './home-page.css'
import './home-page.js'
import HomeBanner from '../../home-page-components/HomeBanner.jsx'
import WhyChooseUs from '../../home-page-components/WhyChooseUs.jsx'
import RemoveBgInstantly from '../../home-page-components/RemoveBgInstantly .jsx'
import CoolDesignsAsYouWish from '../../home-page-components/CoolDesignsAsYouWish .jsx'
import EasyAPIIntegrationForSpeedy from '../../home-page-components/EasyAPIIntegrationForSpeedy .jsx'
import WhyChooseUsSecond from '../../home-page-components/WhyChooseUsSecond.jsx'
import Testimonials from '../../home-page-components/Testimonials.jsx'
import LatestNews from '../../home-page-components/LatestNews.jsx'
const Home = () => {
  return (
    <>
    <HomeBanner />
    <WhyChooseUs />
    <RemoveBgInstantly />
    <CoolDesignsAsYouWish />
    <EasyAPIIntegrationForSpeedy />
    <WhyChooseUsSecond />
    <Testimonials />
    <LatestNews />
    </>
  )
}

export default Home