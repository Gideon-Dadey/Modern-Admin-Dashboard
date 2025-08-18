import Admins from '../../pages/admins';
import { PrivateRoute } from '../utils';

const adminsRoutes = [
  {
    path: '/admins',
    element: (
      <PrivateRoute>
        <Admins />
      </PrivateRoute>
    ),
  },
];

export default adminsRoutes;
