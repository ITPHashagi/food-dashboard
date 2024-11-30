class Food {
  constructor(
    _id,
    _name,
    _type,
    _price,
    _discount,
    _status,
    _img,
    _description
  ) {
    this.id = _id;
    this.name = _name;
    this.type = _type;
    this.price = _price;
    this.discount = _discount;
    this.status = _status;
    this.img = _img;
    this.description = _description;
    this.promotionPrice = 0;
  }
  callPricePromotion() {
    if (this.discount >= 0) {
      this.promotionPrice = this.price * ((100 - this.discount) / 100);
    }
  }
}

export default Food;
