var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placesSchema = Schema({
    foursquare_id: {type: String, required: true, unique: true},
    /*yelp_id: {type: String, unique: true},
    google_id: {type: String, unique: true},*/
    name: { type: String, required: true },
    categories: [{type: String}],
    img: {type: String},
    address: {
      formatted: {type: String},
      city: {type: String},
    },
    latlng: {
      type: { type: String },
      coordinates: [Number]
    },
    /*tips: [{type: String}],*/
    url: {type: String, required: true},
    rating: {
      foursquare: {type: Number}
      /*yelp: {type: Number},
      google: {type: Number},*/
    }
});

placesSchema.index({ "latlng": "2dsphere" });

var Places = mongoose.model('Places', placesSchema);

module.exports = Places;

/*
var Places = mongoose.model("Places", placesSchema );

var places = new Places({
   "loc": {
       "type": "Point",
       "coordinates": [-73.97, 40.77]
   }
});
*/
