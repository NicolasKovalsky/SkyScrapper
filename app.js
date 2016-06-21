
var Xray = require('x-ray');
var x = Xray();
 

var idaDesde = ['IGU'];
var idaHacia = ['MAD' ];


x('https://www.kayak.com/flights/IGU-MAD/2016-07-19/MAD-BUE/2016-08-03', '.flightresult.resultrow', [{
  precio: 'a.results_price'
 /* ida_desde:  x('singleleg0', '.flighttime.flightTimeDeparture + div.airport'),
  ida_hacia: x('singleleg0', '.flighttime.flightTimeArrival + div.airport'),
  vuelta_desde:  x('singleleg1', '.flighttime.flightTimeDeparture + div.airport'),
  vuelta_hacia:  x('singleleg1', '.flighttime.flightTimeArrival + div.airport')*/
}]).delay(5000)(function(err, obj){
    console.log(err);
    console.log(obj);
})
  