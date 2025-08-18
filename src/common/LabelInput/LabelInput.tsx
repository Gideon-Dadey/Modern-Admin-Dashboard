import { useState } from 'react';
import { HidePasswordIcon, ShowPasswordIcon } from './PasswordIcons';

interface Props {
  formik?: any;
  name: string;
  className?: string;
  hint?: string;
  useFormik?: boolean;
  showError?: boolean;
  error?: string;
}

function LabelInput({
  formik,
  name,
  className = '',
  hint,
  useFormik = true,
  showError = false,
  error,
  ...rest
}: Props & React.HTMLProps<HTMLInputElement>) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordReveal = () => {
    const element: any = document.getElementById(name);
    if (element) {
      if (element.type === 'password') {
        element.type = 'text';
        setPasswordShown(true);
      } else {
        element.type = 'password';
        setPasswordShown(false);
      }
    }
  };

  return (
    <div className={'inputContainer ' + className}>
      {useFormik ? (
        <>
          {rest.label && (
            <label
              htmlFor={name}
              className={`${
                formik.touched[name] && formik.errors[name] ? 'errorText' : ''
              }`}
            >
              {rest.label}
            </label>
          )}
          {hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
          <div className='relative'>
            <input
              id={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched[name] && formik.errors[name] ? 'inputError' : ''}
              {...rest}
            />
            {rest.type === 'password' && (
              <div
                className='absolute bottom-3 right-3 cursor-pointer'
                onClick={togglePasswordReveal}
              >
                {passwordShown ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            )}
          </div>

          {formik.touched[name] && formik.errors[name] && (
            <div className='error'>{formik.errors[name]}</div>
          )}
        </>
      ) : (
        <>
          {rest.label && (
            <label htmlFor={name} className={`${showError ? 'errorText' : ''}`}>
              {rest.label}
            </label>
          )}
          {hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
          <div className='relative'>
            <input id={name} {...rest} />

            {rest.type === 'password' && (
              <div
                className='absolute bottom-3 right-3 cursor-pointer'
                onClick={togglePasswordReveal}
              >
                {passwordShown ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            )}
          </div>

          {showError && <div className='error'>{error}</div>}
        </>
      )}
    </div>
  );
}

export default LabelInput;
