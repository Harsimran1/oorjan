require('../utils/date-helper');
var solarService = require('../service/solar_systems');
var referenceData = require('../service/referenceData');
var moment = require('moment');
var performanceData = require('../constants/performanceData')



exports.get = function(req,res){
    if(req.query.date){
        var date=moment(req.query.date,'DD-MM-YYYY');
        solarService.getHoursBelowEstimation(req.params.solarId,date.format('YYYY-MM-DD'),function(err,result){

            res.send(result.rows);
        });
    }
    else{
        res.send('Please specify the date');
    }
};

exports.seedSolarPerformanceData = function(req,res){
   var dateTime = moment(req.query.date, 'DD-MM-YYYY');
    var string ='';

   performanceData.data.forEach(function(dcPower){
       dateTime=moment(dateTime).add(1,'h')


       if (string != '') {
           string = string + ',' + "(" + req.query.id +"," + dcPower + ",'" + dateTime.format('YYYY-MM-DD HH:mm:SS') + "')";
       }
       else {
           string = "(" + req.query.id  + "," + dcPower + ",'" + dateTime.format('YYYY-MM-DD HH:mm:SS') + "')";
       }

   });

    solarService.seedPerformanceData(string,function(err,result){
        if(err){
            res.send(err);
            return;
        }
        res.send('Executed succesfully');
    });

}

exports.seedSolarEstimationsData = function (req, res) {
    referenceData.get(req.query.lat,req.query.lon,req.query.system_capacity,function (err,response) {
        if(err){
            res.send('failed to get estimated data');
            return;
        }
        var string ='';
        var dateTime = moment("2017-01-01T00:00:00");
        response.outputs.dc.forEach(function(dcPower){
            dateTime=moment(dateTime).add(1,'h')

            if (string != '') {
                string = string + ',' + "(" + req.query.lat + "," + req.query.lon + "," + req.query.system_capacity +"," + dcPower + ",'" + dateTime.format('YYYY-MM-DD HH:mm:SS') + "')";
            }
            else {
                string = "(" + req.query.lat + ',' + req.query.lon + "," + req.query.system_capacity + "," + dcPower + ",'" + dateTime.format('YYYY-MM-DD HH:mm:SS') + "')";
            }

        });

        solarService.seedSolarEstimationsData(string,function(err,result){
            if(err){
                res.send(err);
                return;
            }
            res.send('Executed succesfully');
        });


    });
}

