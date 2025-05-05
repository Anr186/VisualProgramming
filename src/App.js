import React, { useState, useEffect } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [levelFilter, setLevelFilter] = useState(null);
  const [methodFilter, setMethodFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  // const [dateRange, setDateRange] = useState([null, null]);

  const logLevels = ['Trace', 'Debug', 'Information', 'Warning', 'Error', 'Critical'];
  const httpMethods = ['Microsoft.EntityFrameworkCore.Database.Command', 'Microsoft.Hosting.Lifetime', 'Program'];

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (levelFilter) params.append('level', levelFilter);
      if (methodFilter) params.append('method', methodFilter);
      if (searchText) params.append('search', searchText);
      // if (dateRange[0]) params.append('fromDate', dateRange[0].toISOString());
      // if (dateRange[1]) params.append('toDate', dateRange[1].toISOString());
      
      const response = await fetch(`http://localhost:5284/logs?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch logs');
      
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [levelFilter, methodFilter, searchText]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Error': return 'red';
      case 'Warning': return 'orange';
      case 'Information': return 'blue';
      case 'Debug': return 'purple';
      case 'Critical': return 'magenta';
      default: return 'gray';
    }
  };


  return (
    <div style={{ 
      margin: '16px', 
      border: '1px solid #ddd', 
      borderRadius: '4px', 
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ marginBottom: '5px', marginTop: '5px' }}>Логи</h1>
      {error && (
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#fff2f0',
          border: '1px solid #ffccc7',
          borderRadius: '4px',
          marginBottom: '16px',
          color: '#ff4d4f'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <select
            value={levelFilter || ''}
            onChange={(e) => setLevelFilter(e.target.value || null)}
            style={{ 
              width: '180px', 
              padding: '8px', 
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }}
          >
            <option value="">Все уровни</option>
            {logLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            value={methodFilter || ''}
            onChange={(e) => setMethodFilter(e.target.value || null)}
            style={{ 
              width: '120px', 
              padding: '8px', 
              borderRadius: '4px',
              border: '1px solid #d9d9d9'
            }}
          >
            <option value="">Все методы</option>
            {httpMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>

          <div style={{ display: 'flex', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Поиск по сообщению"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px 0 0 4px',
                border: '1px solid #d9d9d9',
                width: '100%',
                maxWidth: '400px'
              }}
            />
          </div>

          <button
            onClick={fetchLogs}
            disabled={loading}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              backgroundColor: loading ? '#f5f5f5' : 'white',
              cursor: loading ? 'wait' : 'pointer'
            }}
          >
            {loading ? 'Загрузка...' : 'Обновить'}
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'left', width: '80px' }}>ID</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'left', width: '180px' }}>Время</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'left', width: '120px' }}>Уровень</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'left', width: '100px' }}>Метод</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'left' }}>Сообщение</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'left' }}>Ошибка</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8' }}>{log.id}</td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8' }}>{formatDate(log.timestamp)}</td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8', color: getLevelColor(log.level) }}>
                    {log.level}
                  </td>
                  <td style={{ 
                    padding: '12px', 
                    border: '1px solid #e8e8e8',
                    fontWeight: 'bold',
                    color: log.methodHttp === 'Microsoft.EntityFrameworkCore.Database.Command' ? 'gray' : 
                           log.methodHttp === 'Program' ? 'green' :
                           log.methodHttp === 'Microsoft.Hosting.Lifetime' ? 'orange' : 'inherit'
                  }}>
                    {log.methodHttp || '-'}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8', whiteSpace: 'pre-wrap' }}>
                    {log.message}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8' }}>
                    {log.exception && (
                      <pre style={{ color: 'red', margin: 0, whiteSpace: 'pre-wrap' }}>{log.exception}</pre>
                    )}
                    {log.exception || 'dont have error'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '24px', flex: 1 }}>
        <LogViewer />
      </main>
    </div>
  );
};

export default App;