import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import { AdminType, AdminPermissionType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  id: string;
}

function ViewModal({ closeModal, id, open }: Props) {
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

  const getPermissionsList = (permissions: AdminPermissionType) => {
    return (
      Object.keys(permissions)
        .map((key) => {
          if (permissions[key as keyof typeof permissions]) {
            return key;
          }
          return null;
        })
        .filter((item) => item)
        .join(', ') || 'None'
    );
  };

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Admin Details'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>FullName:</b> {details.fullname}
          </p>
          <p className='mb-3 pb-2 border-b-2'>
            <b>Email:</b> {details.email}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Phone:</b> {details.phone}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Permissions:</b> {getPermissionsList(details.userPermissions)}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;
