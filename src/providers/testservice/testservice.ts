import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

// import {Users} from '../../environment/environment'
import {Observable} from 'rxjs';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
/*
  Generated class for the SessionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface Users {
  quantity:number;
  image:string;
  images:any;
}
@Injectable()
 
export class TestService {


  storage:any={};
  responseData:any={};
  cart:any=[];
  constructor(public http: HttpClient,public toastCtrl:ToastController) {
    this.storage=localStorage;
    console.log('Hello SessionServiceProvider Provider');
  }


  getJWTToken():Observable<Users[]>{
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const data={"username": "prashant", "password":"prashant243"};

    let token=this.http.post("http://opuslabs.in:9069/wp-json/jwt-auth/v1/token",data,httpOptions);
    return token.map((response:Response)=>{
      this.responseData=response;
      this.storage.jwtToken=this.responseData.token;
      
     
    }).catch(this.handleError);
  }

  showToastMessage(messageText)
  {
    let toast = this.toastCtrl.create({
      message: messageText,
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }  

  getProductCategories():Observable<Users[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+this.storage.jwtToken+""
      })
    }
   
    return this.http.get("http://opuslabs.in:9069//wp-json/wc/v2/products/categories",httpOptions)
    .map((response: Response)=>{
      return response;
    })
    .catch(this.handleError);  
  }


  getProducts():Observable<Users[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+this.storage.jwtToken+""
      })
    };
 
    let products = this.http.get("http://opuslabs.in:9069/wp-json/wc/v2/products",httpOptions)
    return products
    .map((response: Response)=>{
      return response;
    })
    .catch(this.handleError);
  }

  setCart(data){
    let ctr=0;
    for (let i = 0; i < this.cart.length; ++i) {
      if (this.cart[i].id==data.id) {
        ctr++;
        this.cart[i].quantity = data.quantity;
        break;
      }
    }
    if (ctr==0) {
      this.cart.push(data);
    }
  }

  getCart(){
    return this.cart;
  }

  private handleError(error: Response) {
    console.log("Error=="+error);
    return Observable.throw(error.statusText);
  }


}
