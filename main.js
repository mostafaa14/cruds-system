let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let btndelete = document.getElementById("deleteAll");
let search = document.getElementById("search");
let dataPro = [];
if (localStorage.getItem("products")) {
  dataPro = JSON.parse(localStorage.getItem("products"));
  displayData(dataPro);
}
//getTotal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#4EABED";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

submit.onclick = function () {
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (submit.innerHTML == "create") {
      creatData();
    } else {
      updatFinal();
    }
    clearData();
  }

  displayData(dataPro);
};
//creatData
function creatData() {
  let newPro = {
    Title: title.value.toLowerCase(),
    Price: price.value,
    Taxes: taxes.value,
    Ads: ads.value,
    Discount: discount.value,
    Total: total.innerHTML,
    Count: count.value,
    Category: category.value.toLowerCase(),
  };
  if (newPro.Count > 1) {
    for (let i = 0; i < newPro.Count; i++) {
      dataPro.push(newPro);
    }
  } else {
    dataPro.push(newPro);
  }

  localStorage.setItem("products", JSON.stringify(dataPro));
}
//clearData
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//displayData
function displayData(list) {
  getTotal();
  let box = "";
  for (let i = 0; i < list.length; i++) {
    box += `
    <tr>
        <td>${i + 1}</td>
        <td>${list[i].Title}</td>
        <td>${list[i].Price}</td>
        <td>${list[i].Taxes}</td>
        <td>${list[i].Ads}</td>
        <td>${list[i].Discount}</td>
        <td>${list[i].Total}</td>
        <td>${list[i].Category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>
    `;
  }
  tbody.innerHTML = box;
  if (list.length > 0) {
    btndelete.innerHTML = `
    <button onclick="deleteAllData()">Delete All [${dataPro.length}]</button>
     `;
  } else {
    btndelete.innerHTML = "";
  }
}

//deleteData
function deleteData(index) {
  dataPro.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(dataPro));
  displayData(dataPro);
}

//deleteAllData
function deleteAllData() {
  localStorage.clear();
  dataPro.splice(0);
  displayData(dataPro);
}

//updateData
let glopalItem;
function updateData(item) {
  glopalItem = item;
  title.value = dataPro[item].Title;
  price.value = dataPro[item].Price;
  taxes.value = dataPro[item].Taxes;
  ads.value = dataPro[item].Ads;
  discount.value = dataPro[item].Discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[item].Category;
  submit.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function updatFinal() {
  dataPro[glopalItem].Title = title.value;
  dataPro[glopalItem].Price = price.value;
  dataPro[glopalItem].Taxes = taxes.value;
  dataPro[glopalItem].Ads = ads.value;
  dataPro[glopalItem].Discount = discount.value;
  dataPro[glopalItem].Total = total.innerHTML;
  count.style.display = "block";
  dataPro[glopalItem].Category = category.value;
  submit.innerHTML = "create";
}

//searchMood
let searchMood = "title";
function getSearchMood(id) {
  if (id == "searchtitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  displayData(dataPro);
}

function searchData(value) {
  let searchArr = [];
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].Title.toLowerCase().includes(value.toLowerCase())) {
        searchArr.push(dataPro[i]);
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].Category.toLowerCase().includes(value.toLowerCase())) {
        searchArr.push(dataPro[i]);
      }
    }
  }
  displayData(searchArr);
}
