import React from 'react';
import DefaultTable from './DefaultTable';
import * as Yup from 'yup';

const PostsApp = () => {
  const initialValues = {
    title: '',
    body: '',
    userId: 1
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    userId: Yup.number().required()
  });

  const calculateAdditionalFields = (index) => ({
    userId: Math.floor((index - 1) / 10) + 1
  });

  return (
    <DefaultTable
      endpoint="posts"
      title="Posts"
      color="#4CAF50"
      initialValues={initialValues}
      validationSchema={validationSchema}
      calculateAdditionalFields={calculateAdditionalFields}
    />
  );
};

export default PostsApp;