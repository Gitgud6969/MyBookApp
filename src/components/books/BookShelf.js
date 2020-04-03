import React, { useEffect, useState, useContext } from "react";
import Book from "./Book";
import { getAll } from "../../BooksAPI";
import { BookContext } from "../../store/BookContext";

export default function BookShelf(props) {
  const [shelfBook, setShelfBooks] = useState();
  const bookContextData = useContext(BookContext);

  async function fetchMyAPI() {
    // Gets all Books and saves them in my Context Array
    await getAll().then(response =>
      bookContextData.dispatchArrayState(response)
    );
  }

  // When the Component loads this function fires
  useEffect(() => {
    fetchMyAPI();
  }, []);

  // every time my Context Data changes the BookShelf re maps itself
  useEffect(() => {
    const shelfBooks =
      bookContextData.arrayState &&
      bookContextData.arrayState.map((v, i) =>
        v.shelf === props.shelf ? (
          <li key={i}>
            <Book id={v.id} bookdata={v} update={fetchMyAPI} />
          </li>
        ) : null
      );
    return setShelfBooks(shelfBooks);
  }, [bookContextData.arrayState]);

  return <ol className="books-grid">{shelfBook}</ol>;
}
