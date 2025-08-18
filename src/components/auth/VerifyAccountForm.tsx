import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const VerifyAccountForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      code: yup.string().required('Code is required'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/auth/verify', {
        code: formik.values.code,
      });
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      navigate('/dashboard');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="relative w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 dark:text-white">
          Verify Your Account 
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Enter the 6-digit code we sent to your email to activate your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6 w-full md:w-3/5 mx-auto">
        <LabelInput
          formik={formik}
          name="code"
          label="Verification Code"
          placeholder="e.g. 123456"
          className="tracking-widest text-center font-mono"
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition"
        >
          Verify Account
        </Button>
      </form>

      {/* Resend option */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Didn’t receive the code?{" "}
        <button
          type="button"
          className="text-indigo-600 font-semibold hover:underline"
          onClick={() => console.log("Resend code")}
        >
          Resend
        </button>
      </div>
    </div>
  );
};

export default VerifyAccountForm;