import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { updateUser } from './store/slices/user';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';
import { getSessionDetails } from './functions/userSession';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentUser = getSessionDetails();
    // console.log(currentUser);
    if (currentUser && Object.keys(currentUser).length) {
      dispatch(updateUser({ user: currentUser || null }));
    }
  }, [dispatch]);

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        style={{
          fontSize: 16,
          zIndex: 30,
        }}
        theme='colored'
        autoClose={5000}
        position='top-right'
        hideProgressBar={true}
        closeOnClick={true}
      />
    </>
  );
}

export default App;
