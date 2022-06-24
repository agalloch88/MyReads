import React from "react";
import Header from "../components/Header";
import Shelves from "../components/Shelves";
import { Link } from "react-router-dom";

function Main({ books, changeShelf }) {
  return (
    <div className="app">
      <div className="list-books">
        <Header />
        <div className="list-books-content">
          <div>
            <Shelves books={books} changeShelf={changeShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
