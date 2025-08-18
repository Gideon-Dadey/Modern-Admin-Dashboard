import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Checkbox from '../../common/Checkbox';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { updateUser } from '../../store/slices/user';
import { splitCamelCase } from '../../functions/stringManipulations';
import Button from '../../common/Button';

const Notification = () => {
  const [loading, setLoading] = React.useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [notifications, setNotifications] = React.useState({
    newUser: false,
    newArtisan: false,
    newAdmin: false,
    newBooking: false,
    emailNotify: false,
    pushNotification: false,
  });

  React.useEffect(() => {
    if (user?.notificationSettings) {
      setNotifications({
        newUser: user?.notificationSettings?.newUser || false,
        newArtisan: user?.notificationSettings?.newArtisan || false,
        newAdmin: user?.notificationSettings?.newAdmin || false,
        newBooking: user?.notificationSettings?.newBooking || false,
        emailNotify: user?.notificationSettings?.emailNotify || false,
        pushNotification: user?.notificationSettings?.pushNotification || false,
      });
    }
  }, [user?.notificationSettings]);

  const updateNotification = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch('/notification/settings', {
        ...notifications,
      });
      sendFeedback(response.data?.message, 'success');
      const userObject = response.data?.data;
      dispatch(
        updateUser({
          user: {
            ...user,
            notificationSettings: {
              ...user?.notificationSettings,
              newUser: userObject.newUser,
              newArtisan: userObject.newArtisan,
              newAdmin: userObject.newAdmin,
              newBooking: userObject.newBooking,
              emailNotify: userObject.emailNotify,
              pushNotification: userObject.pushNotification,
            },
          },
        })
      );
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className='w-full bg-white border border-[#fb6f92] py-6 px-[28px] rounded-md '>
      <h3 className='font-bold mb-5'>Update Notifications</h3>
      <div className='flex flex-col gap-5'>
        {Object.keys(notifications).map((notification) => (
          <Checkbox
            checked={notifications[notification as keyof typeof notifications]}
            id={notification}
            key={notification}
            label={splitCamelCase(notification)}
            className='capitalize border rounded-md p-3'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(notification, e.target.checked);
              setNotifications({
                ...notifications,
                [notification]: e.target.checked,
              });
            }}
          />
        ))}
      </div>
      <Button className='mt-10 h-10' onClick={updateNotification} loading={loading}>
        Update
      </Button>
    </section>
  );
};

export default Notification;
