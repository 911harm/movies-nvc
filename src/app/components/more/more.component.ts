import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  providers:[SearchService]
})
export class MoreComponent implements OnInit {
    public ID
    public titleTV: string
    public posterTV: string
    public imgPoster: string
    public seriesTV: number
    public seasonSelect: number
    public episodesS
    //cuando te das cuenta que debias hacer modelos desde el princio XD!
  constructor(
    private search:SearchService,
    private route:ActivatedRoute
  ) {
    
   }

  ngOnInit(){
    this.ID = this.route.snapshot.params['id'];
    this.seasonSelect=1
    // console.log(this.ID)
    // console.log(this.seasonSelect)
    
    this.search.tvMore(this.ID).subscribe(
      (res)=>{
        //  console.log(res)
        
        this.titleTV=res.name
        this.posterTV=res.poster_path
        this.seriesTV=res.seasons
        this.imgPoster=this.imageUrl(this.posterTV)
      },
      err=>{
        this.titleTV='404'
        console.log('Error:No es serie o 404 POC por ahora solo para series')
        this.imgPoster='https://raw.githubusercontent.com/911harm/movies-nvc/master/src/assets/404pelicula.jpg'
      }
    )
    this.getEpisodes()

  }

  getEpisodes(){
    this.search.tvMoreSeason(this.ID,this.seasonSelect).subscribe(res=>{
      // console.log(res.episodes)
      this.episodesS=res.episodes
    })
  }

  SeasonSelec(season){
    this.seasonSelect=season.season_number
    this.getEpisodes()

  }
  imageUrl(item){
    
    if(item == null){
      return "https://raw.githubusercontent.com/911harm/movies-nvc/master/src/assets/404.jpg";
    }

    return `https://image.tmdb.org/t/p/w500/${item}`

  }

}
