import mongoose from 'mongoose';

const authoritySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // e.g., tech, general, hostel, cult, acad
    name: { type: String, required: true }, // Display name e.g., Tech Secretary
    photoPath: { type: String }, // e.g., /assets/tech_secy.png
    description: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'authorities_grievance_portal' }
);

export default mongoose.model('AuthorityGrievancePortal', authoritySchema);


