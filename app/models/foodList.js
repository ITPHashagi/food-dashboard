import Food from "./food.js";

class FoodList {
  constructor() {
    this.arr = [];
  }

  addFood(food) {
    this.arr.push(food);
  }
  findIndexFood(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      let food = this.arr[i];
      if (food.id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  removeFood(id) {
    //Tìm vị trí cần xóa
    const index = this.findIndexFood(id);

    // Xóa food khỏi mảng
    if (index != -1) {
      this.arr.splice(index, 1);
    }
  }
  editFood(id) {
    const index = this.findIndexFood(id);
    // Lấy food từ vị trí tìm thấy trên mảng
    if (index != -1) {
      // Trả về food
      return this.arr[index];
    }
    return null;
  }

  updateFood(food) {
    const index = this.findIndexFood(food.id);
    if (index != -1) {
      this.arr[index] = food;
    }
  }

  filterFood(type) {
    if (type == "all") {
      return this.arr;
    } else {
      let result = [];
      for (let i = 0; i < this.arr.length; i++) {
        const food = this.arr[i];
        if (food.type === type) {
          result.push(food);
        }
      }
      return result;
    }
  }
  searchFood(keyword) {
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      let food = this.arr[i];

      // Chuyển keyword và food.name về chứ thường
      const keywordLowerKey = keyword.toLowerCase();
      const foodNameLowerCase = food.name.toLowerCase();
      if (foodNameLowerCase.indexOf(keywordLowerKey) !== -1) {
        result.push(food);
      }
    }
    return result;
  }
}

export default FoodList;
