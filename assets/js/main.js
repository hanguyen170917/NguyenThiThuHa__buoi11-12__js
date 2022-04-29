function getEle(id) {
  return document.getElementById(id);
}

var services = new Services();

var validation = new Validation();

var usersArr;
// show data
function getListUsers() {
  services
    .fetchData()
    .then(function (result) {
      console.log(result.data);
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListUsers();

// Create table user
function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var user = data[i];
    content += `
        <tr>
            <td>${user.id}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" 
                    data-toggle="modal"
                    data-target="#myModal" onclick="editUser('${user.id}')">Sửa</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Xoá</button>
            </td>
        </tr>
    `;
  }
  document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

// Show module addUser
getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementById("titleModal").innerHTML = "Thêm người dùng";

  var footer =
    "<button class='btn btn-success' onclick='addUser()'>Thêm</button>";
  document.querySelector(".modal-footer").innerHTML = footer;

  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("loaiNgonNgu").value = "";
  getEle("MoTa").value = "";
});

// getInfoUser
function getInfoUser(id) {
  var _taiKhoan = getEle("TaiKhoan").value;
  var _hoTen = getEle("HoTen").value;
  var _matKhau = getEle("MatKhau").value;
  var _email = getEle("Email").value;
  var _hinhAnh = getEle("HinhAnh").value;
  var _loaiND = getEle("loaiNguoiDung").value;
  var _ngonNgu = getEle("loaiNgonNgu").value;
  var _mota = getEle("MoTa").value;

  var isValid = true;

  // Validation userName
  isValid &= validation.checkNull(
    _taiKhoan,
    "tbTKND",
    "(*)Tài khoản không được rỗng"
  );

  // Validation name
  isValid &= validation.checkNull(
    _hoTen,
    "tbName",
    "(*)Họ tên không được rỗng"
  );

  // Validation pass
  isValid &= validation.checkNull(
    _matKhau,
    "tbPass",
    "(*)Mật khẩu không được rỗng"
  );

  // Validation email
  isValid &= validation.checkNull(
    _email,
    "tbEmail",
    "(*)Email không được rỗng"
  );

  // Validdation img
  isValid &= validation.checkNull(
    _hinhAnh,
    "tbImg",
    "(*)Hình ảnh không được rỗng"
  );

  // Validation description
  isValid &= validation.checkNull(_mota, "tbMota", "(*)Mô tả không được rỗng");

  if (!isValid) {
    return null;
  }

  var user = new Users(
    id,
    _taiKhoan,
    _hoTen,
    _matKhau,
    _email,
    _loaiND,
    _ngonNgu,
    _mota,
    _hinhAnh
  );
  return user;
}

// deleteUser
function deleteUser(id) {
  services
    .deleteUser(id)
    .then(function () {
      getListUsers();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// addUSer
function addUser() {
  var user = getInfoUser("");

  if (user) {
    services
      .addUserApi(user)
      .then(function (result) {
        getListUsers();

        document.querySelector(".close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// editUser
function editUser(id) {
  document.getElementById("titleModal").innerHTML = "Sửa thông tin người dùng";

  var footer = `<button class='btn btn-warning' onclick='updateUser(${id})'>Cập nhật</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;

  services
    .getUserById(id)
    .then(function (result) {
      var user = result.data;
      //   console.log(user);

      getEle("TaiKhoan").value = user.taiKhoan;
      getEle("HoTen").value = user.hoTen;
      getEle("MatKhau").value = user.matKhau;
      getEle("Email").value = user.email;
      getEle("HinhAnh").value = user.hinhAnh;
      getEle("loaiNguoiDung").value = user.loaiND;
      getEle("loaiNgonNgu").value = user.ngonNgu;
      getEle("MoTa").value = user.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// updateUser
function updateUser(id) {
  var user = getInfoUser(id);

  services
    .updateUserApi(user)
    .then(function (result) {
      getListUsers();

      document.querySelector(".close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
