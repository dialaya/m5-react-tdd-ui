export default class HttpGateway {
  apiUrl = "https://api.logicroom.co/api/dialaya@gmail.com";
  get = async (path) => {
    const response = await fetch(this.apiUrl + path);
    const dto = response.json();
    return dto;
  };
}
