import Settings from '../../pages/settings';
import { PrivateRoute } from '../utils';

const settingsRoutes = [
  {
    path: '/settings',
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },
];

export default settingsRoutes;
