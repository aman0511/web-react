import React from 'react';

import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { Button } from 'carbon-components-react';

import InputAtom from 'atoms/Input';
import CheckboxAtom from 'atoms/Checkbox';

const UserFormComponent = (props) => {
  const { error, handleSubmit, createOrUpdate, submitting } = props;

  const submit = data => {
    return createOrUpdate(data)
      .catch((err) => {
        const errObj = {
          _error: err.non_field_errors,
          ...err,
        };
        throw new SubmissionError(errObj);
      });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <div className="dark-red db mb2 f6">{error}</div>
      <div>
        <Field
          component={InputAtom}
          id="first_name"
          label="Name"
          name="first_name"
          placeholder="Name"
          type="text"
        />
        <Field
          component={InputAtom}
          id="username"
          label="Username"
          name="username"
          placeholder="Username"
          type="text"
        />
        <Field
          component={CheckboxAtom}
          id="is_superuser"
          label="Superuser"
          name="is_superuser"
        />
        <Field
          component={CheckboxAtom}
          id="is_staff"
          label="Staff"
          name="is_staff"
        />
        <Field
          component={CheckboxAtom}
          id="is_active"
          label="Active"
          name="is_active"
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.first_name) errors.first_name = 'Enter Name';
  if (!values.username) errors.username = 'Enter Username';
  return errors;
};

UserFormComponent.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
  handleSubmit: PropTypes.func.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'UserForm',
  validate,
})(UserFormComponent);
