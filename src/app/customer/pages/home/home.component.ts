import { FavoriteService } from './../../../services/favorite.service';
import { TourService } from './../../../services/tour.service';
import { Component, OnInit } from '@angular/core';
// import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allTour:any;
  constructor(private tourSer: TourService, private favorSer: FavoriteService) { }
  saleTour:any;
  newTour:any;
  acc_login:any;
  favorObject:any;
  ngOnInit(): void {
    this.acc_login = sessionStorage.getItem('acc_login');
    this.acc_login = JSON.parse(this.acc_login);
    if(this.acc_login){
      this.getAllTour(this.acc_login.id);
    }else{
      this.getAllTour();
    }
    this.getNewTour();
    this.getSaleTour(); 
    this.favorSer.totalFavor.subscribe((data:any) => {
      if(this.acc_login){
        this.getAllTour(this.acc_login.id);
      }else{
        this.getAllTour();
      }
    })
  }
  
 
  getAllTour(favor:any = null): void {
    this.tourSer.getAll(favor).subscribe((allTour:any) => {
      this.allTour = allTour.tours;
    })
  }
  getNewTour(): void {
    this.tourSer.getNew().subscribe((allTour:any) => {
      this.newTour = allTour.tours;
    })
  }
  getSaleTour(): void {
    this.tourSer.getSale().subscribe((allTour:any) => {
      this.saleTour = allTour.tours;
    })
  }
  addFavorite(tour_id:number){
    this.favorObject = {
      account_id: this.acc_login.id,
      tour_id: tour_id
    }
    this.favorSer.create(this.favorObject).subscribe(() =>{
      if(this.acc_login){
        this.getAllTour(this.acc_login.id);
      }else{
        this.getAllTour();
      }
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorSer.totalFavor.next(data);
      })
      this.getNewTour();
      this.getSaleTour(); 
    })
  }
  deleteFavorite(tour_id:number){
    this.favorSer.delete(tour_id,this.acc_login.id).subscribe((data:any) =>{
      
      if(this.acc_login){
        this.getAllTour(this.acc_login.id);
      }else{
        this.getAllTour();
      }
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorSer.totalFavor.next(data);
      })
      this.getNewTour();
      this.getSaleTour(); 
    })
  }
}
