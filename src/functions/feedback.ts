import { toast } from 'react-toastify';

type Type = 'success' | 'info' | 'warning' | 'error';
type Message = string;

export const sendFeedback = (message: Message, type?: Type) => {
  toast[type || 'info'](message, {
    toastId: 'toastId',
  });
};

export const sendCatchFeedback = (error: any) => {
  toast.error(
    error.response?.data ? error.response.data.message : 'Request unsuccessful',
    {
      toastId: 'toastId',
    }
  );
};
