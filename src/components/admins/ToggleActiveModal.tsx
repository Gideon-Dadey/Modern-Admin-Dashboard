import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import { AdminType } from '../../types/data';
import Button from '../../common/Button';

interface Props {
  closeModal: () => void;
  open: boolean;
  reload: () => void;
  id: string;
}

function ToggleActiveModal({ closeModal, id, open, reload }: Props) {
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
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

  const toggleStatus = async (status: boolean) => {
    try {
      setToggleLoading(true);

      const response = await appAxios.patch(`/toggle-active-status/admin`, {
        isActive: status,
        userId: id,
      });

      closeModal();
      reload();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
    } finally {
      setToggleLoading(false);
    }
  };

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Change Active Status'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Current Status:</b> {details.isActive ? 'ACTIVE' : 'INACTIVE'}
          </p>
          <div className='flex items-center justify-start mt-10 gap-5'>
            {details.isActive ? (
              <Button
                className='!max-w-[200px] !bg-error'
                loading={toggleLoading}
                onClick={() => toggleStatus(false)}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                className='!max-w-[200px]'
                loading={toggleLoading}
                onClick={() => toggleStatus(true)}
              >
                Activate
              </Button>
            )}
            <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ToggleActiveModal;
