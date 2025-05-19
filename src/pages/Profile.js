// Profile.js
import React from 'react';
import userImage from '../files/king_cat.png';

const Profile = () => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5', // Светлый фон страницы
      boxSizing: 'border-box',
      fontSize: '1.1em',
      justifyContent: 'center',
      alignItems: 'flex-start',
      display:'flex',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff', // Белый контейнер
        borderRadius: '12px',
        width: '80%',
        minHeight: '90vh',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' // Мягкая тень
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
        }}>
          <img 
            src={userImage} 
            alt="User" 
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              marginRight: '25px',
              objectFit: 'cover',
              border: '3px solid #e0e0e0' // Серая рамка вокруг аватарки
            }}
          />
          <div>
            <h1 style={{ 
              margin: '0',
              fontSize: '38px',
              color: '#333333' // Темно-серый текст
            }}>John Doe</h1>
            <p style={{ 
              margin: '5px 0 0',
              color: '#666666', // Серый текст
              fontSize: '22px'
            }}>Technology Writer</p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '30px',
            color: '#333333',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e0e0e0' // Серая разделительная линия
          }}>Personal Information</h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#666666',
                fontSize: '22px',
                fontWeight: '500'
              }}>Full Name</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f9f9f9', // Очень светлый серый фон
                borderRadius: '8px',
                color: '#333333',
                fontSize: '24px',
                border: '1px solid #e0e0e0'
              }}>John Doe</div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#666666',
               fontSize: '22px',
                fontWeight: '500'
              }}>Email</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                color: '#333333',
                fontSize: '24px',
                border: '1px solid #e0e0e0'
              }}>john@example.com</div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#666666',
               fontSize: '22px',
                fontWeight: '500'
              }}>Specialization</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                color: '#333333',
                fontSize: '24px',
                border: '1px solid #e0e0e0'
              }}>Technology</div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#666666',
               fontSize: '22px',
                fontWeight: '500'
              }}>Location</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                color: '#333333',
                marginBottom: '50px',
                fontSize: '24px',
                border: '1px solid #e0e0e0'
              }}>New York, USA</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '30px',
            color: '#333333',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e0e0e0'
          }}>Bio</h3>
          <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            color: '#555555',
            fontSize: '24px',
            lineHeight: '1.6',
            height: '300px',
            overflowY: 'auto',
            resize: 'none',
            border: '1px solid #e0e0e0',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            scrollbarWidth: 'thin',
            scrollbarColor: '#aaaaaa #f0f0f0',
            marginBottom: '100px',
          }}>
            Technology writer with 5+ years of experience in software development and AI. 
            Specializing in machine learning, blockchain, and cloud computing technologies. 
            Passionate about making complex technical concepts accessible to a wider audience.
          </div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h3 style={{
           fontSize: '30px',
            color: '#333333',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e0e0e0'
          }}>Social Links</h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e3f2fd', // Светло-голубой
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1976d2">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </div>
              <span style={{
                color: '#333333',
                fontSize: '22px'
              }}>facebook.com/johndoe</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e8f5e9', // Светло-зеленый
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#388e3c">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </div>
              <span style={{
                color: '#333333',
                fontSize: '22px'
              }}>twitter.com/johndoe</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <button style={{ 
            padding: '12px 24px',
            backgroundColor: '#f5f5f5',
            color: '#666666',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '20px',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: '#eeeeee'
            }
          }}>
            Cancel
          </button>
          <button style={{ 
            padding: '12px 24px',
            backgroundColor: '#1976d2', // Синий цвет
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '20px',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: '#1565c0'
            }
          }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;