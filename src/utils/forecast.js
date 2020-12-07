const request  = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b314c289ae0b842582fd43e806e2f69b&query='+latitude+','+longitude;
    request({url,json :true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'It is currently '+body.current.temperature+" degree celcius")
        }
    })
}
module.exports = forecast