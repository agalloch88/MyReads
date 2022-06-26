import React from "react";
import Shelf from "./Shelf";

function Shelves({ books, changeShelf }) {
  // want to implement closure to make this portion more functional
  // const filter = books => shelf => books.shelf(b => b.shelf === shelf)
  // const filterBy = filter(books)

  // const wantToRead = filterBy('wantToRead')
  // const currentlyReading = filterBy('currentlyReading')

  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (
    <div>
      <Shelf
        title="Currently Reading"
        books={currentlyReading}
        changeShelf={changeShelf}
      />
      <Shelf
        title="Want To Read"
        books={wantToRead}
        changeShelf={changeShelf}
      />
      <Shelf title="Read" books={read} changeShelf={changeShelf} />
    </div>
  );
}

export default Shelves;
