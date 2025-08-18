import { store } from './../store/store';
import { getSessionDetails } from './../functions/userSession';
import { API_URL } from './../functions/environmentVariables';
import axios from 'axios';
import { signOut } from '../store/slices/user';

const sessionDetails = getSessionDetails();

export const appAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
});

appAxios.interceptors.request.use(
  (config) => {
    const appState = store.getState();
    const storeUserDetails = appState?.user?.user;
    // get state is called here to be current at the time of rendering

    const token = storeUserDetails?.token || sessionDetails?.token;

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      // urls to avoid (don't logout when they fail)
      originalConfig.url !== `${API_URL}/auth/login` && //login
      err.response
    ) {
      if (
        err.response.status === 401 &&
        sessionDetails // logout only when a user has session
      ) {
        // Log user out
        store.dispatch(signOut());

        // Reload window so user is redirected to login
        window.location.reload();

        return appAxios(originalConfig);
      }
    }
    return Promise.reject(err);
  }
);
