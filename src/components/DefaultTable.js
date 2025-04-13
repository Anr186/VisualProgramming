import React, { useState, useEffect, useOptimistic } from 'react';
import DataSet from './DataSet';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CrudTable = ({ 
  endpoint, 
  title, 
  color, 
  initialValues, 
  validationSchema,
  calculateAdditionalFields,
  renderCell
}) => {
  const [data, setData] = useState([]);
  const [optimisticData, setOptimisticData] = useOptimistic(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [nextId, setNextId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
        const data = await response.json();
        const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
        setNextId(maxId + 1);
        setData(data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  const handleRowSelect = (rowId, e) => {
    const isCtrlPress = e.ctrlKey || e.metaKey;
    
    setSelectedRows(prev => {
      const newSelected = new Set(prev);
      
      if (isCtrlPress) {
        if (newSelected.has(rowId)) {
          newSelected.delete(rowId);
        } else {
          newSelected.add(rowId);
        }
      } else {
        if (newSelected.has(rowId) && newSelected.size === 1) {
          newSelected.clear();
        } else {
          newSelected.clear();
          newSelected.add(rowId);
        }
      }
      return newSelected;
    });
  };

  const handleAddItem = async (values, { resetForm }) => {
    const newId = nextId;
    setNextId(newId + 1);
    
    const itemToAdd = {
      id: newId,
      ...values,
      ...(calculateAdditionalFields ? calculateAdditionalFields(optimisticData.length + 1) : {})
    };
    
    setOptimisticData(prev => [...prev, itemToAdd]);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(itemToAdd),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error(`Failed to add ${endpoint.slice(0, -1)}`);
      
      const createdItem = await response.json();
      
      setData(prev => [
        ...prev.filter(item => item.id !== newId),
        createdItem
      ]);
      setNextId(prev => Math.max(prev, createdItem.id + 1));
      resetForm();
    } catch (err) {
      setOptimisticData(prev => prev.filter(item => item.id !== newId));
      setError(err.message);
      setNextId(newId);
    }
  };

  const handleUpdateItem = async (id, updatedFields) => {
    const originalData = optimisticData;
    
    try {
      setOptimisticData(prev =>
        prev.map(item =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      );
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedFields),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error(`Failed to update ${endpoint.slice(0, -1)}`);
      
      const updatedItem = await response.json();
      
      setData(prev =>
        prev.map(item =>
          item.id === id ? updatedItem : item
        )
      );
    } catch (err) {
      setError(err.message);
      setData(originalData);
    }
  };

  const handleDeleteItems = async () => {
    const ids = Array.from(selectedRows);
    const originalData = optimisticData;
    
    try {
      setOptimisticData(prev =>
        prev.filter(item => !ids.includes(item.id))
      );
      
      await Promise.all(
        ids.map(id =>
          fetch(`https://jsonplaceholder.typicode.com/${endpoint}/${id}`, {
            method: 'DELETE',
          })
        )
      );
      
      setData(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectedRows(new Set());
    } catch (err) {
      setError(err.message);
      setData(originalData);
    }
  };

  const defaultRenderCell = (row, header, onCellEdit) => {
    const cellValue = row[header];
    
    if (typeof cellValue === 'object' && cellValue !== null) {
      return JSON.stringify(cellValue);
    }
    
    if (header === 'body' || header === 'title') {
      return (
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const newValue = e.target.textContent;
            if (newValue !== row[header]) {
              onCellEdit(row.id, { [header]: newValue });
            }
          }}
          style={{ outline: 'none', minHeight: '20px' }}
        >
          {cellValue}
        </div>
      );
    }
    return cellValue;
  };

  const renderHeader = (header) => (
    <th 
      key={header} 
      style={{
        padding: '8px',
        textAlign: 'left',
        backgroundColor: color,
        color: 'white',
        borderRight: '1px solid #ddd',
        textTransform: 'capitalize'
      }}
    >
      {header}
    </th>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color, textAlign: 'center' }}>{title}</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddItem}
      >
        {({ isSubmitting }) => (
          <Form style={{ 
            marginBottom: '20px', 
            backgroundColor: `${color}20`, 
            padding: '20px', 
            borderRadius: '10px' 
          }}>
            <h3>Add New {title.slice(0, -1)}</h3>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              {Object.keys(initialValues).map(field => (
                <div key={field}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                  <Field 
                    as={field === 'body' ? 'textarea' : 'input'}
                    name={field} 
                    style={{ 
                      width: '100%', 
                      padding: '8px',
                      ...(field === 'body' ? { minHeight: '80px' } : {})
                    }}
                  />
                  <ErrorMessage name={field} component="div" style={{ color: 'red', fontSize: '0.8rem' }} />
                </div>
              ))}
              <button
                type="submit"
                style={{
                  gridColumn: '1 / -1',
                  padding: '10px',
                  backgroundColor: color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                disabled={isSubmitting}
              >
                Add {title.slice(0, -1)}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleDeleteItems}
          disabled={selectedRows.size === 0}
          style={{
            padding: '10px',
            backgroundColor: selectedRows.size > 0 ? '#ff4d4d' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: selectedRows.size > 0 ? 'pointer' : 'not-allowed',
            marginRight: '10px'
          }}
        >
          Delete Selected ({selectedRows.size})
        </button>
        <span>Total {title.toLowerCase()}: {optimisticData.length}</span>
      </div>

      <DataSet
        data={optimisticData}
        renderHeader={renderHeader}
        renderCell={(row, header) => 
          (renderCell || defaultRenderCell)(row, header, handleUpdateItem)
        }
        onRowSelect={handleRowSelect}
        selectedRows={selectedRows}
      />

      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#d32f2f',
          borderRadius: '5px'
        }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default CrudTable;