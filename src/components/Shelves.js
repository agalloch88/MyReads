import React from 'react'
import Shelf from './Shelf';

function Shelves({ books }) {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];

  return (
    <div>
        <Shelf title="Currently Reading" books={currentlyReading} />
        <Shelf />
        <Shelf />
    </div>
  )
}

export default Shelves