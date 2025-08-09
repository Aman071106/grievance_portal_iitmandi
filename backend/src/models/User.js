import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      match: /@(?:[a-zA-Z0-9-]+\.)?iitmandi\.ac\.in$/
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      trim: true
    }, 
    avatarUrl: { type: String },
  },
  { timestamps: true, collection: 'users_grievance_portal' }
);

userSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model('UserGrievancePortal', userSchema);


