import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  });

export const SearchPatient = mongoose.model('SearchPatient', patientSchema);