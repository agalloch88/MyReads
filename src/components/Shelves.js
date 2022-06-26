import React from "react";
import Shelf from "./Shelf";

function Shelves({ books, changeShelf }) {
  const filter = (books) => (shelf) => books.shelf((b) => b.shelf === shelf);
  const filterBy = filter(books);

  const currentlyReading = filterBy("currentlyReading");
  const wantToRead = filterBy("wantToRead");
  const read = filterBy("read");

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
