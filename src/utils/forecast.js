const request = require('request')

const forecast = (lat, long, callback) =>{

    const url = `http://api.weatherstack.com/current?access_key=d57ffff5d0479a19ba3b278ea261cd67&query=${long},${lat}`

    request({url, json: true}, (error, {body})=> { //url: url is changed to shorthand url because the name matches
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Invalid Location',undefined)
        }else{
            callback(undefined, {
                currentTemp: body.current.temperature,
                feelsLike: body.current.feelslike,
                desc:  body.current.weather_descriptions[0],
                icon: body.current.weather_icons[0]
            })
        }

    })
}

module.exports = forecast;