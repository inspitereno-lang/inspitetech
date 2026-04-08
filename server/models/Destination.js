import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String },
    image: { type: String, required: true },
    tagline: { type: String },
    description: { type: String, required: true }, // Supports basic HTML
    highlights: [{ type: String }],
    icon: { type: String, default: 'fa-map-marker-alt' },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' },
    // Backwards compatibility fields
    title: { type: String },
    location: { type: String }
}, { timestamps: true });

// Sync title/location with name/country if they aren't provided
destinationSchema.pre('save', function(next) {
    if (!this.title) this.title = this.name;
    if (!this.location) this.location = this.country;
    next();
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
