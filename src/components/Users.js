import React from 'react';
import DefaultTable from './DefaultTable';
import * as Yup from 'yup';

const UsersApp = () => {
  const initialValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string(),
    website: Yup.string().url('Invalid URL')
  });

  const renderCell = (row, header) => {
    const cellValue = row[header];
    
    if (typeof cellValue === 'object' && cellValue !== null) {
      if (header === 'address') {
        return `${cellValue.street}, ${cellValue.suite}, ${cellValue.city}, ${cellValue.zipcode}`;
      }
      if (header === 'company') {
        return cellValue.name;
      }
      return JSON.stringify(cellValue);
    }
    
    return cellValue;
  };

  return (
    <DefaultTable
      endpoint="users"
      title="Users"
      color="#9C27B0"
      initialValues={initialValues}
      validationSchema={validationSchema}
      renderCell={renderCell}
    />
  );
};

export default UsersApp;