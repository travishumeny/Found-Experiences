import React from 'react'
import PlaceDetailsImage from '../PlaceDetailsImage'
import './index.css'

import {connect} from 'react-redux'

const PlaceImageList = ({photos = []}) => (
	<section className="place-image-list">
		{photos.map((photo, i) => (
			<PlaceDetailsImage key={i} {...photo}/>
		))}
	</section>
)


const mapStateToProps = ({placeDetails}) => ({photos:placeDetails.photos})

export default connect(mapStateToProps)(PlaceImageList)
