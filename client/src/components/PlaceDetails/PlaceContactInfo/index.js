import React from 'react'
import './index.css'

const PlaceContactInfo = ({icon, value}) =>
{
	if(value === null){
		return (
			<div></div>
		)
	}

	return (
		<div className="info-element">
			<img src={icon} alt="icon"/>
				<div>{value}</div>
		</div>

	)
}

export default PlaceContactInfo
