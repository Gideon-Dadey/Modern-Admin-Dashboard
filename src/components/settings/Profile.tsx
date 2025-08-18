import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateUser } from '../../store/slices/user';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button';
import VerifyModal from './VerifyModal';

const Profile = () => {
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [profileLoading, setProfileLoading] = React.useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [openVerifyModal, setOpenVerifyModal] = React.useState(false);

  const emailFormik = useFormik({
    initialValues: {
      email: user?.email,
    },
    onSubmit: () => {
      updateEmail();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Enter a valid email')
        .required('Old password is required'),
    }),
    enableReinitialize: true,
  });

  const profileFormik = useFormik({
    initialValues: {
      fullname: user?.fullname,
      phone: user?.phone ? user.phone.replace('+233', '') : '',
    },
    onSubmit: () => {
      updateProfile();
    },
    validationSchema: yup.object({
      fullname: yup.string().required('Old password is required'),
      phone: yup.string().required('New password is required'),
    }),
    enableReinitialize: true,
  });

  const updateEmail = async () => {
    try {
      setEmailLoading(true);
      const response = await appAxios.patch('/auth/update-email', {
        email: emailFormik.values.email,
      });
      const userObject = response.data?.data;

      dispatch(
        updateUser({
          user: { ...user, email: userObject.email },
        })
      );

      // Code is sent automatically
      sendFeedback('Verify your account to continue', 'info');
      setOpenVerifyModal(true);
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setEmailLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setProfileLoading(true);
      const response = await appAxios.patch('/update-self', {
        fullname: profileFormik.values.fullname,
        phone: `+234${profileFormik.values.phone}`,
      });
      sendFeedback(response.data?.message, 'success');
      const userObject = response.data?.data;
      dispatch(
        updateUser({
          user: { ...user, fullname: userObject.fullname, phone: userObject.phone },
        })
      );
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <section className='w-full bg-white border border-[#fb6f92] py-6 px-[28px] rounded-md '>
      <h3 className='font-bold mb-5'>Update Email</h3>
      <form
        onSubmit={emailFormik.handleSubmit}
        className='w-full flex items-end justify-between gap-5'
      >
        <LabelInput
          formik={emailFormik}
          name='email'
          label='Email'
          type='email'
          className='w-full [&>label]:!mb-0'
        />
        <Button type='submit' className='w-20 h-[49px] !max-w-fit' loading={emailLoading}>
          Update
        </Button>
      </form>
      <h3 className='font-bold mt-10 mb-5'>Update Profile Info</h3>
      <form onSubmit={profileFormik.handleSubmit} className='w-full'>
        <LabelInput
          formik={profileFormik}
          name='fullname'
          label='Full Name'
          className='mb-3 [&>div>input]:capitalize [&>label]:!mb-0'
        />
        <LabelInput
          formik={profileFormik}
          name='phone'
          label='Phone'
          type='number'
          className='mb-6 [&>label]:!mb-0'
        />

        <Button type='submit' className='h-10' loading={profileLoading}>
          Update
        </Button>
      </form>
      <VerifyModal open={openVerifyModal} closeModal={() => setOpenVerifyModal(false)} />
    </section>
  );
};

export default Profile;
