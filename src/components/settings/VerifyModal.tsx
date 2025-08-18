import React, { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';

interface Props {
  closeModal: () => void;
  open: boolean;
}

function VerifyModal({ closeModal, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      verificationCode: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      verificationCode: yup.string().required('Code is required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/auth/verify`, {
        code: formik.values.verificationCode,
      });
      closeModal();
      formik.resetForm();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      modalState={open}
      closeModal={closeModal}
      title='Verify Account'
      shouldCloseOnOverlayClick={false}
    >
      <p className='mb-6'>Enter the verification code sent to your email</p>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput
          formik={formik}
          name='verificationCode'
          label='Code'
          className='mb-10'
          required
        />

        <div className='flex items-center justify-start mt-10 gap-5'>
          <Button className='!max-w-[200px]' loading={loading} type='submit'>
            Verify Account
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default VerifyModal;
