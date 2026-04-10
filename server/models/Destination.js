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
    slug: { type: String, unique: true, sparse: true },
    id: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' },
    // Backwards compatibility fields
    title: { type: String },
    location: { type: String }
}, { timestamps: true });

// Sync title/location with name/country and generate slug
destinationSchema.pre('save', async function() {
    if (!this.title) this.title = this.name;
    if (!this.location) this.location = this.country;
    
    // Generate slug from name if not present or name changed
    if (this.name && (!this.slug || this.isModified('name'))) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    
    // Sync id with slug for MongoDB unique index compatibility
    if (this.slug) {
        this.id = this.slug;
    }
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
