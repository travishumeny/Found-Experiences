import React from 'react'
import PlacesElement from '../PlacesElement'
import Loading from '../../common/Loading'
import './index.css'
import {connect} from 'react-redux'


const PlacesList = ({loading, places = []}) => {
	return (
		<section className="places">
			{loading ?
				<Loading/> :
				places.map(p => (<PlacesElement key={p.id} {...p} />))
			}
		</section>
	)
}

const mapStateToProps = ({loading, places}) => {
	return{loading, places}
}

export default connect(mapStateToProps, undefined)(PlacesList)
