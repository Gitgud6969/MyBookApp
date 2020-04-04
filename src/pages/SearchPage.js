import React, { useState, useContext, useEffect, useRef } from "react";
import { search, getAll } from "../BooksAPI";
import Book from "../components/books/Book";
import { BookContext } from "../store/BookContext";

const SearchPage = () => {
  const [listItems, setListItems] = useState();
  let bookContextData = useContext(BookContext);
  const [listItemsToRender, setListItemsToRender] = useState();
  const [error, setError] = useState(false);
  const inputRef = useRef();

  // This function compares the search items with the books in the shelfes and creates a new array with the books from my shelf instead them from the search
  useEffect(() => {
    try {
      let res0 =
        listItems &&
        listItems.filter(
          (o) => !bookContextData.arrayState.find((o2) => o.id === o2.id)
        );
      let res1 =
        res0 &&
        bookContextData.arrayState.filter((book) =>
          listItems.find((searchItem) => book.id === searchItem.id)
        );
      const filteredItems = res0 && res1.concat(res0);
      filteredItems && RenderTheList(filteredItems);
    } catch {
      setError(true);
    }
  }, [listItems]);

  // this function handles the Search from the API ,catches Errors and returns a Array for the compare Function
  function searchBooks() {
    if (inputRef.current.value !== "") {
      setError(false);
      try {
        fetchMyAPI().then(Search());
        async function Search() {
          const response = await search(inputRef.current.value);
          if (response.error) {
            setError(true);
          } else {
            bookContextData.arrayState && setListItems(response);
          }
        }
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
      setListItemsToRender();
    }
  }

  async function fetchMyAPI() {
    // This function refreshes the BookShelfes
    await getAll().then((response) =>
      bookContextData.dispatchArrayState(response)
    );
  }

  // Mapping the result from the compare function into a variable

  function RenderTheList(props) {
    const ListItemsFiltered = props
      ? props.map((v, i) => (
          <li key={i}>
            <Book id={v.id} bookdata={v} updateSearch={searchBooks} />
          </li>
        ))
      : null;
    return setListItemsToRender(ListItemsFiltered);
  }

  return (
    <>
      <div className="search-books-bar">
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            ref={inputRef}
            onChange={searchBooks}
          />
        </div>
      </div>
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">AllBooks</h2>
          <div className="bookshelf-books">
            {/* destination for the mapped Books */}
            {listItemsToRender && (
              <ol className="books-grid">{listItemsToRender}</ol>
            )}
            {error && <h1>Sorry no results!</h1>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
