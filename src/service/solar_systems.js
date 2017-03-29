var solarRepo = require('../repository/solar');
exports.getHoursBelowEstimation = function ( solarId, date,callback) {

    solarRepo.getPowerBySystemIdAndDate(solarId, date,callback);
}

exports.seedSolarEstimationsData = function ( string,callback) {

    solarRepo.seedSolarEstimationsData(string,callback);
}

exports.seedPerformanceData = function ( string,callback) {

    solarRepo.seedPerformanceData(string,callback);
}

