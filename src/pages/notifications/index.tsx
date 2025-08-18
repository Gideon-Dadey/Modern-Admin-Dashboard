import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';

function Notifications() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/notification`);
      setAllData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableHeaders = ['category', 'message', 'isRead', 'createdAt', '_id'];

  const markNotificationAsRead = async (id: string) => {
    try {
      await appAxios.patch(`/notification/update/${id}`, {
        isRead: true,
      });
      getData();
    } catch (error) {
      sendCatchFeedback(error);
    }
  };

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Notifications'
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'Mark as read',
              onClick: (id) => markNotificationAsRead(id),
            },
          ],
        }}
      />
    </AppLayout>
  );
}

export default Notifications;
