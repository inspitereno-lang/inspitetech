import mongoose from 'mongoose';
import Service from './server/models/Service.js';
import dotenv from 'dotenv';
dotenv.config();

async function checkServices() {
    await mongoose.connect(process.env.MONGODB_URI);
    const services = await Service.find({});
    console.log('Services in DB:');
    services.forEach(s => {
        console.log(`ID: ${s._id}, Title: ${s.title}`);
    });
    process.exit();
}

checkServices();
