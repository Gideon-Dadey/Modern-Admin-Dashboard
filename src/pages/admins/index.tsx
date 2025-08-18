import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import AddModal from '../../components/admins/AddModal';
import ViewModal from '../../components/admins/ViewModal';
import ToggleActiveModal from '../../components/admins/ToggleActiveModal';
import TogglePermissionsModal from '../../components/admins/TogglePermissionsModal';
import SuperAdminModal from '../../components/admins/SuperAdminModal';

function Admins() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [toggleActiveModal, setToggleActiveModal] = useState(false);
  const [togglePermissionsModal, setTogglePermissionsModal] = useState(false);
  const [superAdminModal, setSuperAdminModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/admin`);
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

  const tableHeaders = [
    'fullname',
    'email',
    'phone',
    'role',
    'isActive',
    'isVerified',
    '_id',
  ];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Admins'
        pageActions={
          <Button
            style={{ width: 'fit-content', height: 48 }}
            onClick={() => setAddModal(true)}
          >
            Add new admin
          </Button>
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Admin',
              onClick: (id) => {
                setSelected(id);
                setViewModal(true);
              },
            },
            {
              label: 'Change Permissions',
              onClick: (id) => {
                setSelected(id);
                setTogglePermissionsModal(true);
              },
            },
            {
              label: 'Change Active Status',
              onClick: (id) => {
                setSelected(id);
                setToggleActiveModal(true);
              },
            },
            {
              label: 'Make Super Admin',
              onClick: (id) => {
                setSelected(id);
                setSuperAdminModal(true);
              },
            },
          ],
        }}
      />
      <AddModal open={addModal} closeModal={() => setAddModal(false)} reload={getData} />
      <ViewModal open={viewModal} closeModal={() => setViewModal(false)} id={selected} />
      <ToggleActiveModal
        open={toggleActiveModal}
        closeModal={() => setToggleActiveModal(false)}
        id={selected}
        reload={getData}
      />
      <TogglePermissionsModal
        open={togglePermissionsModal}
        closeModal={() => setTogglePermissionsModal(false)}
        id={selected}
        reload={getData}
      />
      <SuperAdminModal
        open={superAdminModal}
        closeModal={() => setSuperAdminModal(false)}
        id={selected}
        reload={getData}
      />
    </AppLayout>
  );
}

export default Admins;
