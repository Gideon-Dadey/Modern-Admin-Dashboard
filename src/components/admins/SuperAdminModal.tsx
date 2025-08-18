import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { AdminType } from '../../types/data';
import Button from '../../common/Button';

interface Props {
  closeModal: () => void;
  open: boolean;
  reload: () => void;
  id: string;
}

function SuperAdminModal({ closeModal, id, open, reload }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<AdminType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/admin/' + id);
        setDetails(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      getItem();
    }
  }, [open, id]);

  const makeSuperAdmin = async (status: boolean) => {
    try {
      setLoading(true);

      const response = await appAxios.patch(`/super/create-superadmin`, {
        email: details?.email,
      });

      closeModal();
      reload();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Make Super Admin'>
      <p>Are you sure you want to make this user a super admin?</p>
      <div className='flex items-center justify-start mt-10 gap-5'>
        <Button
          className='!max-w-[200px]'
          loading={loading}
          onClick={() => makeSuperAdmin(true)}
        >
          Yes, continue
        </Button>
        <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
          No, Cancel
        </Button>
      </div>
    </CustomModal>
  );
}

export default SuperAdminModal;
