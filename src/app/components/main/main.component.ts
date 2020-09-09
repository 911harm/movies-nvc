import { Component,HostListener, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[SearchService]
})
export class MainComponent implements OnInit {
  public items 
  public sm:string
  public typeE:boolean
  public btnS:boolean
  public p:number
  constructor(
    private search:SearchService
  ) { 
    this.items=[]
    this.p=1
  //
  }


  onChange(event) {
    this.inputValidator(event)//evitamos caracteres especiales
    this.sm=event.target.value
    if(event.target.value.length<=1){
      this.sm="game"
      this.search.testSerach(this.sm,this.p).subscribe(
        res=>{
        this.items=res.results},
        err=>{
          console.log(`Error: ${err}`)
          this.typeE=true
      })
    }
    else{
        this.search.testSerach(event.target.value,this.p).subscribe(
          res=>{
            // console.log(res.results[0].name,res.results[0].vote_average)
            // aqui podia sacar el rating, no vi fue los actores tocaria en otra req 
          this.items=res.results
          },

          err=>{console.log(`Error: ${err}`)
          this.typeE=true} );
        }//fin del else
  }//fin de onchange


//Funcion para validar y sacar los simbolos
  inputValidator(event: any) {
    const pattern = /^[a-zA-Z0-9]*$/;   
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // invalid character, prevent input

    }
  }//fin de funcion para evitar los simbolos


  //hacemos el toogle de la busqueda de manera sencilla
  btnSearch(){
    this.btnS=!this.btnS
  }


  //evento inicial 
  ngOnInit() {
    this.btnS=false
    this.typeE=false
    this.sm="game"
    this.search.testSerach(this.sm,this.p).subscribe(
      res=>{
      this.items=res.results
      },
      err=>{
        console.log(`Error: ${err}`)
        this.typeE=true
    }
    );
  }
  

}