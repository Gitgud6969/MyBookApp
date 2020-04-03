import React, { useState, useContext, useEffect } from "react";
import { search, getAll } from "../BooksAPI";
import Book from "../components/books/Book";
import { BookContext } from "../store/BookContext";

const SearchPage = () => {
  const [listItems, setListItems] = useState();
  const bookContextData = useContext(BookContext);
  const [filteredListItems, setFilteredListItems] = useState();
  const [listItemsToRender, setListItemsToRender] = useState();
  const [input, setInput] = useState();
  const [error, setError] = useState(false);

  // This function compares the search items with the books in the shelfes and creates a new array with the books from my shelf instead them from the search
  useEffect(() => {
    let res0 =
      bookContextData.arrayState &&
      listItems.filter(
        o => !bookContextData.arrayState.find(o2 => o.id === o2.id)
      );
    let res1 =
      bookContextData.arrayState &&
      bookContextData.arrayState.filter(book =>
        listItems.find(searchItem => book.id === searchItem.id)
      );
    // setFilteredListItems is the final result which has to be mapped to display
    res0 && setFilteredListItems(res1.concat(res0));
  }, [listItems]);

  // this function handles the Search from the API ,catches Errors and returns a Array for the compare Function
  function searchBooks() {
    setError(false);
    try {
      input && fetchMyAPI().then(Search());
      async function Search() {
        const response = await search(input);
        return setListItems(response);
      }
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    searchBooks();
  }, [bookContextData.arrayState]);

  async function fetchMyAPI() {
    // This function refreshes the BookShelfes
    await getAll().then(response =>
      bookContextData.dispatchArrayState(response)
    );
  }

  // Mapping the result from the compare function into a variable
  useEffect(() => {
    const ListItemsFiltered = filteredListItems
      ? filteredListItems.map((v, i) => (
          <li key={i}>
            <Book id={v.id} bookdata={v} update={fetchMyAPI} />
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
            onChange={e => {
              setInput(e.target.value);
              searchBooks();
            }}
          />
        </div>
      </div>
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">AllBooks</h2>
          <div className="bookshelf-books">
            {/* destination for the mapped Books */}
            <ol className="books-grid">{listItemsToRender}</ol>
            {error && <h1>Sorry that didnt seem to work</h1>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
