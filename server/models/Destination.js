import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String },
    image: { type: String, required: true },
    tagline: { type: String },
    description: { type: String, required: true }, // Supports basic HTML
    highlights: [{ type: String }],
    icon: { type: String, default: 'fa-map-marker-alt' },
    priority: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' },
    // Backwards compatibility fields
    title: { type: String },
    location: { type: String }
}, { timestamps: true });

// Sync title/location with name/country if they aren't provided
destinationSchema.pre('save', async function() {
    if (!this.title) this.title = this.name;
    if (!this.location) this.location = this.country;
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
