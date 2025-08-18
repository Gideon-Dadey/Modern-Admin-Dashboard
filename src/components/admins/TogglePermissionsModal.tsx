import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import { AdminPermissionType } from '../../types/data';
import Button from '../../common/Button';
import Checkbox from '../../common/Checkbox';

interface Props {
  closeModal: () => void;
  open: boolean;
  reload: () => void;
  id: string;
}

function TogglePermissionsModal({ closeModal, id, open, reload }: Props) {
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [permissions, setPermissions] = useState<AdminPermissionType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/admin/' + id);
        setPermissions(response.data?.data?.userPermissions);
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

  const updatePermission = async () => {
    try {
      setToggleLoading(true);

      const response = await appAxios.patch(`/permissions`, {
        userId: id,
        ...permissions,
      });

      closeModal();
      reload();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setToggleLoading(false);
    }
  };

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Change Permissions'>
      {loading ? (
        <LoadingIndicator />
      ) : permissions && Object.keys(permissions).length ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {Object.keys(permissions).map((permission) => (
              <Checkbox
                checked={permissions[permission as keyof typeof permissions]}
                id={permission}
                label={permission}
                className='capitalize'
                onChange={() =>
                  setPermissions({
                    ...permissions,
                    [permission]: !permissions[permission as keyof typeof permissions],
                  })
                }
              />
            ))}
          </div>
          <div className='flex items-center justify-start mt-10 gap-5'>
            <Button
              className='!max-w-[200px]'
              loading={toggleLoading}
              onClick={() => updatePermission()}
            >
              Update
            </Button>
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

export default TogglePermissionsModal;
