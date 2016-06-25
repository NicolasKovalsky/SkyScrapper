'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Itinerary = mongoose.model('Itinerary'),
    FlightResult = mongoose.model('FlightResult'),
    _ = require('lodash'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    async = require('async'),
    dateFormat = require('dateformat'),
    Xray = require('x-ray'),
    x = new Xray();



exports.process = function () {

    var idaDesde = ['IGU','BUE'];
    var idaHacia = ['MAD', 'BCN','AMS', 'PAR'];
    var vueltaDesde = ['MAD', 'BCN', 'FRA','VCE',  'AMS','PAR', 'MAD', 'BCN', 'ROM', 'VCE',];
    var vueltaHacia = ['BUE'];
    var dateIdaDesde = new Date(2016, 6, 17);
    var dateIdaHasta = new Date(2016, 6, 20);

    var dateVueltaDesde = new Date(2016, 7, 6);
    var dateVueltaHasta = new Date(2016, 7, 10);

    var datesIda = [];
    var dateIda = dateIdaDesde;

    while (dateIda < dateIdaHasta) {
        datesIda.push(dateFormat(dateIda, "yyyy-mm-dd"));
        dateIda.setDate(dateIda.getDate() + 1);
    }

    var datesVuelta = [];
    var dateVuelta = dateVueltaDesde;
    while (dateVuelta < dateVueltaHasta) {
        datesVuelta.push(dateFormat(dateVuelta, "yyyy-mm-dd"));
        dateVuelta.setDate(dateVuelta.getDate() + 1);
    }


function cartesianProductOf() {
    return _.reduce(arguments, function (a, b) {
        return _.flatten(_.map(a, function (x) {
            return _.map(b, function (y) {
                return x.concat([y]);
            });
        }));
    }, [[]]);
};



    var combinations = cartesianProductOf(idaDesde, idaHacia, vueltaDesde, vueltaHacia, datesIda, datesVuelta);
    console.log(combinations);
    combinations = _.map(combinations, function (combination) {
        return _.zipObject(['idaDesde', 'idaHacia', 'vueltaDesde', 'vueltaHacia', 'idaFecha', 'vueltaFecha'], combination);
    });

    

    async.eachLimit(combinations, 8, function (combination, callback) {

        var driver = new webdriver.Builder().forBrowser('chrome').build();
        driver.manage().deleteAllCookies();
        driver.get('https://www.kayak.com/flights/' + combination.idaDesde + '-' + combination.idaHacia + '/' + combination.idaFecha + '/' + combination.vueltaDesde + '-' + combination.vueltaHacia + '/' + combination.vueltaFecha + '');
        driver.wait(until.elementLocated(By.css('#progressDiv')));
        driver.wait(until.elementIsNotVisible(driver.findElement(By.css('#progressDiv'))));
        driver.findElement(By.className('resultsWrapperSection')).then(function (element) {
            element.getInnerHtml().then(function (html) {
                x(html, '.results_price')(function (err, precio) {
                    combination.precioMasBajo = precio.replace('$', '');
                    var itinerary = new Itinerary(combination);
                    itinerary.save(function (err) {
                        itinerary.toObject();
                        if (!err) {
                            x(html, '.resultrow',
                                [{
                                    precio: 'a.results_price',
                                    ida_desde: x('.singleleg0', '.flighttime.flightTimeDeparture + div.airport'),
                                    ida_hacia: x('.singleleg0', '.flighttime.flightTimeArrival + div.airport'),
                                    ida_hora_salida: x('.singleleg0', '.flighttime.flightTimeDeparture'),
                                    ida_hora_llegada: x('.singleleg0', '.flighttime.flightTimeArrival'),
                                    ida_tiempo_viaje: x('.singleleg0', '.duration'),
                                    ida_detalle: x('.singleleg0', '.stopsLayovers'),
                                    vuelta_desde: x('.singleleg1', '.flighttime.flightTimeDeparture + div.airport'),
                                    vuelta_hacia: x('.singleleg1', '.flighttime.flightTimeArrival + div.airport'),
                                    vuelta_hora_salida: x('.singleleg1', '.flighttime.flightTimeDeparture'),
                                    vuelta_hora_llegada: x('.singleleg1', '.flighttime.flightTimeArrival'),
                                    vuelta_tiempo_viaje: x('.singleleg1', '.duration'),
                                    vuelta_detalle: x('.singleleg1', '.stopsLayovers'),

                                }])
                                (function (err, flightResults) {
                                    flightResults = _.map(flightResults, function(flightResult){
                                        flightResult.precio = flightResult.precio.replace('$','');
                                        flightResult.itinerary = itinerary._id;
                                        return flightResult;
                                    });
                                    FlightResult.collection.insert(flightResults, {}, function (err, docs) {
                                        if (err)
                                            console.log(err);
                                        driver.quit();
                                        callback();
                                    });
                                });
                        }
                    });
                });

            });
        });



    }, function (err) {
        if (err)
            console.log("ERROR:", err);
        console.log("Terminado de procesar");
    });



};



/**
 * Create a article
      exports.create = function (req, res) {
          var article = new Article(req.body);
          article.user = req.user;

          article.save(function (err) {
              if (err) {
                  return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                  });
              } else {
                  res.json(article);
              }
          });
      };




      /**
       * Show the current article
      
      exports.read = function (req, res) {
          res.json(req.article);
      };

      /**
       * Update a article
 
      exports.update = function (req, res) {
          var article = req.article;

          article = _.extend(article, req.body);

          article.save(function (err) {
              if (err) {
                  return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                  });
              } else {
                  res.json(article);
              }
          });
      };

      /**
       * Delete an article
 
      exports.delete = function (req, res) {
          var article = req.article;

          article.remove(function (err) {
              if (err) {
                  return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                  });
              } else {
                  res.json(article);
              }
          });
      };

      /**
       * List of Articles
       */
exports.list = function (req, res) {
    Itinerary.find().sort('-created -price').exec(function (err, itineraries) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(itineraries);
        }
    });
};

/**
 * Article middleware
 */
exports.itineraryByID = function (req, res, next, id) {
    Itinerary.findById(id).exec(function (err, itinerary) {
        if (err) return next(err);
        if (!itinerary) return next(new Error('Failed to load article ' + id));
        req.itinerary = itinerary;
        next();
    });
};

/**
 * Article authorization middleware
 
exports.hasAuthorization = function (req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
*/
