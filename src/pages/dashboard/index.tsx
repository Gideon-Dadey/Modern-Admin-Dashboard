import { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import AppLayout from '../../layout/AppLayout';
import { sendCatchFeedback } from '../../functions/feedback';
import SummaryCard from '../../components/dashboard/SummaryCard';
// import Transaction from '../../components/home/Transaction';
// import Activity from '../../components/home/Activity';

interface StatType {
  tickets: number;
  completedBookings: number;
  artisans: number;
  users: number;
  visitingUsers: number;
  activeUsers: number;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatType | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/stats`);
      setStats(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <AppLayout>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full'>
        <SummaryCard
          loading={loading}
          label='Tickets'
          total={stats?.tickets || 0}
          destination='/tickets'
        />
        <SummaryCard
          loading={loading}
          label='Users'
          total={stats?.users || 0}
          destination='/customers'
        />
        <SummaryCard
          loading={loading}
          label='Artisans'
          total={stats?.artisans || 0}
          destination='/artisans'
        />

        <SummaryCard
          loading={loading}
          label='Completed Appointments'
          total={stats?.completedBookings || 0}
          destination='/appointments'
        />
        <SummaryCard
          loading={loading}
          label='Visiting Users'
          total={stats?.visitingUsers || 0}
          destination='/customers'
        />
        <SummaryCard
          loading={loading}
          label='Active Users'
          total={stats?.activeUsers || 0}
          destination='/customers'
        />
      </div>
      {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-[74px]'>
        <Transaction />
        <Activity />
      </div> */}
    </AppLayout>
  );
};

export default Dashboard;
