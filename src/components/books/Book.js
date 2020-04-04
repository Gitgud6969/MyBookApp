import React from "react";
import { update } from "../../BooksAPI";

export default function Book(props) {
  let bookData = props.bookdata;

  //This function calls the Updatefunction from the Api
  async function Update(UpdatedBookData) {
    await update(UpdatedBookData, UpdatedBookData.shelf);
    props.update();
  }

  function clickHandler(e) {
    let UpdatedBookData = { ...bookData, shelf: e.target.value };
    Update(UpdatedBookData);
    props.updateSearch && props.updateSearch();
  }

  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            aria-label="book-cover"
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                props.bookdata ? props.bookdata.imageLinks.thumbnail : null
              })`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={clickHandler}
              value={props.bookdata.shelf ? props.bookdata.shelf : "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.bookdata.title}</div>
        <div className="book-authors">{props.bookdata.authors}</div>
      </div>
    </div>
  );
}
