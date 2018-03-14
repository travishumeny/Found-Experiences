import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllPlaces} from '../../../actions'
import search from '../../../assets/images/search.png'
import './index.css'

const Search = ({loading, onSearchSubmit}) => (
	<form className="search" onSubmit={onSearchSubmit}>
		<input className="search-term"
			autoFocus
			type="text"
			name="query"
			autoComplete="off"
			required
			placeholder="I'm looking for"/>
		<input className="search-location"
			type="text"
			name="near"
			autoComplete="off"
			required
			placeholder="place"/>
		<button className="search-submit"
			disabled={loading}
			type="submit">
			<img src={search} alt="icn"/>
		</button>
	</form>
)

const mapStateToProps = ({loading}) => ({loading})

const mapDispatchToProps = (dispatch, {history, location}) => {
	return {
		onSearchSubmit:(e) => {
			e.preventDefault()
			dispatch(fetchAllPlaces({
				query:e.target.query.value,
				near:e.target.near.value,
			}))

			e.target.query.value = ''
			e.target.near.value = ''

			history.push('/places')
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
