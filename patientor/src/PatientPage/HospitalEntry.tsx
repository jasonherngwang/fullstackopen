import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Hospital } from '../types';

const HospitalEntry = ({ entry }: { entry: Hospital }) => {
  return (
    <article>
      <LocalHospitalIcon />
      {entry.date} {entry.description}
    </article>
  );
};

export default HospitalEntry;
