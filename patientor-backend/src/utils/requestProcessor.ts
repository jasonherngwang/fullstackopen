import { v1 as uuidv1 } from 'uuid';

import {
  NewPatient,
  Gender,
  HealthCheckRating,
  Entry,
  NewEntry,
  OccupationalHealthcare,
  Hospital,
  HealthCheck,
} from '../types';

// Parse Patient data
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
    // throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries as Entry[];
};

// const parseNewEntry = (entry: unknown): NewEntry => {
//   if (!entry) {
//     throw new Error('Incorrect or missing entry: ' + entry);
//   }
//   return entry as NewEntry;
// };

// Parse Entry data
const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

// const parseType = (typeName: unknown): string => {
//   if (!typeName || !isString(typeName)) {
//     throw new Error('Incorrect or missing typeName: ' + typeName);
//   }
//   return typeName;
// };

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

// const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
//   if (
//     !Array.isArray(diagnosisCodes) ||
//     diagnosisCodes.some((code) => !isString(code))
//   ) {
//     throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
//   }
//   return diagnosisCodes as string[];
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing health check rating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }
  return employerName;
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

type SickLeaveFields = {
  startDate: unknown;
  endDate: unknown;
};

const parseSickLeave = ({ startDate, endDate }: SickLeaveFields): SickLeave => {
  if (!startDate || !isString(startDate) || !endDate || !isString(endDate)) {
    throw new Error('Incorrect or missing sick leave dates');
  }
  return { startDate, endDate };
};

type Discharge = {
  date: string;
  criteria: string;
};

type DischargeFields = {
  date: unknown;
  criteria: unknown;
};

const parseDischarge = ({ date, criteria }: DischargeFields): Discharge => {
  if (!date || !isString(date) || !criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge info');
  }
  return { date, criteria };
};

// User input types are initially unknown
type NewPatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatient = (object: NewPatientFields): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
};

// type NewEntryFields = {
//   type: unknown;
//   date: unknown;
//   specialist: unknown;
//   description: unknown;
//   diagnosisCodes?: unknown;
//   // OccupationalHealthcare
//   employerName?: unknown;
//   sickLeave?: unknown;
//   // Hospital
//   discharge?: unknown;
//   // HealthCheckRating
//   healthCheckRating?: unknown;
// };

export const toNewEntry = (object: any): NewEntry => {
  console.log(object);
  const newEntry = {
    type: object.type,
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
    diagnosisCodes: object.diagnosisCodes,
  };

  switch (object.type) {
    case 'HealthCheck':
      const newHealthCheck: HealthCheck = {
        ...newEntry,
        id: uuidv1(),
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newHealthCheck;
    case 'OccupationalHealthcare':
      const newOccupationalEntry: OccupationalHealthcare = {
        ...newEntry,
        id: uuidv1(),
        type: 'OccupationalHealthcare',
        employerName: object.employerName
          ? parseEmployerName(object.employerName)
          : undefined,
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave as SickLeaveFields)
          : undefined,
      };
      return newOccupationalEntry;
    case 'Hospital':
      const newHospitalEntry: Hospital = {
        ...newEntry,
        id: uuidv1(),
        type: 'Hospital',
        discharge: parseDischarge(object.discharge as Discharge),
      };
      return newHospitalEntry;
    default:
      throw new Error('Incorrect entry type.');
  }
};
