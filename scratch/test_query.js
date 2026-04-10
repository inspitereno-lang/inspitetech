import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../server/.env') });

const serviceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    title: String,
});

async function testQuery() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Service = mongoose.model('ServiceTest', serviceSchema, 'services'); // Use existing collection 'services'
        
        const idToSearch = 'visa';
        
        console.log(`Searching for ID: ${idToSearch}`);
        const service = await Service.findOne({ _id: idToSearch });
        
        if (service) {
            console.log('Found service:', service.title);
        } else {
            console.log('Service not found.');
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error('Query failed:', err.message);
        process.exit(1);
    }
}

testQuery();
