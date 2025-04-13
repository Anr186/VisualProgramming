import React from 'react';
import DefaultTable from './DefaultTable';
import * as Yup from 'yup';

const AlbumsApp = () => {
  const initialValues = {
    title: '',
    userId: 1
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    userId: Yup.number().required()
  });

  return (
    <DefaultTable
      endpoint="albums"
      title="Albums"
      color="#2196F3"
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default AlbumsApp;