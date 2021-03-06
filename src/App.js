import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import useSearch from "./hooks/useSearch";

function App() {
  let navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [combinedBooks, setCombinedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [search, setSearch] = useState("");
  const [searchBooks, setSearchBooks] = useSearch(search);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfIdToBooks(createMapOfBooks(data));
    });
  }, []);

  useEffect(() => {
    const combinedBooks = searchBooks.map((book) => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    });
    setCombinedBooks(combinedBooks);
  }, [searchBooks]);

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

  const changeShelf = (book, shelfTo) => {
    const updatedBooks = books.map((bookToMove) => {
      if (bookToMove.id === book.id) {
        book.shelf = shelfTo;
        return book;
      }
      return bookToMove;
    });
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = shelfTo;
      updatedBooks.push(book);
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, shelfTo).then((data) => console.log(data));
    navigate("/");
  };

  return (
    <Routes>
      {/* Main Page */}
      <Route
        exact
        path="/"
        element={<Main books={books} changeShelf={changeShelf} />}
      />
      {/* Search Page */}
      <Route
        exact
        path="/search"
        element={
          <Search
            search={search}
            setSearch={setSearch}
            combinedBooks={combinedBooks}
            changeShelf={changeShelf}
          />
        }
      />
    </Routes>
  );
}

export default App;
