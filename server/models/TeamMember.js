import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String },
    expertise: { type: String },
    languages: [{ type: String }],
    order: { type: Number, default: 0 },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String }
    }
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
