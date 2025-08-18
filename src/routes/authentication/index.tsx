import Home from '../../pages/dashboard';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/auth/Login';
import { PrivateRoute, ProtectedRoute } from '../utils';
import { UserType } from '../../types/user';
import { getSessionDetails } from '../../functions/userSession';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword';
import VerifyAccount from '../../pages/auth/VerifyAccount';
import AuthSuccessScreen from '../../pages/auth/AuthSuccessScreen';

const currentUser: UserType | null = getSessionDetails();

const authenticationRoutes = [
  {
    path: '/',
    element: !currentUser ? <Login /> : <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/forgot-password',
    element: (
      <ProtectedRoute>
        <ForgotPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/reset-password/:email',
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/verify-account',
    element: (
      <PrivateRoute>
        <VerifyAccount />
      </PrivateRoute>
    ),
  },
  {
    path: '/auth/success',
    element: (
      <PrivateRoute>
        <AuthSuccessScreen />
      </PrivateRoute>
    ),
  },
];

export default authenticationRoutes;
