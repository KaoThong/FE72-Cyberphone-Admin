var productList = [];

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct(id) {
  //pending
  getEle("loading").style.display = "block";
  axios({
    url: "https://62bc4dcbeff39ad5ee223a09.mockapi.io/api/Products",
    method: "GET",
  })
    .then((res) => {
      productList = res.data;
      renderProducts(productList);
      getEle("loading").style.display = "none";
    })
    .catch((err) => console.log(err));
}

getListProduct();

function renderProducts(data) {
  var contentHTML = "";

  for (var i = 0; i < data.length; i++) {
    contentHTML += `
          <tr>
              <td>${i + 1}</td>
              <td>${data[i].name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].screen}</td>
              <td>${data[i].backCamera}</td>
              <td>${data[i].frontCamera}</td>
              <td>
                  <img width="50px" src="${data[i].img}" alt="${
      data[i].name
    }" />
              </td>
              <td>${data[i].type}</td>
              <td>${data[i].desc}</td>
              <td>
              <button onclick="getProduct(${
                data[i].id
              })" class="btn btn-success">Cập nhật</button>
                  <button onclick="deleteProduct('${
                    data[i].id
                  }')" class="btn btn-danger">Xoá</button>
              </td>
          </tr>
      `;
  }

  getEle("tblDanhSachSP").innerHTML = contentHTML;
}

function handleClearForm() {
  document.getElementById("TenSP").value = "";
  document.getElementById("GiaSP").value = "";
  document.getElementById("ManHinhSP").value = "";
  document.getElementById("CameraSau").value = "";
  document.getElementById("CameraTruoc").value = "";
  document.getElementById("HinhSP").value = "";
  document.getElementById("MoTa").value = "";
  document.getElementById("LoaiSP").value = "";
  document.getElementById("productId").value = "";

  document.getElementById("btnSaveInfo").style.display = "block";
  document.getElementById("btnUpdate").style.display = "none";
}

function searchPhone() {
  var keyword = document
    .getElementById("inputSearch")
    .value.toLowerCase()
    .trim();
  const result = productList.filter((item) => {
    return item.name.toLowerCase().trim().includes(keyword);
  });
  renderProducts(result);
}

function deleteProduct(id) {
  // console.log(id);
  axios({
    url: "https://62bc4dcbeff39ad5ee223a09.mockapi.io/api/Products/" + id,
    method: "DELETE",
  })
    .then((res) => {
      getListProduct();
    })
    .catch((err) => console.log(err));
}

// function updateProduct(id) {}

function createProduct(data) {
  var prodName = document.getElementById("TenSP").value;
  var prodPrice = document.getElementById("GiaSP").value;
  var prodScreen = document.getElementById("ManHinhSP").value;
  var prodBackCamera = document.getElementById("CameraSau").value;
  var prodFrontCamera = document.getElementById("CameraTruoc").value;
  var prodImg = document.getElementById("HinhSP").value;
  var prodType = document.getElementById("LoaiSP").value;
  var prodDescription = document.getElementById("MoTa").value;

  var product = new Product(
    prodName,
    prodPrice,
    prodScreen,
    prodBackCamera,
    prodFrontCamera,
    prodImg,
    prodDescription,
    prodType
  );

  axios({
    url: "https://62bc4dcbeff39ad5ee223a09.mockapi.io/api/Products",
    method: "POST",
    data: product,
  })
    .then((res) => {
      getListProduct();
      // renderProducts();
    })
    .catch((err) => console.log(err));
}

function getProduct(id) {
  axios({
    url: "https://62bc4dcbeff39ad5ee223a09.mockapi.io/api/Products/" + id,
    method: "GET",
  })
    .then((res) => {
      document.getElementById("btnThemSP").click();
      console.log(res.data);

      if (id) {
        document.getElementById("TenSP").value = res.data.name;
        document.getElementById("GiaSP").value = res.data.price;
        document.getElementById("ManHinhSP").value = res.data.screen;
        document.getElementById("CameraSau").value = res.data.backCamera;
        document.getElementById("CameraTruoc").value = res.data.frontCamera;
        document.getElementById("HinhSP").value = res.data.img;
        document.getElementById("MoTa").value = res.data.desc;
        document.getElementById("LoaiSP").value = res.data.type;
        document.getElementById("productId").value = res.data.id;
      }

      document.getElementById("btnSaveInfo").style.display = "none";
      document.getElementById("btnUpdate").style.display = "inline";
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateProduct() {
  var prodName = document.getElementById("TenSP").value;
  var prodPrice = document.getElementById("GiaSP").value;
  var prodScreen = document.getElementById("ManHinhSP").value;
  var prodBackCamera = document.getElementById("CameraSau").value;
  var prodFrontCamera = document.getElementById("CameraTruoc").value;

  var prodImg = document.getElementById("HinhSP").value;
  var prodDescription = document.getElementById("MoTa").value;
  var prodType = document.getElementById("LoaiSP").value;
  var prodId = document.getElementById("productId").value;

  let product = new Product(
    prodName,
    prodPrice,
    prodScreen,
    prodBackCamera,
    prodFrontCamera,
    prodImg,
    prodDescription,
    prodType
  );

  axios({
    url: "https://62bc4dcbeff39ad5ee223a09.mockapi.io/api/Products/" + prodId,
    method: "PUT",
    data: product,
  })
    .then((res) => {
      getListProduct();
      document.getElementById("close").click();

      prodName = "";
      prodPrice = "";
      prodScreen = "";
      prodBackCamera = "";
      prodFrontCamera = "";
      prodImg = "";
      prodDescription = "";
      prodType = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

// function updateProduct() {
//   var prodName = document.getElementById("TenSP").value;
//   var prodPrice = document.getElementById("GiaSP").value;
//   var prodScreen = document.getElementById("ManHinhSP").value;
//   var prodBackCamera = document.getElementById("CameraSau").value;
//   var prodFrontCamera = document.getElementById("CameraTruoc").value;
//   var prodImg = document.getElementById("HinhSP").value;
//   var prodDescription = document.getElementById("MoTa").value;
//   var prodType = document.getElementById("LoaiSP").value;
//   var prodId = document.getElementById("productId").value;

//   // console.log(prodId);

//   var product = new Product(
//     prodId,
//     prodName,
//     prodPrice,
//     prodScreen,
//     prodBackCamera,
//     prodFrontCamera,
//     prodImg,
//     prodDescription,
//     prodType
//   );

//   axios({
//     url: "https://62bc4dcbeff39ad5ee223a09.mockapi.io/api/Products" + prodId,
//     method: "PUT",
//     data: product,
//   })
//     .then((res) => {
//       getListProduct();
//     })
//     .catch((err) => console.log(err));
// }

// updateProduct();
