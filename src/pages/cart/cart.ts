import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { TestService } from '../../providers/testservice/testservice';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cart:any=[];
  total:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service:TestService,public events:Events) {
    this.total=0;
    events.subscribe('product:updated', () => {
      this.calculate();
    });
  }

  ionViewDidLoad() {
    this.calculate();
  }
  addItem(index){
    this.cart[index].quantity++;
    this.service.setCart(this.cart[index]);
    this.events.publish('product:updated');
  }

  removeItem(index){
    this.cart[index].quantity--;
    this.service.setCart(this.cart[index]);
    this.events.publish('product:updated');
    if (this.cart[index].quantity===0) {
      this.cart.splice(index,1);
      this.service.showToastMessage("Item has been removed from your cart");
      return false;
    }
  }

  calculate(){
    this.total=0;
    this.cart=this.service.getCart();
    for (var i = 0; i < this.cart.length; ++i) {
      if (!this.cart[i].price) {
        this.cart[i].price=0;
      } else {
        this.cart[i].price=parseInt(this.cart[i].price);
      }
      this.cart[i].totalPrice=this.cart[i].price * this.cart[i].quantity;
      this.total += this.cart[i].totalPrice;
      if (!this.cart[i].name) {
        this.cart[i].name="Undefined";
      }
      if (!this.cart[i].categories || this.cart[i].categories.length==0) {
        this.cart[i].categories=[{name:'Undefined'}];
      } else {
        if (!this.cart[i].categories[0].name) {
          this.cart[i].categories[0].name="Undefined";
        }
      }
    }
  }
}
