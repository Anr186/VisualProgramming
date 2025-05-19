import React from 'react';

const ReviewArticles = () => {
  const cardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  };

  const hoverCardStyle = {
    ...cardStyle,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e2e8f0'
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
          marginRight: '20px'
        }}>JD</div>
        <div>
          <h1 style={{ margin: '0', fontSize: '28px', color: '#1e293b' }}>John Doe</h1>
          <p style={{ 
            margin: '5px 0 0',
            color: '#64748b',
            fontSize: '16px'
          }}>Technology Writer | Member since 2023</p>
        </div>
      </div>

      <h2 style={{
        fontSize: '22px',
        color: '#1e293b',
        marginBottom: '25px',
        paddingBottom: '10px',
        borderBottom: '2px solid #4361ee',
        display: 'inline-block'
      }}>Articles Under Review</h2>

      {[
        { 
          title: "Machine Learning Advances in 2025", 
          author: "Sarah Johnson", 
          date: "May 4, 2025", 
          category: "Technology",
          progress: 60
        },
        { 
          title: "Blockchain in Healthcare", 
          author: "Michael Chen", 
          date: "May 3, 2025", 
          category: "Healthcare",
          progress: 30
        }
      ].map((article, index) => (
        <div 
          key={index} 
          style={index === 0 ? hoverCardStyle : cardStyle}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              style={{ 
                marginRight: '15px',
                width: '18px',
                height: '18px',
                accentColor: '#4361ee'
              }} 
            />
            <h3 style={{ 
              margin: '0',
              fontSize: '20px',
              color: '#1e293b'
            }}>{article.title}</h3>
          </div>
          <p style={{ 
            margin: '8px 0 0 33px',
            color: '#64748b',
            fontSize: '14px'
          }}>by {article.author}</p>
          
          <div style={{
            margin: '15px 0 0 33px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <span style={{ 
              color: '#10b981',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }}></span>
              Submitted: {article.date}
            </span>
            <span style={{
              backgroundColor: '#e2e8f0',
              color: '#475569',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>{article.category}</span>
          </div>
          
          <div style={{
            margin: '15px 0 0 33px',
            width: '100%',
            height: '6px',
            backgroundColor: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${article.progress}%`,
              height: '100%',
              backgroundColor: '#4361ee',
              borderRadius: '3px'
            }}></div>
          </div>
        </div>
      ))}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '40px'
      }}>
        {[
          { title: 'All Articles', count: 24, color: '#4361ee' },
          { title: 'Reading Review', count: 5, color: '#f59e0b' },
          { title: 'In Progress', count: 3, color: '#10b981' },
          { title: 'Reviewed', count: 16, color: '#8b5cf6' }
        ].map((item, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{
              margin: '0 0 15px',
              fontSize: '18px',
              color: '#64748b'
            }}>{item.title}</h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: item.color
              }}>{item.count}</span>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px'
              }}>
                View all
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewArticles;