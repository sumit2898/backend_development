import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';
import dns from 'dns';

// Set public DNS to resolve MongoDB SRV records correctly if local ISP/DNS blocks them
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connnectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            family: 4, // Forces Node to use IPv4 and can sometimes bypass this DNS resolution bug
        })
        console.log(`MongoDB connected !! db host ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection Error : ", error);
        process.exit(1);
             
    }
}

export default connnectDB;