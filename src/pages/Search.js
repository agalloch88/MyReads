import React from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";

function Search({ search, setSearch, combinedBooks, changeShelf }) {
  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
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
    </div>
  );
}

export default Search;
