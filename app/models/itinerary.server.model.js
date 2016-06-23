'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ItinerarySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	idaDesde: {
		type: String,
		default: '',
		trim: true,
		required: 'idaDesde cannot be blank'
	},
    idaHacia: {
		type: String,
		default: '',
		trim: true,
		required: 'idaHacia cannot be blank'
	},
    idaFecha: {
		type: String,
		default: '',
		trim: true,
		required: 'idaFecha cannot be blank'
	},
    vueltaDesde: {
		type: String,
		default: '',
		trim: true,
		required: 'vueltaDesde cannot be blank'
	},
    vueltaHacia: {
		type: String,
		default: '',
		trim: true,
		required: 'vueltaHacia cannot be blank'
	},
    vueltaFecha: {
		type: String,
		default: '',
		trim: true,
		required: 'vueltaFecha cannot be blank'
	},
    precioMasBajo: {
		type: Number,
		default: '',
		trim: true,
		required: 'precio cannot be blank'
	}
});

mongoose.model('Itinerary', ItinerarySchema);