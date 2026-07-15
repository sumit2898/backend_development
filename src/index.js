import mongoose from 'mongoose'; 
import dotenv from 'dotenv'
import { DB_NAME } from './constants.js';
import express from 'express';
import connnectDB from './db/index.js';

dotenv.config({
    path:'./env'
})


connnectDB()
const app = express()

// function connnectDB(){

// }

// (async() => {

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//         app.on("error" ,() => {
//             console.log("ERROR " , error);
//             throw error
//         })
        
//         app.listen(process.env.PORT,() =>{
//             console.log("the app is listening ", process.env.PORT);
//         })

//     } catch (error) {
//         console.error("ERROR : " , error);
        
//     }

// })()