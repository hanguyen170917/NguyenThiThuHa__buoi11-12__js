function Services() {
  this.fetchData = function () {
    return axios({
      url: "https://625569238646add390d66a6b.mockapi.io/api/teachers",
      method: "GET",
    });
  };

  this.deleteUser = function (id) {
    return axios({
      url: `https://625569238646add390d66a6b.mockapi.io/api/teachers/${id}`,
      method: "DELETE",
    });
  };

  this.addUserApi = function (user) {
    return axios({
      url: "https://625569238646add390d66a6b.mockapi.io/api/teachers",
      method: "POST",
      data: user,
    });
  };

  this.getUserById = function (id) {
    return axios({
      url: `https://625569238646add390d66a6b.mockapi.io/api/teachers/${id}`,
      method: "GET",
    });
  };

  this.updateUserApi = function (user) {
    return axios({
      url: `https://625569238646add390d66a6b.mockapi.io/api/teachers/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
