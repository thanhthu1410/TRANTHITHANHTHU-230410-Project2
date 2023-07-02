import React from 'react'

import Banner from './components/Banners/Banner';
import Story from './components/Storys/Story';
import Footer from './components/Footers/Footer';
import DetailItem from '../DetailItems/DetailItem';
import Login from '../Logins/Login';


export default function Home() {




  return (
    <div id="home">
      <Banner />
      <Story />
      <Footer />
      {/* <Login/> */}
    </div>
  )
}
