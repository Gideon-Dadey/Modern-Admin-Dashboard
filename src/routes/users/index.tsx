import Users from '../../pages/users';
import { PrivateRoute } from '../utils';

const usersRoutes = [
  {
    path: '/users',
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
];

export default usersRoutes;
