import React from "react";
import Book from "./Book";

function Shelf({ books }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li>
              <Book book={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Shelf;
