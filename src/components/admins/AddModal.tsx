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
  reload: () => void;
  open: boolean;
}

function AddModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      phone: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      fullname: yup.string().required('Full name is required'),
      phone: yup.string().required('Phone number is required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/auth/register`, {
        email: formik.values.email,
        fullname: formik.values.fullname,
        phone: `+234${formik.values.phone}`,
      });
      closeModal();
      reload();
      formik.resetForm();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Add Admin'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput formik={formik} name='fullname' label='Full name' className='mb-6' />
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-6'
        />
        <LabelInput formik={formik} name='phone' label='Phone number' type='number' />
        <div className='flex items-center justify-start mt-10 gap-5'>
          <Button className='!max-w-[200px]' loading={loading} type='submit'>
            Add admin
          </Button>
          <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AddModal;
