import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_ENTRY';
      payload: { id: string; newEntry: Entry };
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_ENTRY':
      const patient = state.patients[action.payload.id];

      if (patient) {
        patient.entries = patient.entries
          ? [...patient.entries, action.payload.newEntry]
          : [action.payload.newEntry];
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: patient,
          },
        };
      }
      return state;

    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnoses,
  };
};
