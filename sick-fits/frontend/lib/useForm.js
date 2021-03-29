import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object four our inputs
  const [inputs, setInputs] = useState(initial);
  // watching inputs and filling it with the incoming inputs would cause an infinite loop, thus we create an representative value of the the state:
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // this function runs when tings we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //   name: 'wes',
  //   description: 'nice shoes',
  //   price: 1000
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
