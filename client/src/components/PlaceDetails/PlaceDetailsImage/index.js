import React from 'react'
import './index.css'

const PlaceDetailsImage = ({
	img = null,
	userImg = null,
	userName = "Danny Dyer"
}) => (
		<div className="place-image" style={{'background':`url(${img}) center / cover no-repeat` }}>
			<div className="photographer-photo">
				<div className="photographer-name">{userName}</div>
				<div className="round-image">
					<img src={userImg} alt={'img'}/>
				</div>
			</div>
		</div>
)

export default PlaceDetailsImage
