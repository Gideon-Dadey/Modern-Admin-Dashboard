import Select from 'react-select';

function Dropdown({
  containerStyle = {},
  values,
  isMulti = false,
  formik,
  label,
  name,
  placeholder = 'Enter Value',
  className = '',
  ...props
}) {
  return (
    <div className={'w-full flex flex-col gap-[5px] ' + className}>
      <label
        htmlFor={name}
        className={`${formik.touched[name] && formik.errors[name] ? 'errorText' : ''}`}
      >
        {label}
      </label>

      <Select
        options={values.map((value) => ({
          label: value.label,
          value: value.value,
        }))}
        onChange={(e) => {
          formik.setFieldValue(name, e ? e.value : undefined);
        }}
        onBlur={() => {
          formik.setFieldTouched(name, true);
        }}
        id={name}
        styles={{
          container: (provided, state) => ({
            ...provided,
            width: '100%',
            color: '#000',
            ...containerStyle,
          }),
          control: (provided, state) => ({
            ...provided,
            paddingBlock: 10,
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#999',
          }),
        }}
        isClearable
        placeholder={placeholder}
        escapeClearsValue
        backspaceRemovesValue
        noOptionsMessage={() => 'No option found at the moment'}
        isMulti={isMulti}
        {...props}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className='error'>{formik.errors[name]}</div>
      )}
    </div>
  );
}

export default Dropdown;
