import { Diagnosis } from '../types';

interface DiagnosisCodeProps {
  codes: string[];
  diagnoses: Diagnosis[];
}

const DiagnosisCodes = ({ codes, diagnoses }: DiagnosisCodeProps) => {
  return (
    <ul>
      {codes.map((code) => {
        return (
          <li key={code}>
            {code}: {diagnoses.filter((d) => d.code === code)[0].name}
          </li>
        );
      })}
    </ul>
  );
};

export default DiagnosisCodes;
