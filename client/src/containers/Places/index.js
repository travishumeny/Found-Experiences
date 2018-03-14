import React from 'react'
import Parent from '../../components/Parent'
import PlacesHeader from '../../components/Places/PlacesHeader'
import PlacesList from '../../components/Places/PlacesList'
import Recents from '../../components/Places/Recents'
import Footer from '../../components/common/Footer'

const Venues = () => (
  <Parent>
    <PlacesHeader/>
    <div class="content">
      <Recents/>
      <PlacesList/>
    </div>
    <Footer/>
  </Parent>
)

export default Venues;
