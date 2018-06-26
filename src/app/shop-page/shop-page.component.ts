import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  pageItem: Item = {
    id: '1',
    name: 'TagCommander',
    price: 20,
    quantity: 0
  };
  cartItems: Array<Item> = [
    {
      id: '2',
      name: 'TagCommanderBis',
      price: 90,
      quantity: 2
    }
  ];

  defaultStoreCurrency: string = '€';
  isMsgDisplayed: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  removeQuantity() {
    if (this.pageItem.quantity > 1) {
      this.pageItem.quantity--;
    }
  }
  addQuantity() {
    this.pageItem.quantity++;
  }
  addToCart() {
    let index = -1;
    this.cartItems.forEach((item, i) => {
      if (item.id === this.pageItem.id) {
        index = i;
      }
    });

    if (index === -1) {
      let item = this.pageItem;
      item['quantity'] = this.pageItem.quantity;
      this.cartItems.push(new Item(
        this.pageItem.id,
        this.pageItem.name,
        this.pageItem.price,
        this.pageItem.quantity
      ));
    } else {
      this.cartItems[index].quantity += this.pageItem.quantity;
    }
    this.pageItem.quantity = 0;
    // TagCommander.captureEvent('cart_checkout', document.querySelector('#buy_button'), { buy: 'true' })
  }
  removeFromCart(index) {
    this.cartItems.splice(index, 1);
  }
  removeQuantityFromCartItem(index) {
    if (this.cartItems[index].quantity === 1) {
      this.removeFromCart(index);
    } else {
        this.cartItems[index].quantity -= 1;
    }
  }
  addQuantityFromCartItem(index) {
    this.cartItems[index].quantity += 1;
  }
}

export class Item {
  id: string;
  name: string;
  price: number;
  quantity: number;

  constructor(id: string, name: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}