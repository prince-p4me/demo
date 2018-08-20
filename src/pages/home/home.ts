import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';
import { TestService } from '../../providers/testservice/testservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  prodcuts:any;
  items:any;
  slides:any=[];
  buttons:any=[];
  loader:boolean;
  constructor(public service:TestService, public navCtrl: NavController,
    public events:Events) {
    this.loader=true;
    if(localStorage.hasOwnProperty('jwtToken'))
    {
      this.getCategories();
    }
    else
    {
      this.service.getJWTToken().subscribe((data)=>{
        this.getCategories();
      },(err)=>{
        alert("Please try again")
          console.log("Error==="+err);
      })
    }
    this.slides=[{path:'./assets/imgs/first.jpg'},
                {path:'./assets/imgs/second.jpg'},
                {path:'./assets/imgs/third.jpg'}];
    this.buttons=[{name:1,active:true},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7},
                  {name:8},{name:9},{name:10}];
  }

  getProducts(){
    this.service.getProducts().subscribe((data)=>{
      if (data) {
        if (data.length>0) {
          for (let i = 0; i < data.length; ++i) {
            data[i].quantity=0;
            data[i].image=data[i].images[0].src;
          }
        }
      }
      this.prodcuts=data;
      this.loader=false;
      // console.log("Products==="+JSON.stringify(data));
    },(err)=>{
      alert("Please try again"+err);
    })
  }

  getCategories(){
    this.service.getProductCategories().subscribe((data)=>{
      this.items=data;
      this.items[0].active=true;
      // console.log("Product Categories==="+JSON.stringify(data));
      this.getProducts();
    },(err)=>{
      alert("Please try again"+err);
    })
  }

  getActiveCategory(index){
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].active=false;
    }
    this.items[index].active=true;
  }

  addItem(index){
    this.prodcuts[index].quantity++;
    this.service.setCart(this.prodcuts[index]);
    this.events.publish('product:updated');
  }

  removeItem(index){
    if (this.prodcuts[index].quantity===0) {
      this.service.showToastMessage("This item is not present in your cart");
      return false;
    }
    this.prodcuts[index].quantity--;
    this.service.setCart(this.prodcuts[index]);
    this.events.publish('product:updated');
  }
}
