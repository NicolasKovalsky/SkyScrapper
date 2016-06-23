'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var FlightResultSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    precio: {
		type: Number,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	ida_desde: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
    ida_hacia: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
    ida_hora_salida: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
    ida_hora_llegada: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
    ida_tiempo_viaje: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	ida_detalle: {
		type: String,
		default: '',
		trim: true
	},
     vuelta_desde: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
     vuelta_hacia: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
     vuelta_hora_salida: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
     vuelta_hora_llegada: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
     vuelta_tiempo_viaje: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
     vuelta_detalle: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
    itinerary:{
        type: Schema.ObjectId,
		ref: 'Itinerary'
    }
});

mongoose.model('FlightResult', FlightResultSchema);
