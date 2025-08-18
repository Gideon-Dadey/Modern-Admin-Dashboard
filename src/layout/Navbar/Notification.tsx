import React from 'react';
import { Link } from 'react-router-dom';
import NotificationIcon from '../../assets/icons/bell.svg';
import { sendCatchFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { NotificationType } from '../../types/data';

const Notification = () => {
  const [allData, setAllData] = React.useState<NotificationType[] | []>([]);

  const getData = async () => {
    try {
      const response = await appAxios.post(`/all/notification`);
      setAllData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const unreadNotifications = React.useMemo(() => {
    return allData.filter((data) => !data.isRead);
  }, [allData]);
  return (
    <Link to='/notifications' className='relative mr-[15px]'>
      {unreadNotifications && unreadNotifications.length > 0 && (
        <div className='w-[7px] h-[7px] bg-error rounded-full absolute right-[3px] top-0' />
      )}
      <img src={NotificationIcon} alt='Notification' />
    </Link>
  );
};

export default Notification;
