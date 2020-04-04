import React, { useState, useContext, useEffect, useRef } from "react";
import { search, getAll } from "../BooksAPI";
import Book from "../components/books/Book";
import { BookContext } from "../store/BookContext";

const SearchPage = () => {
  const [listItems, setListItems] = useState();
  let bookContextData = useContext(BookContext);
  const [filteredListItems, setFilteredListItems] = useState();
  const [listItemsToRender, setListItemsToRender] = useState();
  const [error, setError] = useState(false);
  const inputRef = useRef();

  // This function compares the search items with the books in the shelfes and creates a new array with the books from my shelf instead them from the search
  useEffect(() => {
    try {
      let res0 =
        bookContextData.arrayState &&
        listItems.filter(
          (o) => !bookContextData.arrayState.find((o2) => o.id === o2.id)
        );
      let res1 =
        bookContextData.arrayState &&
        bookContextData.arrayState.filter((book) =>
          listItems.find((searchItem) => book.id === searchItem.id)
        );
      // setFilteredListItems is the final result which has to be mapped to display
      res0 && setFilteredListItems(res1.concat(res0));
    } catch {
      setError(true);
    }
  }, [listItems]);

  // this function handles the Search from the API ,catches Errors and returns a Array for the compare Function
  function searchBooks() {
    if (inputRef.current.value) {
      setError(false);
      try {
        inputRef.current.value && fetchMyAPI().then(Search());
        async function Search() {
          const response = await search(inputRef.current.value);
          return setListItems(response);
        }
      } catch (error) {
        console.log("error search");
        setError(true);
      }
    } else {
      console.log(listItems, "else");
      setTimeout(() => {
        setListItems(null);
        setFilteredListItems(null);
      }, 1000);
    }
  }

  async function fetchMyAPI() {
    // This function refreshes the BookShelfes
    await getAll().then((response) =>
      bookContextData.dispatchArrayState(response)
    );
  }

  // --------- Here i got the same issue with useEffects dependencies as in BookShelf.js if im adding the function it creates an infinite loop ----------
  // Mapping the result from the compare function into a variable
  useEffect(() => {
    const ListItemsFiltered = filteredListItems
      ? filteredListItems.map((v, i) => (
          <li key={i}>
            <Book id={v.id} bookdata={v} update={searchBooks} />
          </li>
        ))
      : null;
    return setListItemsToRender(ListItemsFiltered);
  }, [filteredListItems]);

  return (
    <>
      <div className="search-books-bar">
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            ref={inputRef}
            onChange={searchBooks}
            // onChange={(e) => {
            //   console.log(inputRef.current.value);
            //   // setInput(e.target.value);
            // }}
          />
        </div>
      </div>
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">AllBooks</h2>
          <div className="bookshelf-books">
            {/* destination for the mapped Books */}
            {listItems !== null ? (
              <ol className="books-grid">{listItemsToRender}</ol>
            ) : null}
            {error && <h1>Sorry no results!</h1>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
