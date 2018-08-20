import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { CartPage } from '../pages/cart/cart';
import { FavoritePage } from '../pages/favorite/favorite';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestService } from '../providers/testservice/testservice';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    CartPage,
    FavoritePage,
    AboutPage,
    SearchPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    CartPage,
    FavoritePage,
    AboutPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TestService
  ]
})
export class AppModule {}
