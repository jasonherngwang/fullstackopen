import { v1 as uuidv1 } from 'uuid';
import patients from '../../data/patients';
import { Patient, NewPatient, NewEntry, Entry } from '../types';

const getAllPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

// const getNonSensitivePatientEntries = (): Pick<
//   Patient,
//   'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'
// >[] => {
//   return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
//     id,
//     name,
//     dateOfBirth,
//     gender,
//     occupation,
//   }));
// };

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuidv1(),
    ...entry,
  };

  const patient: Patient | undefined = patients.find((p) => p.id === id);
  if (patient) {
    patient.entries.push(newEntry);
  }
  return newEntry;
};

export default {
  getAllPatients,
  getPatient,
  // getNonSensitivePatientEntries,
  addPatient,
  addEntry,
};
