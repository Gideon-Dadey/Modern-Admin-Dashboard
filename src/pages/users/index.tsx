import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';

const Users = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selected, setSelected] = useState('');

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/booking`);
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

  const tableHeaders = ['artisan', 'createdAt', 'duration', 'notes', 'status', '_id'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Users'
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Appointment',
              onClick: (id) => {
                setSelected(id);
                setViewModal(true);
              },
            },
          ],
        }}
      />
    </AppLayout>
  );
};

export default Users;
