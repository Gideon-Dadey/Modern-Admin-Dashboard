import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EmptyImage from './EmptyImage';
import { useFormik } from 'formik';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import Button from '../../common/Button';
import { updateUser } from '../../store/slices/user';

const ProfileImage = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      profileImage: '',
    },
    onSubmit: () => {
      submitValues();
    },
  });

  const submitValues = async () => {
    try {
      if (!formik.values.profileImage) {
        return sendFeedback('Select and image', 'error');
      }
      setLoading(true);

      const formData = new FormData();
      formData.append('profileImage', formik.values.profileImage);

      const response = await appAxios.patch(`/profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      sendFeedback(response.data?.message, 'success');
      const userObject = response.data?.data;
      dispatch(updateUser({ user: { ...user, photoUrl: userObject.photoUrl } }));

      formik.resetForm();
      const fileInput = document.getElementById('profileImage') as HTMLInputElement;
      fileInput.value = '';
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full bg-white border border-[#fb6f92] py-6 px-[28px] rounded-md'>
      <h3 className='font-bold mb-5'>Profile Image</h3>
      <div className='flex flex-col gap-5 items-center'>
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt='Avatar'
            className='w-40 h-40 rounded-full object-cover'
          />
        ) : (
          <EmptyImage />
        )}
        <form
          className='flex items-center gap-5 w-full flex-wrap justify-between border border-[#fb6f92] rounded-sm p-2'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex flex-col gap-3'>
            <label htmlFor='profileImage'>Upload Image</label>
            <input
              type='file'
              name='profileImage'
              id='profileImage'
              accept='image/*'
              onChange={(e: any) => {
                const file = e.target.files[0];
                formik.setFieldValue('profileImage', file);
              }}
            />
          </div>
          <Button className='!w-[100px] !h-10' loading={loading} type='submit'>
            Upload
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProfileImage;
