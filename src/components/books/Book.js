import React from "react";
import { update } from "../../BooksAPI";

export default function Book(props) {
  let bookData = props.bookdata;

  //This function calls the Updatefunction from the Api
  async function Update(UpdatedBookData) {
    await update(UpdatedBookData, UpdatedBookData.shelf);
    props.update && props.update();
    props.updateSearch && props.updateSearch();
  }

  function clickHandler(e) {
    let UpdatedBookData = { ...bookData, shelf: e.target.value };
    Update(UpdatedBookData);
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
                props.bookdata.imageLinks && props.bookdata.imageLinks.thumbnail
                  ? `${props.bookdata.imageLinks.thumbnail}`
                  : `http://via.placeholder.com/128x193?text=No%20Cover`
              })`,
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
        <div className="book-authors">
          {Array.isArray(props.bookdata.authors)
            ? props.bookdata.authors.join(", ")
            : props.bookdata.authors}
        </div>
      </div>
    </div>
  );
}
