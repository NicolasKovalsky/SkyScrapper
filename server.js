var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var async = require('async');
var _ = require('lodash');




var idaDesde = ['IGU'];
var idaHacia = ['MAD', 'BCN', 'ROM', 'VCE', 'FRA', 'LIS', 'PAR', 'AMS'];
var vueltaDesde = ['MAD', 'BCN', 'ROM', 'VCE', 'FRA', 'LIS', 'PAR', 'AMS'];
var vueltaHacia = ['BUE'];
var dateIda = new Date(2016, 7, 12);
var dateVuelta = new Date(2016, 8, 8);

var results = [];
console.log(cartesianProductOf([1, 2], [3, 4], ['a', 'b']));
console.log(cartesianProductOf(idaDesde, idaHacia, vueltaDesde, vueltaHacia));

function cartesianProductOf() {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }));
    }, [ [] ]);
};

/*
async.each(idaDesde, function (airportFrom, callback) {

    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.manage().deleteAllCookies();
    driver.get('https://www.kayak.com/flights/'+airportFrom+'-' + + '/' + dateIda +'/MAD-BUE/2016-08-03');
    driver.wait(until.elementLocated(By.css('#progressDiv')), 10000);
    driver.wait(until.elementIsNotVisible(driver.findElement(By.css('#progressDiv'))));
    driver.findElement(By.className('results_price')).getText().then(function (text) {


    }, function (err) {
        if (err)
            console.log("ERROR:", err)
        console.log(_.sortBy(results, 'price'));

    })

})
*/


//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
//driver.wait(until.attributeToBe('webdriver - Google Search'), 1000);
//driver.quit();
