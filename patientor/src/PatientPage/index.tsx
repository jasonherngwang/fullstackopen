import { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { Entry } from '../types';
import { Button } from '@material-ui/core';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HospitalEntry from './HospitalEntry';
import DiagnosisCodes from './DiagnosisCodes';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: 'ADD_ENTRY', payload: { id: String(id), newEntry } });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const patient = Object.values(patients).find(
    (p: Patient) => p.id === id
  ) as Patient;

  const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} />;
      case 'Hospital':
        return <HospitalEntry entry={entry} />;
      default:
        return null;
    }
  };

  if (patient) {
    return (
      <div>
        <section>
          <h2>{patient.name}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </section>
        <section>
          <h2>Entries</h2>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
              {entry.diagnosisCodes && (
                <DiagnosisCodes
                  codes={entry.diagnosisCodes}
                  diagnoses={diagnoses}
                />
              )}
            </div>
          ))}
        </section>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    );
  }
  return null;
};

export default PatientPage;
