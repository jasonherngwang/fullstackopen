// Diagnosis
export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// Patient entry
interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

// Specialized entries
export interface OccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface Hospital extends BaseEntry {
  type: 'Hospital';
  discharge?: {
    date: string;
    criteria: string;
  };
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheck extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthcare | Hospital | HealthCheck;

export type NewEntry =
  | Omit<OccupationalHealthcare, 'id'>
  | Omit<Hospital, 'id'>
  | Omit<HealthCheck, 'id'>;

// Patient
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
