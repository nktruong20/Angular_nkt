import { FavoriteService } from './../../../services/favorite.service';
import { TourService } from './../../../services/tour.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tour:any;
  acc_login:any;
  favorObject:any;
  checkFavor:any = false;
  constructor(private actRoute: ActivatedRoute, private tourSer: TourService, private favorSer: FavoriteService) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.params['id'];
    this.acc_login = sessionStorage.getItem('acc_login');
    this.acc_login = JSON.parse(this.acc_login);
    this.getItem();
    this.favorSer.checkTour(id, this.acc_login.id).subscribe((data:any)=>{
      if(data.favorites){
        this.checkFavor = true;
      }
    })
  }
  getItem(){
    let id = this.actRoute.snapshot.params['id'];
    this.tourSer.getItem(id).subscribe((item:any) => {
      this.tour = item.tours[0];
      console.log(id);
    })
  }
  addFavorite(tour_id:number){
    this.favorObject = {
      account_id: this.acc_login.id,
      tour_id: tour_id
    }
   
    this.favorSer.create(this.favorObject).subscribe(() =>{
      this.checkFavor = true;
      this.getItem();
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorSer.totalFavor.next(data);
      })
    })
    
  }
  deleteFavorite(tour_id:number){
    this.favorSer.delete(tour_id,this.acc_login.id).subscribe(() =>{
      this.checkFavor = false;
      this.getItem();
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorSer.totalFavor.next(data);
      })
    })
  }
}
