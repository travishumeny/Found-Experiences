import React from 'react'
import PriceLevel from '../../common/PriceLevel'
import './index.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const PlacesElement = ({
	id = 0,
	name = 'Sample Restaurant',
	price = 3,
	rating = '8.8',
	img = null
}) => {
	return(
		<Link to={`/place/${id}`} style={{textDecoration:'none'}} className="place-detail-link">
			<div className="places-result" style={{'background':`url(${img}) center / cover no-repeat` }}>
				<div className="result-name">
					{name}
				</div>
				<div className="result-divider"></div>
				<div className="result-info">
					<PriceLevel value={price}/>
				</div>
				<div className="result-rating">
					<span>{rating}</span>
				</div>
			</div>
		</Link>
	)
}

export default connect()(PlacesElement)
