import { SearchPatient } from "../models/Patients.js";

export default function () {
  async function searchForPatient(searchPhrase) {
    try {
      const patients = await SearchPatient.find({
        $or: [
            { firstname: searchPhrase },
            { lastname: searchPhrase },
            { email: searchPhrase }
        ]
      });
      return patients;
    } catch (error) {
      console.error(`Error fetching patients: ${error.message}`);
      throw new Error("Error fetching patients");
    }
  }

  async function updatePatient(oldEmail, updates) {
    try {
      const patient = await SearchPatient.findOne({ email: oldEmail });

      if (!patient) {
        throw new Error("Patient not found");
      }

      patient.firstname = updates.firstname || patient.firstname;
      patient.prefix = updates.prefix || patient.prefix;
      patient.lastname = updates.lastname || patient.lastname;
      patient.email = updates.email || patient.email;
      patient.bio = updates.bio || patient.bio;
      patient.isActive = updates.isActive || patient.isActive;

      const updatedPatient = await patient.save();

      return updatedPatient;
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error");
    }
  }

  return {
    searchForPatient,
    updatePatient
  };
}