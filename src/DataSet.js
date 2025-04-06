import React, { useState, useOptimistic, useEffect } from 'react';
import backImage from './files/back.png';

const DataSet = ({ data, headers, renderHeader, renderCell, onRowSelect, selectedRows }) => {
  const resHeaders = headers || (data.length > 0 ? Object.keys(data[0]) : []);

  return (
    <div>
      <table style={{ 
        width: '100%', 
        borderSpacing: 1,
        fontFamily: 'Arial, sans-serif', 
        border: '2px solid #ccc', 
        userSelect: 'none', 
        backgroundColor: '#f7d7ef',
        borderRadius: '30px',
        overflow: 'hidden' 
      }}>
        <thead>
          <tr>
            <th style={{ width: '30px', borderRight: '1px solid #ddd', backgroundColor: '#ed6bcd'}}></th>
            {resHeaders.map(header => renderHeader(header))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr 
              key={row.id} 
              style={{
                borderBottom: '1px solid #ddd', 
                backgroundColor: selectedRows.has(row.id) ? '#96aaf2' : '#f7d7ef', 
                cursor: 'pointer'
              }}
              onClick={(e) => onRowSelect(row.id, e)}
            >
              <td
                style={{
                  borderRight: '1px solid #ddd', 
                  width: '30px', 
                  backgroundColor: selectedRows.has(row.id) ? '#96aaf2' : '#fcbdeb'
                }}
              >
                {selectedRows.has(row.id) ? 'X' : ''}
              </td>
              {resHeaders.map((header) => (
                <td 
                  key={`${row.id}-${header}`}
                  style={{
                    borderRight: '1px solid #ddd',
                    backgroundColor: selectedRows.has(row.id) ? '#96aaf2' : '#fcbdeb'
                  }}
                >
                  {renderCell(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ 
        backgroundImage: `url(${backImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '470px',
        width: '98%',
        padding: '20px',
        borderRadius: '30px',
        marginTop: '20px'
      }}></div>
    </div>
  );
};

const CommentsApp = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [optimisticComments, setOptimisticComments] = useOptimistic(comments);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=20');
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Обработчик выбора строк
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

  // Добавление комментария
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    const tempId = Math.max(0, ...optimisticComments.map(c => c.id)) + 1;
    const commentToAdd = {
      id: tempId,
      ...newComment,
      postId: 1
    };

    try {
      // Оптимистичное обновление
      setOptimisticComments([...optimisticComments, commentToAdd]);
      
      // Реальный запрос
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify(commentToAdd),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Failed to add comment');
      
      const createdComment = await response.json();
      
      // Обновление с реальным ID
      setComments(prev => [
        ...prev.filter(c => c.id !== tempId),
        createdComment
      ]);
      
      setNewComment({ name: '', email: '', body: '' });
    } catch (err) {
      setError(err.message);
      setComments(comments);
    }
  };

  // Обновление комментария
  const handleUpdateComment = async (id, updatedFields) => {
    const originalComments = optimisticComments;
    
    try {
      // Оптимистичное обновление
      setOptimisticComments(prev =>
        prev.map(comment =>
          comment.id === id ? { ...comment, ...updatedFields } : comment
        )
      );
      
      // Реальный запрос
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedFields),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Failed to update comment');
      
      const updatedComment = await response.json();
      
      setComments(prev =>
        prev.map(comment =>
          comment.id === id ? updatedComment : comment
        )
      );
    } catch (err) {
      setError(err.message);
      setComments(originalComments);
    }
  };

  // Удаление комментариев
  const handleDeleteComments = async (ids) => {
    const originalComments = optimisticComments;
    
    try {
      // Оптимистичное обновление
      setOptimisticComments(prev =>
        prev.filter(comment => !ids.includes(comment.id))
      );
      
      // Реальные запросы
      await Promise.all(
        ids.map(id =>
          fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'DELETE',
          })
        )
      );
      
      setComments(prev => prev.filter(comment => !ids.includes(comment.id)));
      setSelectedRows(new Set());
    } catch (err) {
      setError(err.message);
      setComments(originalComments);
    }
  };

  // Рендер ячейки с возможностью редактирования
  const renderCell = (value) => (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newValue = e.target.textContent;
        if (newValue !== String(value)) {
          const rowId = parseInt(e.target.closest('tr').getAttribute('key'));
          const field = e.target.closest('td').getAttribute('data-field');
          handleUpdateComment(rowId, { [field]: newValue });
        }
      }}
      style={{ outline: 'none', minHeight: '20px' }}
    >
      {value}
    </div>
  );

  // Рендер заголовка
  const renderHeader = (header) => (
    <th 
      key={header} 
      style={{
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#ed6bcd',
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
      <h1 style={{ color: '#ed6bcd', textAlign: 'center' }}>Comments Management</h1>
      
      <form onSubmit={handleAddComment} style={{ 
        marginBottom: '20px', 
        backgroundColor: '#f7d7ef', 
        padding: '20px', 
        borderRadius: '10px' 
      }}>
        <h3>Add New Comment</h3>
        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newComment.name}
              onChange={(e) => setNewComment({...newComment, name: e.target.value})}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newComment.email}
              onChange={(e) => setNewComment({...newComment, email: e.target.value})}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Comment:</label>
            <textarea
              name="body"
              value={newComment.body}
              onChange={(e) => setNewComment({...newComment, body: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              gridColumn: '1 / -1',
              padding: '10px',
              backgroundColor: '#ed6bcd',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add Comment
          </button>
        </div>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => {
            if (selectedRows.size > 0) {
              if (window.confirm(`Delete ${selectedRows.size} selected comment(s)?`)) {
                handleDeleteComments(Array.from(selectedRows));
              }
            } else {
              alert('Please select comments to delete');
            }
          }}
          style={{
            padding: '10px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Delete Selected
        </button>
        <span>{optimisticComments.length} comments</span>
      </div>

      <DataSet
        data={optimisticComments}
        renderHeader={renderHeader}
        renderCell={(value, row, header) => (
          <td 
            data-field={header}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleRowSelect(row.id, e);
              }
            }}
          >
            {renderCell(value)}
          </td>
        )}
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

export default CommentsApp;