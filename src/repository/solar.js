var pg = require('pg');

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools

var config = {
    database: 'oorjan', //env var: PGDATABASE
    host: 'localhost', // Server hosting the postgres database
    port: 5432,

    //env var: PGPORT
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pg_client = new pg.Client(config);



// connect to our database
exports.init = function(){
    pg_client.connect(function (err) {
        if (err) throw err;
    });
};

exports.getAllSystems = function(callback){
    pg_client.query("select * from solar_systems",function(err, result){
        callback(err, result);
    });
};

exports.getPowerBySystemIdAndDate = function(solarId,date,callback) {
   pg_client.query("Select sp.DC_POWER as performed,se.DC_POWER as estimated,sp.TIMESTAMP as time from solar_system_performance sp join solar_systems s on s.ID = sp.SOLAR_ID join solar_estimations se on se.LAT=s.LAT and se.LONG=s.LONG and se.CAPACITY = s.CAPACITY and sp.TIMESTAMP = se.TIMESTAMP where sp.SOLAR_ID =" +solarId+" and sp.TIMESTAMP >= '"+date+"'::date AND sp.TIMESTAMP < ('"+date+"'::date + '1 day'::interval) and sp.DC_POWER < 0.8*se.DC_POWER",function(err,res){
       callback(err,res);
   })
};

exports.seedPerformanceData = function(str,callback){
    pg_client.query('insert into  solar_system_performance (SOLAR_ID,DC_POWER, TIMESTAMP) values '+str,function(err,res){
        callback(err,res);
    })
}


exports.seedSolarEstimationsData = function(str,callback){
    pg_client.query('insert into solar_estimations(LAT,LONG,CAPACITY,DC_POWER,TIMESTAMP) values '+str,function(err,res){
        callback(err,res);
    })
}