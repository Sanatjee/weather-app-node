const path = require('path');

const express = require('express')

const hbs = require('hbs')

const geoCode = require("./utils/geoCode")
const foreCast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000
// defining paths for express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname,'../template/partials');

// handle bar set up
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setting up static 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        'title' : 'Weather App',
        'name' : 'Sanat Gawade'
    })    
})

app.get('/about', (req,res) => {
    res.render('about',{
        'title' : 'About',
        'name' : 'Sanat Gawade'
    })   
})

app.get('/help', (req,res) => {
    res.render('help',{
        'title' : 'Help',
        'name' : 'Sanat Gawade',
        'message' : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    })  
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geoCode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        foreCast(latitude,longitude,(error, foreCastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                foreCast : foreCastData,
                location,
                address : req.query.address
            })
        })
    })
    
})

app.get('/products', (req,res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term'
        })    
    }
    res.send({
        'products' : []
    })
})

app.get('/help/*', (req,res) => {
     res.render('404',{
        'title' : "404",
        'name' : "Sanat Gawade",
        "errorMessage" : "Help Page Not Found"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        'title' : "404",
        'name' : "Sanat Gawade",
        "errorMessage" : "Page Not Found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})