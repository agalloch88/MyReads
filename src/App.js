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

  const [search, setSearch] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      console.log(data);
      setBooks(data);
    });
  }, []);

  useEffect(() => {
    if (search) {
      BooksAPI.search(search).then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setSearchBooks(data);
        }
      });
    }
  }, [search]);

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
              {searchBooks.map((book) => (
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
