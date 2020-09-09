import { Component,HostListener, OnInit,Input,DoCheck } from '@angular/core';
import {SearchService} from '../../services/search.service'


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers:[SearchService]
})

export class ItemsComponent implements OnInit,DoCheck {

  @Input() items:any;
  @Input() sm:string;
  //----
  private finishPage:number
  private actualPage: number;
  public showGoUpButton: boolean;
  showScrollHeight = 400;
  hideScrollHeight = 200;
  there: boolean
  //----
  
  constructor(
    private search:SearchService
  ) { 
    
    this.showGoUpButton = false;
  }

  ngOnInit() {
    this.search.testSerach(this.sm,this.actualPage).subscribe(res=>{
      // this.actualPage=res.page
      this.there=true
      this.finishPage=res.total_pages
      this.actualPage=res.page
    })
  }
  ngDoCheck(){
    if(this.items.length==0){
      // console.log('no hay items')
      this.there=false
    }else{
      this.there=true
    }
  }
  imageUrl(item){
    if(item.media_type=="person"){
      if(item.profile_path == null){
        return "../../assets/404.jpg";

      }
      return `https://image.tmdb.org/t/p/w154${item.profile_path}`

    }

    if(item.poster_path == null)
      return "../../assets/404.jpg";
    else 
      return `https://image.tmdb.org/t/p/w154${item.poster_path}`

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScroll() {
    if (this.actualPage <= this.finishPage) {
      this.search.testSerach(this.sm ,this.actualPage+1).subscribe(res=>{
        this.finishPage=res.total_pages
        this.actualPage=res.page
        this.additems(res)
        // console.log(this.sm)
        // console.log(this.items)
        
      })
      
    }if(this.actualPage == this.finishPage){
      console.log('No hay mas Paginas')
    }
  }
  
  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  additems(res){
    res.results.map(
    item=>this.items.push(item)
    )
  }
}
