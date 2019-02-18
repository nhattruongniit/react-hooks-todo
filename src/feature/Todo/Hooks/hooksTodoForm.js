import { useState } from 'react';

export default initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: event => {
      const { value } = event.target;
      setValue(value);
    },
    reset: () => setValue(''),
  }
};