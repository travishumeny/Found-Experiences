import React from 'react'
import './index.css'
import Search from '../../common/Search'
import background from '../../../assets/images/background.jpg'
import homepage from '../../../assets/images/back-home.png'
import {Link} from 'react-router-dom'

const PlacesHeader = () => (
	<header className="header" style={{'background':`url(${background}) center / cover no-repeat` }}>
		<Link to={'/'}>
			<img className="homepage" src={homepage} alt="homepage"/>
		</Link>
		<Search/>
	</header>
)

export default PlacesHeader
