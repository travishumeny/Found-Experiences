import React from 'react';
import location from '../../../assets/images/near.png'
import contact from '../../../assets/images/phone.png'
import background from '../../../assets/images/background.jpg'
import PlaceContactInfo from '../PlaceContactInfo'
import PriceLevel from '../../common/PriceLevel'
import CreatePlace from './CreatePlace';
import './index.css'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { addSavedPlace, removeSavedPlace, updateSavedPlace } from '../../../actions';

const PlaceDetailsHeader = ({
	id = 0,
	name = 'Name of Cafe',
	address = '123 Smith St.',
	phone = '(713) 777 7777',
	tipCount = '123',
	price = 3,
	rating = '8.8',
	img = background,
	onAddPlace
}) => (
	<div className="place-detail-header" style={{'background':`url(${img}) center / cover no-repeat` }}>
		<div className="place-detail-title parent">
			{name}
		</div>
		<div className="place-detail-info">
			<div className="parent">
				<PlaceContactInfo icon={location} value={address}/>
				<PlaceContactInfo icon={contact} value={phone}/>
				<PriceLevel value={price}/>
			</div>
		</div>
		<div className="place-detail-rating">
			<span>{rating}</span>
		</div>
		<div className="create-form">
			<CreatePlace onCreate={onAddPlace} />
		</div>
	</div>
)

const mapStateToProps = ({placeDetails}) => ({...placeDetails})

const mapDispatchToProps = (dispatch) =>{
	return {
		onAddPlace: (place) => dispatch(addSavedPlace(place)),
		onRemovePlace: (id) => dispatch(removeSavedPlace(id))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceDetailsHeader)
