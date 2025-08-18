import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackComponent from '../../common/BackComponent';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const param = useParams();

  const formik = useFormik({
    initialValues: {
      email: param?.email,
      password: '',
      verificationCode: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      verificationCode: yup.string().required('Verification code is required'),
    }),
    enableReinitialize: true,
  });
  const submitValues = async () => {
    // try {
    //   setLoading(true);
    //   const response = await appAxios.patch('/auth/reset-password', {
    //     email: formik.values.email,
    //     password: formik.values.password,
    //     code: formik.values.verificationCode,
    //   });
    //   sendFeedback(response.data?.message, 'success');
    //   navigate('/auth/success');
    // } catch (error: any) {
    //   sendCatchFeedback(error);
    // } finally {
    //   setLoading(false);
    // }

    navigate('/auth/success');
  };

  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/auth/forgot-password', {
        email: param?.email,
      });
      sendFeedback(response.data?.message, 'success');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="relative w-full">
      {/* Back link */}
      <BackComponent
        text="Back to Forgot Password"
        containerClass="absolute -top-10 left-0 text-sm text-gray-600 dark:text-gray-400 hover:underline"
        destination="/auth/forgot-password"
      />

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 dark:text-white">
          Reset Your Password 
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Don’t get caught up again — secure your account with a new password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email (disabled) */}
        <LabelInput
          formik={formik}
          name="email"
          label="Email Address"
          type="email"
          disabled
        />

        {/* New Password */}
        <LabelInput
          formik={formik}
          name="password"
          label="New Password"
          type="password"
        />

        {/* Verification Code */}
        <LabelInput
          formik={formik}
          name="verificationCode"
          label="Verification Code"
        />

        {/* Resend OTP */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Didn’t get an OTP?
          </span>
          <button
            type="button"
            onClick={sendVerificationCode}
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            Resend
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          loading={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;