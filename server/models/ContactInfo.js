import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    whatsappLink: { type: String },
    branches: [{
        name: { type: String },
        address: { type: String },
        phone: { type: String }
    }]
}, { timestamps: true });

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);
export default ContactInfo;
