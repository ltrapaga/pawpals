import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  // Create a state variable called `values` using `useState` hook and set its initial value to the `initialState`
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    // Update the `values` state using the spread operator to copy the existing values and update the value of the input that triggered the event
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};
