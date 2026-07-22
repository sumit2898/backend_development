import mongoose from 'mongoose'; 
import dotenv from 'dotenv'
import { DB_NAME } from './constants.js';
import express from 'express';
import connnectDB from './db/index.js';
import app from './app.js'

dotenv.config({
    path:'./env'
})


connnectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`your app is listening on ${process.env.PORT}`);
        
    }
)})
.catch((error) => {
    console.log("MongoDB connection failed ", error);
    
})
// app = express()

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