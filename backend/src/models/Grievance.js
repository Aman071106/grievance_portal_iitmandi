import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGrievancePortal', required: true },
    authorityKey: { type: String, required: true }, // matches Authority.key
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'discarded', 'resolved'],
      default: 'pending',
    },
    attachments: [{ type: String }],
  },
  { timestamps: true, collection: 'grievances_grievance_portal' }
);

export default mongoose.model('GrievanceGrievancePortal', grievanceSchema);


