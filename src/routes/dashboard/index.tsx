import Dashboard from '../../pages/dashboard';
import { PrivateRoute } from '../utils';

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
];

export default dashboardRoutes;
