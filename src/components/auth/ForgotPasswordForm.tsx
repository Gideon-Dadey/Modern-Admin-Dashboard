import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import BackComponent from '../../common/BackComponent';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
    }),
  });
  const submitValues = async () => {
    // try {
    //   setLoading(true);
    //   const response = await appAxios.post('/auth/forgot-password', {
    //     email: formik.values.email,
    //   });
    //   sendFeedback(response.data?.message, 'success');
    //   navigate(`/auth/reset-password/${formik.values.email}`);
    // } catch (error: any) {
    //   sendCatchFeedback(error);
    // } finally {
    //   setLoading(false);
    // }
    navigate(`/auth/reset-password/${formik.values.email}`);
  };

  return (
    <div className="relative w-full">
      {/* Back button */}
      <BackComponent
        text="Back to Login"
        containerClass="absolute top-8 left-0"
        destination="/auth/login"
      />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 dark:text-white">
          Forgot Password? 
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          No worries — enter your email and we’ll send you a verification code to reset it.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6 w-full md:w-3/5 mx-auto">
        <LabelInput
          formik={formik}
          name="email"
          label="Email Address"
          type="email"
          placeholder="yourname@example.com"
          className="mb-6"
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition"
        >
          Send Verification Code
        </Button>
      </form>

      {/* Tip */}
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Make sure to check your <span className="font-medium">spam folder</span> too.
      </p>
    </div>
  );
};

export default ForgotPasswordForm;