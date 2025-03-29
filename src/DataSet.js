import React, { useState } from 'react';
import backImage from './files/back.png';

const DataSet = ({ data, headers, renderHeader, renderCell }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const resHeaders = headers || (data.length > 0 ? Object.keys(data[0]) : []);

  const handleRowSelect = (rowId, e) => {
    const isCtrlPress = e.ctrlKey;
    
    setSelectedRows(prevSelected => {
      const newSelected = new Set(prevSelected);
      
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
          <th style={{ width: '30px', borderRight: '1px solid #dddб', backgroundColor: '#ed6bcd'}}></th>
          {resHeaders.map(header => renderHeader(header))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr 
            key={row.id} 
            style={{borderBottom: '1px solid #ddd', backgroundColor: selectedRows.has(row.id) ? '#96aaf2' : '#f7d7ef', cursor: 'pointer'}}
          >
            <td
              style={{borderRight: '1px solid #ddd', width: '30px', backgroundColor: selectedRows.has(row.id) ? '#96aaf2' : '#fcbdeb'}}
              onClick={(e) => handleRowSelect(row.id, e)}
            >
              {selectedRows.has(row.id) ? 'X' : ''}
            </td>
            {resHeaders.map((header) => (
              <td 
                key={`${row.id}-${header}`}
                style={{borderRight: '1px solid #ddd',backgroundColor: selectedRows.has(row.id) ? '#96aaf2' : '#fcbdeb'}}
                onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleRowSelect(row.id, e);
                }
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
    }}></div>
    </div>
  );
};

export default DataSet;