import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {SplashPage, PlaceDetails, Places, NotFoundPage} from '../containers'

const App = () => (
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={SplashPage}/>
				<Route path="/places" component={Places}/>
				<Route path="/place/:id" component={PlaceDetails}/>
				<Route path="*" component={NotFoundPage}/>
			</Switch>
		</div>
	</Router>
)

export default App
