import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateUser } from '../../store/slices/user';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button';

const Password = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required('Old password is required'),
      newPassword: yup
        .string()
        .required('New password is required')
        .min(8, 'Passwords should be a minimum of 8 characters'),
      confirmPassword: yup
        .string()
        .required('Enter new password again')
        .oneOf([yup.ref('newPassword'), ''], "New Passwords don't match")
        .min(8, 'Passwords should be a minimum of 8 characters'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch('/auth/update-password', {
        oldPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
      });
      sendFeedback(response.data?.message, 'success');
      const userObject = response.data?.data;
      dispatch(updateUser({ user: userObject }));
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full bg-white border border-[#fb6f92] py-6 px-[28px] rounded-md '>
      <h3 className='font-bold mb-5'>Update Password</h3>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput
          formik={formik}
          name='oldPassword'
          label='Old Password'
          type='password'
          className='mb-3 [&>label]:!mb-0'
        />
        <LabelInput
          formik={formik}
          name='newPassword'
          label='New Password'
          type='password'
          className='mb-3 [&>label]:!mb-0'
        />
        <LabelInput
          formik={formik}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          className='mb-6 [&>label]:!mb-0'
        />

        <Button type='submit' className='h-10' loading={loading}>
          Update Password
        </Button>
      </form>
    </section>
  );
};

export default Password;
