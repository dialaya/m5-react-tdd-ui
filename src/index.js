import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

function App() {
  const booksPresenter = new BooksPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load((viewModel) => {
        copyViewModelToStateViewModel(viewModel);
      });
    }
    load();
  }, []);

  return (
    <>
      <h3>Books</h3>
      {/* for power up exercise */}
      <button
        type="button"
        onClick={async () => {
          await booksPresenter.setMode("public");
        }}
      >
        Public
      </button>
      &nbsp;
      <button
        type="button"
        onClick={async () => {
          await booksPresenter.setMode("private");
        }}
      >
        Private
      </button>
      <br />
      <button
        type="button"
        onClick={async () => {
          await booksPresenter.setSortByNameOrder("asc");
        }}
      >
        Sort on Name - ASC
      </button>
      &nbsp;
      <button
        type="button"
        onClick={async () => {
          await booksPresenter.setSortByNameOrder("desc");
        }}
      >
        Sort on Name - DESC
      </button>
      <br />
      <div>
        {stateViewModel.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
