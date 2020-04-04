import React, { useEffect, useState, useContext } from "react";
import Book from "./Book";
import { getAll } from "../../BooksAPI";
import { BookContext } from "../../store/BookContext";

export default function BookShelf(props) {
  const [shelfBook, setShelfBooks] = useState();
  let bookContextData = useContext(BookContext);

  fetchMyAPI();

  async function fetchMyAPI() {
    // Gets all Books and saves them in my Context Array
    await getAll().then((response) =>
      bookContextData.dispatchArrayState(response)
    );
  }
  // ---- i cannot resolve the warning with the dependency here because
  //    it creates either an loop if im adding the fetchMyApi to the effect or my bookShelf are not re mapping itself on change -----
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
