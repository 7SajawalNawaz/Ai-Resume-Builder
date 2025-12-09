import React from 'react'
import Alertbar from '../components/Home/Alertbar'
import Hero from '../components/Home/Hero'
import FeatureSection from '../components/Home/FeatureSection'
import Testimonial from '../components/Home/Testimonial'
import Cta from '../components/Home/Cta'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div>
      <Alertbar />
      <Hero />
      <FeatureSection />
      <Testimonial />
      <Cta />
      <Footer />
    </div>
  )
}

export default Home