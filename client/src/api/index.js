import axios from 'axios'

const foursquare = axios.create({
	baseURL: 'https://api.foursquare.com/v2',
})

const PLACE_SAVE_URL = 'http://localhost:3001/places';
const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


const getPhotoUrl = (photo, size) => {
	return `${photo.prefix}${size}x${size}${photo.suffix}`
}


export default {

	fetchAllPlaces: ({near, query}) => {
		console.log("got here")
		return foursquare.get(`/venues/explore`, {
			params:{
				near,
				query,
				limit: 20,
				venuePhotos: 1,
				client_id: "C3WBJLCEUINOXMWP2FXZVUXW1BJCIPU5BH2ZE0X4GHIOY0LY",
				client_secret: "ZEX21D1GYVOIZXL2L5ZFN3PJIESNZDFUAKTB3AUYQJRKJDIS",
				v: '20180312'
			}
		}).then(r => {
			console.log(r)
			return r.data.response.groups[0].items.map(v => {
				return {
					id: v.venue.id,
					name: v.venue.name,
					rating: v.venue.rating,
					price: v.venue.price ? v.venue.price.tier : null,
					tips: v.venue.stats.tipCount,
					img: (v.venue.photos.count === 1)
						? getPhotoUrl(v.venue.photos.groups[0].items[0], "290")
						: null
				}
			})
		})
	},


	fetchPlaceDetails: ({id}) => {
		return foursquare.get(`/venues/${id}`, {
			params: {
				client_id: "C3WBJLCEUINOXMWP2FXZVUXW1BJCIPU5BH2ZE0X4GHIOY0LY",
				client_secret: "ZEX21D1GYVOIZXL2L5ZFN3PJIESNZDFUAKTB3AUYQJRKJDIS",
				v: '20180312'
			}
		}).then(r => {
			const venue = r.data.response.venue

			return {
				id: venue.id,
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
				tipsarray: venue.tips.groups[0].items.map(ta => {
					return ta.text
				}).slice(0,10),
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

export async function getPlaces() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(PLACE_SAVE_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function postPlace(place) {
    try {
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(place)
        };

        const response = await fetch(PLACE_SAVE_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function putSavedPlace(id, update) {
    try {
        const options = {
            mode: 'cors',
            method: 'PUT',
            headers: jsonHeaders,
            body: JSON.stringify(update)
        };

        const response = await fetch(`${ PLACE_SAVE_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function deleteSavedPlace(id) {
    try {
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: jsonHeaders
        };

        const response = await fetch(`${ PLACE_SAVE_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}
