const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
//Define path for Express config for static file
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//To render a dynamic html file using hbs handlebars with express
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Apps',
        name: 'Omowale Yusuf'
    })
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Omowale Yusuf'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Omowale Yusuf'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            Error: 'You must provide an address'
        })
    }

    const address = req.query.address

    geocode(address, (errors, {location, longitude, latitude} ={} ) =>{ //Destructure data coming from geocode
        //={} is added to provide a default valued for our destructured variable latitude, longitude and location incae of undefined
        if(errors){
            return res.send({
                'Error': errors
            }) //The program will terminate here since we return and wont execute downward
        }
        //console.log(`Weather Forecast for ${location}`)
        forecast(longitude,latitude, (error, {desc, currentTemp, feelsLike} = {}) =>{ //Destructure data coming from forecast
            if(error){
                return res.send({
                    'Error': error
                })
            }
            res.send({
                'Location': location,
                'Description': desc,
                'Current Temp': currentTemp,
                'Feels Like': feelsLike,
                'forecast': `${desc}. It is currently ${currentTemp} degree out. it feels like ${feelsLike} degree out`
            })
            //console.log(`${desc}. It is currently ${currentTemp} degree out. it feels like ${feelsLike} degree out`)
        })
    })
})

app.get('/product', (req, res) => {
    console.log (req.query)
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Article not found',
        title: '404',
        name: 'Omowale Yusuf'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
       errorMessage: 'Page Not Found',
       title: '404',
       name: 'Omowale Yusuf' 
    })
    
})
//Dymic rendering with hbs ends here



app.get('/weather', (req, res) => {
    res.send('The weather page')
})


app.listen(3000, () =>{
    console.log('Server has started running at PORT 3000')
})
