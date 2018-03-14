import React from 'react'
import PlacesElement from '../PlacesElement'
import Loading from '../../common/Loading'
import './index.css'
import {connect} from 'react-redux'


const PlacesList = ({loading, venues = []}) => {
	return (
		<section className="places">
			{loading ?
				<Loading/> :
				venues.map(v => (<PlacesElement key={v.id} {...v} />))
			}
		</section>
	)
}

const mapStateToProps = ({loading, venues}) => {
	return{loading, venues}
}

export default connect(mapStateToProps, undefined)(PlacesList)
