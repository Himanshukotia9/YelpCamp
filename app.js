const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const Campground = require('./models/campground')

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("Mongo CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO Mongo Connection ERROR!!!!")
    console.log(err)
})

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/makecampground', async(req,res) => {
    const camp = new Campground({title: 'My Backyard', description: 'Cheap Camping'});
    await camp.save();
    res.send(camp)
})



app.listen(3000,() => {
    console.log('Starting Yelp Camp on 3000')
})