var request = require('request');


exports.get = function (lat, long, system_capacity,callback) {
    request({url:'http://developer.nrel.gov/api/pvwatts/v5.json?api_key=DEMO_KEY&lat='+lat+'&lon='+long+'&system_capacity='+system_capacity+'&azimuth=180&tilt=' + lat +'&array_type=1&module_type=1&losses=10&dataset=IN&timeframe=hourly'},function (error,response)
        {
            if(error){
                callback(error);
                console.log('passthroughToAttributesApi in requestWrapper returned error', error);
                return;
            }
            if (response.body !== undefined) {
                callback(error, JSON.parse(response.body));
            }
            else {
                callback({statusCode: response.statusCode, message: response.body});
            }}
    );
}
