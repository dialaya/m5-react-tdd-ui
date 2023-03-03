import BooksPresenter from "./Books/BooksPresenter";
import booksRepository from "./Books/BooksRepository";

let viewModel;
let privateBooksStub;
let publicBooksStub;
let booksPresenter;

let setup = async (visibilityMode) => {
  booksPresenter.setMode(visibilityMode);
  await booksPresenter.load((result) => {
    viewModel = result;
  });
};

beforeEach(async () => {
  booksPresenter = new BooksPresenter();

  // 5 items
  privateBooksStub = {
    success: true,
    result: [
      {
        bookId: 57691,
        name: "The Hobbit",
        ownerId: "dialaya@gmail.com",
        author: "Jrr Tolkein"
      },
      {
        bookId: 57701,
        name: "M2Book1",
        ownerId: "dialaya@gmail.com",
        author: "Bakary Djiba"
      },
      {
        bookId: 57711,
        name: "M2Book1",
        ownerId: "dialaya@gmail.com",
        author: "Bakary Djiba"
      },
      {
        bookId: 58031,
        name: "Book2",
        ownerId: "dialaya@gmail.com",
        author: "Author1"
      },
      {
        bookId: 58041,
        name: "Book3",
        ownerId: "dialaya@gmail.com",
        author: "Auth3"
      }
    ]
  };

  // 7 items
  publicBooksStub = {
    success: true,
    result: [
      {
        bookId: 31,
        name: "Moby Dick",
        ownerId: null,
        author: "Herman Melville"
      },
      { bookId: 41, name: "The Art of War", ownerId: null, author: "Sun Tzu" },
      {
        bookId: 57691,
        name: "The Hobbit",
        ownerId: "dialaya@gmail.com",
        author: "Jrr Tolkein"
      },
      {
        bookId: 57701,
        name: "M2Book1",
        ownerId: "dialaya@gmail.com",
        author: "Bakary Djiba"
      },
      {
        bookId: 57711,
        name: "M2Book1",
        ownerId: "dialaya@gmail.com",
        author: "Bakary Djiba"
      },
      {
        bookId: 58031,
        name: "Book2",
        ownerId: "dialaya@gmail.com",
        author: "Author1"
      },
      {
        bookId: 58041,
        name: "Book3",
        ownerId: "dialaya@gmail.com",
        author: "Auth3"
      }
    ]
  };

  //
  booksRepository.gateway.get = jest.fn().mockImplementation((path) => {
    if (path === "/books") {
      return Promise.resolve(privateBooksStub);
    } else if (path === "/allbooks") {
      return Promise.resolve(publicBooksStub);
    }
    return Promise.resolve({});
  });
});

describe("Mode selection", () => {
  it("should load private books as default", async () => {
    await setup(undefined);
    expect(viewModel.length).toBe(5);
  });

  it("should load private books", async () => {
    await setup("private");

    expect(viewModel.length).toBe(5);
    expect(viewModel[0].name).toBe("The Hobbit");
  });

  it("should load public books", async () => {
    await setup("public");
    expect(viewModel.length).toBe(7);
  });
});

describe("sort items", async () => {
  let setSortOrder = async (order) => {
    await booksPresenter.setSortByNameOrder(order);
  };

  beforeEach(() => {
    // use private list for sort tests
    setup("private");
  });

  it("should short ascending", async () => {
    //await setup("private");
    expect(viewModel[0].name).toBe("The Hobbit");
    expect(viewModel[1].name).toBe("M2Book1");
    await setSortOrder("asc");
    //await setSortOrder(viewModel, "asc", (result) => (viewModel = result));
    //viewModel.sort((vm1, vm2) => (vm1.name > vm2.nam ? 1 : -1));
    //viewModel.sort((vm1, vm2) => vm1.name.localCompare(vm2.name));
    expect(viewModel[0].name).toBe("Book2");
    expect(viewModel[1].name).toBe("Book3");
  });

  it("should short descending", async () => {
    //await setup("private");
    expect(viewModel[0].name).toBe("The Hobbit");
    expect(viewModel[1].name).toBe("M2Book1");
    await setSortOrder("desc");
    //await setSortOrder(viewModel, "desc", (result) => (viewModel = result));
    expect(viewModel[0].name).toBe("The Hobbit");
    expect(viewModel[1].name).toBe("M2Book1");
  });
});
