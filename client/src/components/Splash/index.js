import React from 'react'
import Search from '../common/Search'
import background from '../../assets/images/background.jpg'
import './index.css'

const Splash = () => (
	<section className="splash" style={{'background':`url(${background}) center / cover no-repeat` }}>
		<div className="splash-header">
			Experience is Found!
		</div>
		<div className="splash-text">
			<p>Find and keep all of your favorite travel secrets in one place.</p>
			<p>Let's begin!</p>
		</div>
		<Search/>
	</section>
)

export default Splash
