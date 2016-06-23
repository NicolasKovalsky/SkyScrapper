'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	itineraries = require('../../app/controllers/itinerary.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/itineraries')
		.get(itineraries.list);
    
    app.route('/itineraries/process')
		.get(itineraries.process);

	/*app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);*/
};