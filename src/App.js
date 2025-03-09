import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import cat1 from './files/200w.gif';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
        const booksResponse = await fetch('https://fakeapi.extendsclass.com/books');
        const booksData = await booksResponse.json();

        const limitBooks = booksData.slice(0, 25);
        
        const booksOblojki = [];
        for(let book of limitBooks){
          let oblojkiResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`); 
          const oblojkiData = await oblojkiResponse.json();
          
          let oblojki = oblojkiData.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || '';
          booksOblojki.push({...book, oblojki});
          setBooks(booksOblojki);

        }
        setLoading(false);
    };
    loadBooks();
}, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <img src={cat1} alt="Чиназес" style={styles.loadingImage}/>
        <p style={styles.loadingText}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          authors={book.authors}
          oblojki={book.oblojki}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8',
  },
  loadingImage: {
    width: '40%', 
    height: '60%', 
  },
  loadingText: {
    marginTop: '10px',
    fontSize: '30px',
    color: '#333',
    fontWeight: 'bold', 
  },
};

export default App;