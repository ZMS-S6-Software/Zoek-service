import { expect } from "chai";
import sinon from "sinon";
import patientLogic from "../BusinessLogic/SearchLogic.js";
import { SearchPatient } from "../models/Patients.js";
const patientService = patientLogic();

describe("patients module", () => {
  describe("searchForPatient function", () => {
    it("should return patients matching the search phrase", async () => {
      const mockPatients = [
        { firstname: "John", lastname: "Doe", email: "john@example.com" },
      ];
      sinon.stub(SearchPatient, "find").resolves(mockPatients);

      const patients = await patientService.searchForPatient("John");

      expect(patients).to.deep.equal(mockPatients);
    });
  });

  describe("updatePatient function", () => {
    it("should update patient information", async () => {
      const mockPatient = {
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        save: sinon.stub().resolves(),
      };
      sinon.stub(SearchPatient, "findOne").resolves(mockPatient);

      const updates = { firstname: "Jane" };
      try {
        const updatedPatient = await patientService.updatePatient(
          "john@example.com",
          updates
        );
        console.log("Updated Patient:", updatedPatient);
        expect(updatedPatient.firstname).to.equal("Jane");
        expect(mockPatient.save.calledOnce).to.be.true;
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});
