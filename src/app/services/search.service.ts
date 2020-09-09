import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Url } from 'url';

const Url='https://api.themoviedb.org/3/search/multi?api_key=538a780f4b11ed0327b4bc0760689de0';
const Page='&page='
const Query="&query="
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public url
  public page
  public query
  constructor(
    private _http: HttpClient,
     
  ) { 
    this.url=Url
    this.page=Page
    this.query=Query

  }
  testSerach(event,p):Observable<any>{
    return this._http.get(this.url+this.query+event+this.page+p)

  }
}