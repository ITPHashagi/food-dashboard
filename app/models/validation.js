import { getEleId } from "../controllers/main.js";

class Validation {
  checkEmpty(value, divId, message) {
    if (value === "") {
      getEleId(divId).innerHTML = message;
      getEleId(divId).style.display = "block";
      return false;
    } else {
      getEleId(divId).innerHTML = "";
      getEleId(divId).style.display = "none";
      return true;
    }
  }

  // Check select
  checkSelect(isSelect, divId, message) {
    if (getEleId(isSelect).selectedIndex === 0) {
      getEleId(divId).innerHTML = message;
      getEleId(divId).style.display = "block";
      return false;
    }
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }

  // Check Length

  // CheckIdExist
  checkIdExist(value, divId, message, listFood) {
    let isExist = false;
    for (let i = 0; i < listFood.length; i++) {
      const food = listFood[i];
      if (food.id === value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      // id đang tồn tại => không hợp lệ
      getEleId(divId).innerHTML = message;
      getEleId(divId).style.display = "block";
      return false;
    }
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }
}

export default Validation;
