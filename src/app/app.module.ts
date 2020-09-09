import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ItemsComponent } from './components/items/items.component';
import { FooterComponent } from './components/footer/footer.component';
//httclient
import { HttpClientModule } from '@angular/common/http';
//infinite scroll
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
