const { searchForPatient, updatePatient } = require('./SearchLogic.js');
const SearchPatient = require("../models/Patients.js");

describe('searchForPatient', () => {
  it('should throw an error when there is an error fetching patients', async () => {
    const searchPhrase = 'John';
    const errorMessage = 'Database error';

    // Mock the SearchPatient.find method to throw an error
    SearchPatient.find = jest.fn().mockRejectedValue(new Error(errorMessage));

    await expect(searchForPatient(searchPhrase)).rejects.toThrow('Error fetching patients');
  });
});

describe('updatePatient', () => {
  it('should throw an error when the patient is not found', async () => {
    const oldEmail = 'nonexistent@example.com';
    const updates = { firstname: 'NewName' };

    // Mock the SearchPatient.findOne method to return null
    SearchPatient.findOne = jest.fn().mockResolvedValue(null);

    await expect(updatePatient(oldEmail, updates)).rejects.toThrow('Internal server error');
  });
});
