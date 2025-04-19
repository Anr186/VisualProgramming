import React, { useState, useEffect, useOptimistic } from 'react';
import DataSet from './DataSet';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

const CommentsApp = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [optimisticComments, setOptimisticComments] = useOptimistic(comments);
  const [nextId, setNextId] = useState(null); 
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        const maxId = data.reduce((max, comment) => Math.max(max, comment.id), 0);
        setNextId(maxId + 1);
        setComments(data.slice(0,10)); // Ограничиваем для демонстрации
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    const newId = nextId;
    setNextId(newId + 1);
    const calculatePostId = (index) => {
      return Math.floor((index - 1) / 5) + 1;
    };
    const commentToAdd = {
      id: newId,
      ...newComment,
      postId: calculatePostId(optimisticComments.length + 1) 
    };
    setNextId(prev=>prev+1);
    setOptimisticComments(prev => [...prev, newComment]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(commentToAdd),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Failed to add comment');
      
      const createdComment = await response.json();
      
      setComments(prev => [
        ...prev.filter(c => c.id !== newId),
        createdComment
      ]);
      setNextId(prev=>Math.max(prev, createdComment.id + 1));
      
      setNewComment({ name: '', email: '', body: '' });
    } catch (err) {
      setOptimisticComments(prev => prev.filter(c => c.id !== newId));
      setError(err.message);
      setNextId(newId);
      setComments(comments);
    }
  };

  const handleUpdateComment = async (id, updatedFields) => {
    const originalComments = optimisticComments;
    
    try {
      setOptimisticComments(prev =>
        prev.map(comment =>
          comment.id === id ? { ...comment, ...updatedFields } : comment
        )
      );
      
      const response = await fetch(`${API_URL}/${id}`, {
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

  const handleDeleteComments = async () => {
    const ids = Array.from(selectedRows);
    const originalComments = optimisticComments;
    
    try {
      setOptimisticComments(prev =>
        prev.filter(comment => !ids.includes(comment.id))
      );
      
      // Реальные запросы
      await Promise.all(
        ids.map(id =>
          fetch(`${API_URL}/${id}`, {
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

  const renderCell = (row, header, onCellEdit) => {
    if (header === 'body') {
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
          {row[header]}
        </div>
      );
    }
    return row[header];
  };

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
          onClick={handleDeleteComments}
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
        <span>Total comments: {optimisticComments.length}</span>
      </div>

      <DataSet
        data={optimisticComments}
        renderHeader={renderHeader}
        renderCell={(row, header) => renderCell(row, header, handleUpdateComment)}
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
