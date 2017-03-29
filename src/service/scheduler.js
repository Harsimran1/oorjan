var solarRepo = require('../repository/solar');
var solarService = require('./solar_systems');
var mailer = require('./mailer');

var schedule = require('node-schedule');


exports.init = function() {

    schedule.scheduleJob('0 20 * * *', function () {

        solarRepo.getAllSystems(function (err, result) {
            var time = moment().format('YYYY-MM-DD');
            result.rows.forEach(function (row) {
                solarService.getHoursBelowEstimation(row.id, time, function (err, result) {
                    var text = 'The solar power generated went below for ' + result.rows.length + ' hours today. The report is :<br>';
                    result.rows.forEach(function (row) {
                        text = text + 'Time :' + row.time + ',Estimated Power: ' + row.estimated + ',Actual Power: ' + row.performed + '<br>';
                    });
                    mailer.send(row.emailid, text, 'Solar Power Report');
                });
            });
        });
    });
}