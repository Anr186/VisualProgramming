import React, { useState, useEffect, useMemo } from 'react';
import BookCard from './BookCard';
import SearchAndSort from './SearchAndSort';
import cat1 from './files/200w.gif';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirect, setSortDirect] = useState('inc'); // 'inc' или 'dec'
  const [sortBy, setSortBy] = useState('title'); // 'title' или 'authors'

  useEffect(() => {
    const loadBooks = async () => {
      const booksResponse = await fetch('https://fakeapi.extendsclass.com/books');
      const booksData = await booksResponse.json();

      const limitBooks = booksData.slice(0, 20);

      const booksOblojki = [];
      for (let book of limitBooks) {
        let oblojkiResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`);
        const oblojkiData = await oblojkiResponse.json();

        let oblojki = oblojkiData.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || '';
        booksOblojki.push({ ...book, oblojki });
        setBooks(booksOblojki);
      }
      setLoading(false);
    };
    loadBooks();
  }, []);

  const filterBooks = useMemo(() => {
    return books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.authors.join(',').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, books]);

  const sortedBooks = useMemo(() => {
    const direction = sortDirect === 'inc' ? 1 : -1;

    return [...filterBooks].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title) * direction;
      } else if (sortBy === 'authors') {
        return a.authors.join(', ').localeCompare(b.authors.join(', ')) * direction;
      }
      return 0;
    });
  }, [filterBooks, sortDirect, sortBy]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <img src={cat1} alt="Чиназес" style={styles.loadingImage} />
        <p style={styles.loadingText}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <SearchAndSort
        onSearch={setSearchQuery}
        onSortDirectChange={setSortDirect}
        onSortByChange={setSortBy}
      />
      {sortedBooks.map((book) => (
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
    gap: '20px'
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