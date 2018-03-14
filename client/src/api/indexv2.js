import axios from 'axios'

const foursquare = axios.create({
	baseURL: 'https://api.foursquare.com/v2',
	params:{
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		v: '20170801'
	}
})

const getPhotoUrl = (photo, size) => {
	return `${photo.prefix}${size}x${size}${photo.suffix}`
}


export default {

	fetchVenues : ({near, query}) => {

		const apis = ['google', 'foursquare', 'yelp']
		const baseurl = "http://localhost:3001/"

		const responses = Promise.all(apis.map(api => {
			return axios.get(baseurl+api+'/'+query+'/in/'+near)
		})).then(allres => {
			const arrayofresponses = allres.map(el => el.data)
			return arrayofresponses;
		}).then(array => {
			console.log(array);
			})

		return foursquare.get(`/venues/explore`, {
			params:{
				near,
				query,
				limit:10,
				venuePhotos:1
			}
		}).then(r => {
			return r.data.response.groups[0].items.map(v => {
				return {
					id: v.venue.id,
					name: v.venue.name,
					rating: v.venue.rating,
					price: v.venue.price ? v.venue.price.tier : null,
					tips: v.venue.stats.tipCount,
					img: getPhotoUrl(v.venue.photos.groups[0].items[0], '290')
				}
			})
		})
	},


	fetchVenueDetails: ({id}) => {
		return foursquare.get(`/venues/${id}`).then(r => {
			const venue = r.data.response.venue

			return {
				name: venue.name,
				img: getPhotoUrl(venue.bestPhoto, '540'),
				address: venue.location.address,
				rating: venue.rating,
				phone: venue.contact.formattedPhone,
				tipCount: venue.tips.count,
				price: venue.price ? venue.price.tier : null,
				photos: venue.photos.groups[0].items.map( p => {
					return {
						img: getPhotoUrl(p, '290'),
						userImg: getPhotoUrl(p.user.photo, '128'),
						userName: `${p.user.firstName} ${p.user.lastName}`
					}
				}),
				tips: venue.tips.groups[0].items.map( t => {
					return {
						userImg: getPhotoUrl(t.user.photo, '128'),
						userName: `${t.user.firstName} ${t.user.lastName}`,
						text: t.text
					}
				}).slice(0,5)
			}
		})
	}

}
