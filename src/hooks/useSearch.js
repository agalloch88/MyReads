import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import { useDebounce } from "use-debounce";


export default function useSearch(search) {
    const [searchBooks, setSearchBooks] = useState([]);
    const [value] = useDebounce(search, 500);

    useEffect(() => {
        let activeSearch = true;
        if (value) {
          BooksAPI.search(value).then((data) => {
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
        };
      }, [value]);

      return [searchBooks, setSearchBooks];

};