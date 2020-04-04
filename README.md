## Welcome to my BookApp!

This is my submission for the code project my Reads App.
On the Dashboard you can see all the Books currently saved for your token in their Bookshelfes. By clicking on the add symbol of each book you can change their bookschelf.

When you select search in the Navbar you will be redirected to the search tool. Here you cann search for Books even when they are represented in your bookshelfes. And add Books that are not currently in any bookshelf.

Have fun!

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Architecture

I tried to make my code easy to read with my tree like structure

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── pages # This folder contains my two pages
        └── Dashboard.js # Containing my BookShelfes
        └── SearchPage.js # Containing my BookSearch, with a lot of logic to make the search work
    ├── components
        └── Book.js # This component Holds the function for updating the BackendAPI and displaying the books properly
        └── BookShelf.js # This component holds all the books and is rendering them on Context change
    ├── App.js # This is the root of my book App containing everything. And it manages react-router.
    ├── App.test.js
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css
    └── index.js #I modified this file to hold my App context
```

## Backend Server

The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
