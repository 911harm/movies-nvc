import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Url } from 'url';
//se podian usar variables de entorno tal vez 
const Url='https://api.themoviedb.org/3/search/multi?api_key=';
const Page='&page='
const Apy_Key='538a780f4b11ed0327b4bc0760689de0'
const Query="&query="

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public url
  public page
  public query
  public apy_key
  constructor(
    private _http: HttpClient,
     
  ) { 
    this.url=Url
    this.page=Page
    this.query=Query
    this.apy_key=Apy_Key

  }
  testSerach(event,p):Observable<any>{
    return this._http.get(this.url+this.apy_key+this.query+event+this.page+p)

  }
  tvMore(id):Observable<any>{
    return this._http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apy_key}`)
  }

  tvMoreSeason(id,season):Observable<any>{
    return this._http.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${this.apy_key}`)
  }
  //luego se pueden acomodar las peliculas, los actores  y demas, para la POC solo me encarge de las series
}