const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const Campground = require('../models/campground')
const cities = require('./cities')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("Mongo CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO Mongo Connection ERROR!!!!")
    console.log(err)
})

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i= 0; i < 50; i++){
        const random400 = Math.floor(Math.random() * 400);
        const camp = new Campground({
            location: `${cities[random400].city}, ${cities[random400].state}`
        })
        await camp.save();

    }
}

seedDB();