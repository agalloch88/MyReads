import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Shelves from "./components/Shelves";
import * as BooksAPI from "./BooksAPI";
import Book from "./components/Book";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [combinedBooks, setCombinedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [search, setSearch] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfIdToBooks(createMapOfBooks(data))
    });
  }, []);

  useEffect(() => {
    let activeSearch = true;
    if (search) {
      BooksAPI.search(search).then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          if (activeSearch) {
            setSearchBooks(data);
          }
        }
      });
    }

    return () => {
      activeSearch = false;
      setSearchBooks([]);
      console.log("unmount");
    }
  }, [search]);

  useEffect(() => {
    const combinedBooks = searchBooks.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    })
    setCombinedBooks(combinedBooks);
  }, [searchBooks]);

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const changeShelf = (book, shelfTo) => {
    const updatedBooks = books.map((bookToMove) => {
      if (bookToMove.id === book.id) {
        book.shelf = shelfTo;
        return book;
      }
      return bookToMove;
    });
    setBooks(updatedBooks);
    BooksAPI.update(book, shelfTo).then((data) => console.log(data));
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {combinedBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} changeShelf={changeShelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <div>
              <Shelves books={books} changeShelf={changeShelf} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
