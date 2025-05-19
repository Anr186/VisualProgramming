// SubmitArticle.js
import React, { useState } from 'react';

const SubmitArticle = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      boxSizing: 'border-box',
      fontSize: '1.1em',
      justifyContent: 'center',
      alignItems: 'flex-start',
      display:'flex',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        width: '80%',
        minHeight: '90vh',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          margin: '0 0 20px',
          fontSize: '38px',
          color: '#333333'
        }}>Submit Article for Review</h1>
        <p style={{
          margin: '0 0 30px',
          color: '#666666',
          fontSize: '20px'
        }}>Please fill in the details below to submit your article for review.</p>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#555555',
            fontSize: '30px'
          }}>Article Title</label>
          <input
            type="text"
            placeholder="Enter article title"
            style={{
              width: '100%',
              padding: '14px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '20px',
              transition: 'all 0.3s ease',
              backgroundColor: '#ffffff',
              color: '#333333'
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#555555',
            fontSize: '30px'
          }}>Category</label>
          <select style={{
            width: '100%',
            padding: '14px 15px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '20px',
            backgroundColor: '#ffffff',
            color: '#333333',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '20px'
          }}>
            <option>Select a category</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Environment</option>
          </select>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#555555',
            fontSize: '30px'
          }}>Article Content</label>
          <textarea
            placeholder="Write your article content here..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '15px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '20px',
              resize: 'vertical',
              backgroundColor: '#ffffff',
              color: '#333333'
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#555555',
            fontSize: '30px'
          }}>Featured Image</label>
          <div 
            style={{ 
              border: `2px dashed ${isDragging ? '#1976d2' : '#bdbdbd'}`,
              padding: '30px',
              textAlign: 'center',
              borderRadius: '8px',
              backgroundColor: isDragging ? '#e3f2fd' : '#f9f9f9',
              transition: 'all 0.3s ease'
            }}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 15px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1976d2">
                <path d="M19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h7a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1zM5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17 4.3 4.3zm13-1a.89.89 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.22z"/>
                <path d="M8 10a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 8 10z"/>
              </svg>
            </div>
            <p style={{
              margin: '0 0 10px',
              color: '#666666',
              fontSize: '20px'
            }}>Drag and drop your image here or</p>
            <button style={{ 
              background: 'none',
              border: '1px solid #1976d2',
              color: '#1976d2',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '19px',
              transition: 'all 0.3s ease'
            }}>
              Browse Files
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#555555',
            fontSize: '30px'
          }}>Tags</label>
          <input
            type="text"
            placeholder="Enter tags separated by commas"
            style={{
              width: '100%',
              padding: '14px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '20px',
              backgroundColor: '#ffffff',
              color: '#333333'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}>
            <input 
              type="checkbox" 
              style={{
                width: '20px',
                height: '20px',
                accentColor: '#1976d2',
                cursor: 'pointer'
              }} 
            />
            <span style={{
              color: '#666666',
              fontSize: '12px'
            }}>I confirm that this article is my original work and I have read and agree to the submission guidelines</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ 
            padding: '14px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            fontSize: '20px',
            transition: 'all 0.3s ease',
            flex: 1,
            ':hover': {
              backgroundColor: '#1565c0'
            }
          }}>
            Submit for Review
          </button>
          <button style={{ 
            padding: '14px 24px',
            backgroundColor: '#ffffff',
            color: '#666666',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '20px',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
            transition: 'all 0.3s ease',
            flex: 1,
            ':hover': {
              backgroundColor: '#f5f5f5',
              
            }
          }}>
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitArticle;