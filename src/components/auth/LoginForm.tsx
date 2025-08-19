import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useAppDispatch } from '../../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../../store/slices/user';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });

  const submitValues = async () => {
    // try {
    //   setLoading(true);
    //   const response = await appAxios.post('/auth/login', {
    //     email: formik.values.email,
    //     password: formik.values.password,
    //   });
    //   const userObject = response.data?.data;
    //   dispatch(updateUser({ user: userObject }));
    //   if (!userObject.isVerified) {
    //     // Send verification code
    //     sendFeedback('Verify your account to continue', 'info');
    //     await appAxios.get('/auth/send-verification');
    //     return navigate('/auth/verify-account');
    //   }
    //   sendFeedback(response.data?.message, 'success');
    //   return navigate('/dashboard');
    // } catch (error: any) {
    //   sendCatchFeedback(error);
    // } finally {
    //   setLoading(false);
    // }
    return navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl w-full max-w-md p-6 sm:p-8 lg:p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white font-poppins">
            Hello Again
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Welcome back! Please enter your details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <LabelInput
            formik={formik}
            name="email"
            label="Email Address"
            type="email"
          />
          <LabelInput
            formik={formik}
            name="password"
            label="Password"
            type="password"
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-base sm:text-lg shadow-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          {/* Forgot password + link */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4 text-sm">
            <Link
              to="/auth/forgot-password"
              className="text-indigo-600 hover:underline font-medium text-center sm:text-left"
            >
              Forgot password?
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">
              Don’t have an account?{" "}
              <Link to="/auth/register" className="text-indigo-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
