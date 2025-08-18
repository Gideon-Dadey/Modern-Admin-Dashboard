import React from 'react';
import { sendFeedback } from '../functions/feedback';
import { Navigate } from 'react-router-dom';
import { UserType } from '../types/user';
import { getSessionDetails } from '../functions/userSession';

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  // const currentUser: UserType | null = getSessionDetails();

  // if (!currentUser) {
  //   sendFeedback('Login to continue', 'warning');
  //   return <Navigate to='/auth/login' replace />;
  // }
  return children;
};

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  // const currentUser: UserType | null = getSessionDetails();

  // if (currentUser && Object.keys(currentUser).length) {
  //   sendFeedback('You are already logged in');
  //   return <Navigate to='/dashboard' replace />;
  // }
  return children;
};
