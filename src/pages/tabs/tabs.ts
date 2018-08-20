import { Component } from '@angular/core';
import { Events} from 'ionic-angular';
import { TestService } from '../../providers/testservice/testservice';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { FavoritePage } from '../favorite/favorite';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = CartPage;
  tab4Root = FavoritePage;
  tab5Root = AboutPage;
  total: number;
  constructor(public service:TestService,public events:Events) {
    this.total=0;
    events.subscribe('product:updated', () => {
      let num=0;
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log("event is calling");
      // this.total=10;
      let array=this.service.getCart();
      for (let i = 0; i < array.length; ++i) {
        num += array[i].quantity;
      }
      this.total=num;
      console.log(array.length+" items in the cart");
    });
  }
}