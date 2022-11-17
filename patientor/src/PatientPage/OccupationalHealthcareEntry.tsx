import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { OccupationalHealthcare } from '../types';

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcare;
}) => {
  return (
    <article>
      <BusinessCenterIcon />
      {entry.date} {entry.description}
    </article>
  );
};

export default OccupationalHealthcareEntry;
