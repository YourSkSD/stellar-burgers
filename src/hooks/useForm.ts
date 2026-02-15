import { useState, ChangeEvent } from 'react';

type FormValues = Record<string, string>;

export function useForm(initialValues: FormValues = {}) {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
}
