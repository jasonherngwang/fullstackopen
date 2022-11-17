import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { HealthCheck } from '../types';

const HealthCheckEntry = ({ entry }: { entry: HealthCheck }) => {
  return (
    <article>
      <MonitorHeartIcon />
      {entry.date} {entry.description}
    </article>
  );
};

export default HealthCheckEntry;
