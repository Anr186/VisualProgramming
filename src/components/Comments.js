import React from 'react';
import DefaultTable from './DefaultTable';
import * as Yup from 'yup';

const CommentsApp = () => {
  const initialValues = {
    name: '',
    email: '',
    body: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    body: Yup.string().required('Comment is required')
  });

  const calculateAdditionalFields = (index) => ({
    postId: Math.floor((index - 1) / 5) + 1
  });

  return (
    <DefaultTable
      endpoint="comments"
      title="Comments"
      color="#ed6bcd"
      initialValues={initialValues}
      validationSchema={validationSchema}
      calculateAdditionalFields={calculateAdditionalFields}
    />
  );
};

export default CommentsApp;