import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ItemsComponent } from './components/items/items.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoreComponent } from './components/more/more.component';

//httclient
import { HttpClientModule } from '@angular/common/http';
//infinite scroll
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
//Router
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemsComponent,
    FooterComponent,
    MoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule.forRoot([
      { path: "", component: MainComponent },
      { path: "movie/:id", component: MoreComponent },
      { path: "**", redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
