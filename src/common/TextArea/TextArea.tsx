import { HTMLProps } from 'react';

interface Props {
  label?: string;
  formik?: any;
  name: string;
  className?: string;
  placeholder?: string;
  hint?: string;
  useFormik?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  value?: string | number;
  showError?: boolean;
  error?: string;
  required?: boolean;
  [x: string]: any;
}

function TextArea({
  label = '',
  formik,
  name,
  className = '',
  placeholder,
  hint,
  useFormik = true,
  onChange,
  value,
  showError = false,
  error,
  required,
  ...rest
}: Props & HTMLProps<HTMLTextAreaElement>) {
  return (
    <div className={'inputContainer ' + className}>
      {useFormik ? (
        <>
          {label && (
            <label
              htmlFor={name}
              className={` ${
                formik.touched[name] && formik.errors[name] ? 'errorText' : ''
              }`}
            >
              {label}
            </label>
          )}
          {hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
          <div className='relative'>
            <textarea
              name={name}
              id={name}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched[name] && formik.errors[name] ? 'inputError' : ''}
              {...rest}
            ></textarea>
          </div>

          {formik.touched[name] && formik.errors[name] && (
            <div className='error'>{formik.errors[name]}</div>
          )}
        </>
      ) : (
        <div className={'inputContainer ' + className}>
          <label htmlFor={name} className={` ${showError ? 'errorText' : ''}`}>
            {label}
          </label>
          {hint && <div className='font-light text-xs italic text-gray-400'>{hint}</div>}
          <div className='relative'>
            <textarea
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              {...rest}
            ></textarea>
          </div>

          {showError && <div className='error'>{error}</div>}
        </div>
      )}
    </div>
  );
}

export default TextArea;
