const request = require('request')

const geocode = (address, callback) =>{

    let mapURL = 'http://api.positionstack.com/v1/forward?access_key=5c1983707e30df6e02f7e872b96c3db2&query='+ encodeURIComponent(address) + '&limit=1'

    request({url: mapURL, json: true}, (error, {body}) =>{

        if (error){
            return callback('Unable to connect to location services!', undefined)
        }else if(!body.data || body.data.length === 0){
            return callback('Unable to find location. Try another search', undefined)
        }else{
            return callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })    
}

module.exports = geocode;