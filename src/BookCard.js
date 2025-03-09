import React from 'react';
import cat_scarry from './files/cat_strong.png';
import cat_king from './files/king_cat.png';

const BookCard = ({ title, authors, oblojki }) => {
  const backgroundImages = [cat_scarry, cat_king];
  const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  const nooblStyle = {
    ...styles.noobl,
    backgroundImage: `url(${randomImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={styles.card}>
      {oblojki ? (
        <img src={oblojki} alt={title} style={styles.oblojki} />
      ) : (
        <div style={nooblStyle}></div> 
      )}
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.authors}>{authors.join(', ')}</p>
    </div>
  );
};

const styles = {
  card: {
    width: '200px',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
  },
  oblojki: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
  },
  noobl: {
    width: '100%',
    height: '80%',
    // backgroundColor: '#e3ebe1', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1%',
    marginBottom: '1%',
  },
  title: {
    fontSize: '18px',
    margin: '5px 0',
  },
  authors: {
    fontSize: '14px',
    color: '#555',
  },
};

export default BookCard;