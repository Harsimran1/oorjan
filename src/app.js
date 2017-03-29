var express = require('express');

var app = express();
var referenceData = require('./service/referenceData');
var solarRepo = require('./repository/solar');
var solarService = require('./service/solar_systems');
var scheduler = require('./service/scheduler');
var moment = require('moment');
var solarApi = require('./api/solar');
solarRepo.init();
scheduler.init();

app.get('/solar_systems/:solarId', solarApi.get);

app.post('/seed/performance', solarApi.seedSolarPerformanceData);
app.post('/seed/estimation', solarApi.seedSolarEstimationsData);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;
