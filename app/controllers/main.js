import Food from "../models/food.js";
import FoodList from "../models/foodList.js";
import Validation from "../models/validation.js";

// create new object from class Food List
const foodList = new FoodList();
// create new object from class Validation
const validation = new Validation();

export const getEleId = (id) => document.getElementById(id);

const getInfoFood = () => {
  const foodID = getEleId("foodID").value;
  const tenMon = getEleId("tenMon").value;
  const loai = getEleId("loai").value;
  const giaMon = getEleId("giaMon").value;
  const khuyenMai = getEleId("khuyenMai").value;
  const tinhTrang = getEleId("tinhTrang").value;
  const hinhMon = getEleId("hinhMon").value;
  const moTa = getEleId("moTa").value;

  // Check validation
  let isValid = true;
  // foodID
  isValid &= validation.checkEmpty(foodID, "invalidID", "Nhập mã món ăn");
  validation.checkIdExist(
    foodID,
    "invalidID",
    "Mã món đã tồn tại",
    foodList.arr
  );
  // foodName
  isValid &= 
    validation.checkEmpty(tenMon, "invalidTen", "Nhập vào tên món");
  // foodType
  isValid &=
   validation.checkEmpty(loai, "invalidLoai", "Lựa chọn loại dùng");
  //  validation.checkSelect(loai, "invalidLoai", "Lựa chọn loại dùng")
  // foodPrice
  isValid &= validation.checkEmpty(giaMon, "invalidGia", "Nhập vào giá");
  // discount
  isValid &= validation.checkEmpty(
    khuyenMai,
    "invalidKM",
    "Chọn giá khuyến mãi"
  );
  // foodStatus
  isValid &= validation.checkEmpty(
    tinhTrang,
    "invalidTT",
    "Chọn trạng thái của món"
  );
  if (!isValid) return null;
  //   in ra màn hình Food
  const food = new Food(
    foodID,
    tenMon,
    loai,
    giaMon,
    khuyenMai,
    tinhTrang,
    hinhMon,
    moTa
  );
  food.callPricePromotion();

  return food;
};
/**
 * Render food list tUI
 */

const renderFoodList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const food = data[i];
    content += `
              <tr>
                  <td>${food.id}</td>
                  <td>${food.name}</td>
                  <td>${food.type === "loai1" ? "Chay" : "Mặn"}</td>
                  <td>${food.price}</td>
                  <td>${food.discount}</td>
                  <td>${food.promotionPrice}</td>
                  <td>${food.status === "0" ? "Hết" : "Còn"}</td>
                  <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="handleEditFood('${
                      food.id
                    }')">Edit</button>
                  </td>
                  <td>
                    <button class="btn btn-danger" onclick="handleDeleteFood('${
                      food.id
                    }')">Delete</button>
                  </td>
              </tr>
          `;
    getEleId("tbodyFood").innerHTML = content;
  }
};

// Set local Storage
const setLocalStorage = () => {
  const dataJSON = foodList.arr;

  // Convert dataJSON to string
  const dataString = JSON.stringify(dataJSON);
  // Save dataString to local Storage
  localStorage.setItem("Food_List", dataString);
};

// Get local storage
const getLocalStorage = () => {
  const dataString = localStorage.getItem("Food_List");

  // Check dataString is null => return
  if (!dataString) return;
  // Convert dataString to data JSON
  const dataJSON = JSON.parse(dataString);
  // Update food list from dataJson
  foodList.arr = dataJSON;
  //Render food list
  renderFoodList(foodList.arr);
};
//Get local Storage
getLocalStorage();

// Add food
getEleId("btnThemMon").onclick = function () {
  const food = getInfoFood();

  if (!food) return;
  // Add food to foodlist
  foodList.addFood(food);
  // Render food list
  renderFoodList(foodList.arr);
  // Set Local Storage
  setLocalStorage();
  // close modal
  document.getElementsByClassName("close")[0].click();
};

/**
 * Handle Delete Food
 */

const handleDeleteFood = (id) => {
  foodList.removeFood(id);
  renderFoodList(foodList.arr);
  // Set localstorage
  setLocalStorage();
};

/**
 * Handle Edit Food
 */

const handleEditFood = (id) => {
  // edit title modal
  getEleId("exampleModalLabel").innerHTML = "Chỉnh sửa món ăn";
  // hide button thêm
  getEleId("btnThemMon").style.display = "none";

  const food = foodList.editFood(id);
  if (food) {
    // Show value to form
    getEleId("foodID").value = food.id;
    getEleId("foodID").setAttribute("disabled", true);
    getEleId("tenMon").value = food.name;
    getEleId("loai").value = food.type;
    getEleId("giaMon").value = food.price;
    getEleId("khuyenMai").value = food.discount;
    getEleId("tinhTrang").value = food.status;
    getEleId("hinhMon").value = food.img;
    getEleId("moTa").value = food.description;
  }
};

// quản lý nút thêm
getEleId("btnThem").onclick = function () {
  // edit title modal
  getEleId("exampleModalLabel").innerHTML = "Thêm món ăn";

  // hidden button update
  getEleId("btnCapNhat").style.display = "none";

  // show button thêm
  getEleId("btnThemMon").style.display = "inline-block";

  // reset value form
  getEleId("foodForm").reset();

  // show foodID
  getEleId("foodID").removeAttribute("disabled", false);
};
// Khai báo handleDeleteFood với window
window.handleDeleteFood = handleDeleteFood;
window.handleEditFood = handleEditFood;

/**
 * Nút cập nhật
 */
getEleId("btnCapNhat").onclick = function () {
  const food = getInfoFood();
  // update food
  foodList.updateFood(food);
  // render food
  renderFoodList(foodList.arr);
  // set localstorage
  setLocalStorage();
  // close modal
  document.getElementsByClassName("close")[0].click();
};

/**
 * Filter food
 */

getEleId("selLoai").addEventListener("change", function () {
  const type = getEleId("selLoai").value;
  console.log(type);
  const foodListFilter = foodList.filterFood(type);
  renderFoodList(foodListFilter);
});

/**
 * Search Food
 */

getEleId("search").addEventListener("keyup", function () {
  const keyword = getEleId("search").value;
  const searchFood = foodList.searchFood(keyword);
  if (searchFood.length > 0) renderFoodList(searchFood);
  else return "Nhập tên món";
});
