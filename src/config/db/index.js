var express = require('express');
const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/nodejs_blog_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log('Connected successfully !');
    }catch(error){
        console.log('Failed connected!!');
    }
}

module.exports = {connect};