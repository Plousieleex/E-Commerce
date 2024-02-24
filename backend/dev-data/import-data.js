const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../models/userModel');

dotenv.config({path: './../config.env'});

const database = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(database)
    .then(() => console.log('Database connection successfull.'));

const deleteData = async () => {
    try{
        await User.deleteMany();
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

const deleteCollections = async() => {
    try {
        await database.dropCollection("users")
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--delete'){
    deleteData();
} else if(process.argv[2] === '--deleteCol'){

}