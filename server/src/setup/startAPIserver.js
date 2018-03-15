import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

export default function(server) {
  const yelpAPIkey = process.env.YELP_API_KEY;
  const googleAPIkey = process.env.GOOGLE_API_KEY;
  const geocodeAPIkey = process.env.GEOCODE_API_KEY;
  const foursquareClientId = process.env.FOURSQUARE_CLIENT_ID;
  const foursquareClientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
  const foursquareURL = process.env.FOURSQUARE_API_URL;
  const googleURL = process.env.GOOGLE_API_URL;
  const geocodeURL = process.env.GEOCODE_API_URL;
  const yelpURL = process.env.YELP_API_URL;

  const googleAPI = axios.create({ baseURL: googleURL });

  const geocodeAPI = axios.create({
    baseURL: geocodeURL,
    params: {
      key: geocodeAPIkey
    }
  });

  const yelpAPI = axios.create({
    baseURL: yelpURL,
    headers: {
      Authorization: "Bearer " + yelpAPIkey
    }
  });

  const foursquareAPI = axios.create({
    baseURL: foursquareURL,
    params: {
      client_id: foursquareClientId,
      client_secret: foursquareClientSecret,
      limit: 50,
      venuephotos: 1,
      v: moment().format("YYYYMMDD")
    }
  });

  const retrieveSizedPhoto = (photo, size) => {
    return `${photo.prefix}${size}x${size}${photo.suffix}`;
  };

  server.get("/foursquare/:query/in/:near", function(req, res) {
    var query = req.params.query;
    var near = req.params.near;
    var limit = 50;

    foursquareAPI
      .get(`venues/explore`, {
        params: {
          near,
          query
        }
      })
      .then(function(response) {
        var businesses = response.data.response.groups[0].items;
        var foursquareBusinessList = [];

        businesses.forEach(function(business) {
          var businessInfo = {
            name: business.venue.name,
            rating: business.venue.rating,
            address: business.venue.location.address,
            id: business.venue.id,
            img: business.venue.photos.count === 1
                ? retrieveSizedPhoto(
                    business.venue.photos.groups[0].items[0],
                    "290"
                  )
                : null,
            price: business.venue.price ? business.venue.price.tier : null,
            categories: business.venue.categories,
            coordinates: [
              business.venue.location.lat,
              business.venue.location.lng
            ]
          };

          foursquareBusinessList.push(businessInfo);
        });

          foursquareBusinessList = foursquareBusinessList.sort(function(a, b) {
            return b.rating - a.rating;
          });

          return foursquareBusinessList;

      })
      .then(results => {
        res.send(results);
      })
      .catch(function(err) {
        console.log("axios GET error:", err);
      });
  }),
    server.get("/yelp/:query/in/:near", function(req, res) {
      var query = req.params.query;
      var near = req.params.near;
      var limit = 50;

      yelpAPI
        .get(`search`, {
          params: {
            location: near,
            term: query,
            limit: 50
          }
        })
        .then(function(response) {
          var businesses = response.data.businesses;
          var yelpBusinessList = [];

          businesses.forEach(function(business) {
            if (business.rating) {
              var businessInfo = {
                name: business.name,
                rating: business.rating * 2,
                address: business.location.address,
                id: business.id,
                img: null,
                price: business.price,
                reviews: business.review_count,
                categories: business.categories,
                coordinates: business.coordinates
              };
            }

            yelpBusinessList.push(businessInfo);

            });

            yelpBusinessList = yelpBusinessList.sort(function(a, b) {
              return b.rating - a.rating;
              });

            return yelpBusinessList;
        })
        .then(results => {
          res.send(results);
        })
        .catch(function(err) {
          console.log("axios GET error:", err);
        });
    }),
    server.get("/google/:query/in/:near", function(req, res) {

      let query = req.params.query;
      let thisArea = req.params.near;
      let searchString = query + " near " + thisArea;
      let radius = 5000; // five kilometers

      let geolocate = async () => {
        let latlong = await geocodeAPI
          .get(`/json`, {
            params: {
              address: thisArea
            }
          })
          .then(response => {
            return (
              response.data.results[0].geometry.location.lat +
              "," +
              response.data.results[0].geometry.location.lng
            );
          });
        return latlong;
      };

      geolocate().then(latlong => {
        googleAPI
          .get("textsearch/json", {
            params: {
              location: latlong,
              radius: 5000,
              query: searchString,
              key: googleAPIkey
            }
          })
          .then(function(response) {
            var businesses = response.data.results;
            var googleBusinessList = [];
            businesses.forEach(function(business) {
              var businessInfo = {
                name: business.name,
                rating: business.rating * 2,
                address: business.formatted_address,
                id: business.id,
                img: null,
                price: business.price_level,
                coordinates: {
                  lat: business.geometry.location.lat,
                  lng: business.geometry.location.lng
                },
                categories: null
              };
              googleBusinessList.push(businessInfo);
              });
              googleBusinessList = googleBusinessList.sort(function(a, b) {
                return b.rating - a.rating;
              });
              return googleBusinessList;
          })
          .then(results => {
            res.send(results);
          })
          .catch(function(error) {
            res.send(error);
          });
      });
    });
}
