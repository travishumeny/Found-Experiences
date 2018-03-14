import React from 'react'

import Parent from '../../components/Parent'
import PlaceDetailsHeader from '../../components/PlaceDetails/PlaceDetailsHeader'
import PlaceImageList from '../../components/PlaceDetails/PlaceImageList'
import Tips from '../../components/PlaceDetails/Tips'
import Footer from '../../components/common/Footer'

import {fetchPlaceDetails} from '../../actions'
import {connect} from 'react-redux'

const PlaceDetails = ({fetchData}) => {
	fetchData()
	return(
	  <Parent>
	    <PlaceDetailsHeader/>
	    <div class="content">
	      <PlaceImageList/>
	      <Tips/>
	    </div>
	    <Footer/>
	  </Parent>
	)
}

const mapDispatchToProps = (dispatch, {match}) =>{
	return {
		fetchData:() => {
			dispatch(fetchPlaceDetails({id:match.params.id}))
		}
	}
}

export default connect(undefined, mapDispatchToProps)(PlaceDetails);
