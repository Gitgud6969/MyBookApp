import React from "react";
import BookShelf from "../components/books/BookShelf";

const Dashboard = () => {
  return (
    <div>
      {" "}
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyBooks</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookShelf shelf="currentlyReading" />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookShelf shelf="wantToRead" />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookShelf shelf="read" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
