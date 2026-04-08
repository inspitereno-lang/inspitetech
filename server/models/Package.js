import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    icon: { type: String, default: 'fa-suitcase' },
    description: { type: String, required: true },
    inclusions: [{ type: String }],
    conclusion: { type: String },
    price: { type: String },
    duration: { type: String },
    isEnquiryOnly: { type: Boolean, default: false },
    categoryTag: { type: String },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' },
    // Backwards compatibility
    features: [{ type: String }]
}, { timestamps: true });

// Sync features with inclusions if features isn't provided
packageSchema.pre('save', function(next) {
    if ((!this.features || this.features.length === 0) && this.inclusions) {
        this.features = this.inclusions;
    }
    next();
});

const Package = mongoose.model('Package', packageSchema);
export default Package;
