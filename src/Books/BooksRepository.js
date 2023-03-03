import HttpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";

class BooksRepository {
  programmersModel = null;
  callback = null;
  mode = "books";
  sortOrder = null;

  constructor() {
    this.gateway = new HttpGateway();
    this.programmersModel = new Observable([]);
  }

  getBooks = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadApiData();
  };

  loadApiData = async () => {
    const dto = await this.gateway.get("/" + this.mode);
    this.programmersModel.value = dto.result.map((dtoItem) => {
      return dtoItem;
    });
    this.programmersModel.notify();
  };

  refreshModelData = () => {
    this.programmersModel.value = this.programmersModel.value.map((pm) => {
      return pm;
    });
    this.programmersModel.notify();
  };

  setSortByNameOrder = (order) => {
    if (order === "desc") {
      this.programmersModel.value.sort((b1, b2) =>
        b1.name > b2.name ? -1 : 1
      );
    } else if (order === "asc") {
      this.programmersModel.value.sort((b1, b2) =>
        b1.name > b2.name ? 1 : -1
      );
    } else {
      this.programmersModel.value.sort((b1, b2) => (b1.id > b2.id ? 1 : -1));
    }
    this.programmersModel.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
