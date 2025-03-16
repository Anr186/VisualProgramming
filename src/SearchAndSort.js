import React from 'react';

const SearchAndSort = ({ onSearch, onSortDirectChange, onSortByChange }) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleSortDirectChange = (e) => {
    const value = e.target.value;
    onSortDirectChange(value);
  };

  const handleSortByChange = (e) => {
    const value = e.target.value;
    onSortByChange(value);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск по названию или автору..."
        onChange={handleSearchChange}
        style={styles.input}
      />
      <select onChange={handleSortDirectChange} style={styles.select}>
        <option value="inc">По возрастанию</option>
        <option value="dec">По убыванию</option>
      </select>
      <select onChange={handleSortByChange} style={styles.select}>
        <option value="title">По названию</option>
        <option value="authors">По автору</option>
      </select>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2%',
    width: '100%',
    gap: '10px',
  },
  input: {
    padding: '0.8%',
    width: '30%',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '0.8%',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default SearchAndSort;