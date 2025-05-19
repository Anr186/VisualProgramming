import React from 'react';

const Profile = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#4361ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            marginRight: '25px'
          }}>JD</div>
          <div>
            <h1 style={{ 
              margin: '0',
              fontSize: '28px',
              color: '#1e293b'
            }}>John Doe</h1>
            <p style={{ 
              margin: '5px 0 0',
              color: '#64748b',
              fontSize: '16px'
            }}>Technology Writer</p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '18px',
            color: '#1e293b',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e2e8f0'
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
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '500'
              }}>Full Name</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                color: '#1e293b',
                fontSize: '15px'
              }}>John Doe</div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '500'
              }}>Email</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                color: '#1e293b',
                fontSize: '15px'
              }}>john@example.com</div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '500'
              }}>Specialization</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                color: '#1e293b',
                fontSize: '15px'
              }}>Technology</div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '500'
              }}>Location</label>
              <div style={{
                padding: '12px 15px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                color: '#1e293b',
                fontSize: '15px'
              }}>New York, USA</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '18px',
            color: '#1e293b',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e2e8f0'
          }}>Bio</h3>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            color: '#475569',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            Technology writer with 5+ years of experience in software development and AI. 
            Specializing in machine learning, blockchain, and cloud computing technologies. 
            Passionate about making complex technical concepts accessible to a wider audience.
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '18px',
            color: '#1e293b',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e2e8f0'
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
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e0f2fe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0ea5e9">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </div>
              <span style={{
                color: '#1e293b',
                fontSize: '15px'
              }}>facebook.com/johndoe</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 15px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#ecfdf5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </div>
              <span style={{
                color: '#1e293b',
                fontSize: '15px'
              }}>twitter.com/johndoe</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <button style={{ 
            padding: '12px 24px',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            transition: 'all 0.3s ease'
          }}>
            Cancel
          </button>
          <button style={{ 
            padding: '12px 24px',
            backgroundColor: '#4361ee',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            transition: 'all 0.3s ease'
          }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;