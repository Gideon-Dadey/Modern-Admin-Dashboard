import { UserType } from '../types/user';
import { decryptItem, encryptItem } from './encryption';
import { SESSION_KEY, SESSION_NAME } from './environmentVariables';

export const getSessionDetails = () => {
  let sessionDetails = localStorage.getItem(SESSION_NAME!);
  if (sessionDetails) {
    sessionDetails = decryptItem(sessionDetails, SESSION_KEY!);
    sessionDetails = JSON.parse(sessionDetails);
  }

  return sessionDetails as UserType | null;
};

export const storeSessionDetails = (sessionDetails: UserType) => {
  const encryptedSession = encryptItem(sessionDetails, SESSION_KEY!);
  localStorage.setItem(SESSION_NAME!, encryptedSession);
  return true;
};

export const removeSessionDetails = () => {
  localStorage.removeItem(SESSION_NAME!);
  return true;
};
