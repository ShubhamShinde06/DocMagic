import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: String,
  experience: Number,
  specialization: String,
  location: String,
  consultationFee: Number,
  rating: Number,
  gender: String,
  language: [String],
},  { timestamps: true });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);


