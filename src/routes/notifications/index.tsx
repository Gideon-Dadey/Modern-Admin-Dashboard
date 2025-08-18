import Notifications from '../../pages/notifications';
import { PrivateRoute } from '../utils';

const notificationsRoutes = [
  {
    path: '/notifications',
    element: (
      <PrivateRoute>
        <Notifications />
      </PrivateRoute>
    ),
  },
];

export default notificationsRoutes;
