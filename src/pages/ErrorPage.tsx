import { useRouteError } from 'react-router';
import AppLayout from '../layout/AppLayout';

function ErrorPage() {
  const error: any = useRouteError();
  return (
    <AppLayout>
      <div className='flex items-center justify-center min-h-main flex-col'>
        <h1 className='text-3xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          Error:{' '}
          <i>
            <b>{error.statusText || error.message}</b>
          </i>
        </p>
      </div>
    </AppLayout>
  );
}

export default ErrorPage;
