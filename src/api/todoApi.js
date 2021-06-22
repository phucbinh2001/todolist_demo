import axiosClient from "./axiosClient";

class TodoApi {
  getAll = (params) => {
    const url = "/";
    return axiosClient.get(url, { params });
  };

  postTodo = (data) => {
    const url = "/";
    return axiosClient
      .post(url, data)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateTodo = (id, status) => {
    const url = `/${id}`;
    return axiosClient
      .put(url, status)
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteTodo = (id) => {
    const url = `/${id}`;
    return axiosClient
      .delete(url)
      .catch(function (error) {
        console.log(error);
      });
  };
}
const todoApi = new TodoApi();
export default todoApi;
