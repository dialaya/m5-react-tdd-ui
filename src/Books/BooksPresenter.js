import booksRepository from "./BooksRepository.js";

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name, author: bookPm.author };
      });
      callback(booksVm);
    });
  };

  setMode = async (mode) => {
    booksRepository.mode = mode === "public" ? "allbooks" : "books";
    await this.load(() => {});
  };

  setSortByNameOrder = async (order) => {
    await booksRepository.setSortByNameOrder(order === "desc" ? "desc" : "asc");
  };

  sort = async (booksVm, sortOrder, callback) => {
    if (sortOrder === "desc") {
      booksVm.sort((b1, b2) => (b1.name > b2.name ? -1 : 1));
    } else {
      booksVm.sort((b1, b2) => (b1.name > b2.name ? 1 : -1));
    }
    callback(booksVm);
  };
}
