import React from 'react'
import PlaceDetailsImage from '../PlaceDetailsImage'
import './index.css'

import {connect} from 'react-redux'

const PlaceImageList = ({photos = []}) => (
	<section className="place-image-list">
		{photos.map((p, i) => (
			<PlaceDetailsImage key={i} {...p}/>
		))}
	</section>
)


const mapStateToProps = ({placeDetails}) => ({photos:placeDetails.photos})

export default connect(mapStateToProps)(PlaceImageList)
