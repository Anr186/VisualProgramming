import React from 'react';
import DefaultTable from './DefaultTable';
import * as Yup from 'yup';

const TodosApp = () => {
  const initialValues = {
    title: '',
    completed: false,
    userId: 1
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    completed: Yup.boolean().required(),
    userId: Yup.number().required()
  });

  return (
    <DefaultTable
      endpoint="todos"
      title="Todos"
      color="#FF9800"
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default TodosApp;