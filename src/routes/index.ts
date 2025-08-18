import adminsRoutes from './admins';
import authenticationRoutes from './authentication';
import dashboardRoutes from './dashboard';
import notificationsRoutes from './notifications';
import settingsRoutes from './settings';
import usersRoutes from './users';

const routes: any[] = [
  ...authenticationRoutes,
  ...dashboardRoutes,
  ...adminsRoutes,
  ...notificationsRoutes,
  ...settingsRoutes,
  ...usersRoutes,
];

export default routes;
