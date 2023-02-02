import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { TourService } from './../../../services/tour.service';
import { FavoriteService } from './../../../services/favorite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allTour:any;
  acc_login:any;
  favorObject:any;
  keyword:any;
  allCate:any;
  idHeader:any;
  constructor( private router: Router ,private favorSer: FavoriteService, private tourSer: TourService, private cateSer: CategoryService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStart();
    this.favorSer.totalFavor.subscribe((data:any) => {
      this.getStart();
    })
  }
  getStart(){
    let id = this.actRoute.snapshot.params['id'];
    this.idHeader = id;
    this.acc_login = sessionStorage.getItem('acc_login');
    this.acc_login = JSON.parse(this.acc_login);
    
    if(id){
      if(this.acc_login){
        this.tourSer.getByCate(id, this.acc_login.id).subscribe((data:any)=>{
          this.allTour = data.tours;
        })
      }else{
        this.tourSer.getByCate(id).subscribe((data:any)=>{
          this.allTour = data.tours;
        })
      }
    }else{
      if(this.acc_login){
        this.tourSer.getAll(this.acc_login.id).subscribe((data:any)=>{
          this.allTour = data.tours;
        })
      }else{
        this.tourSer.getAll().subscribe((data:any)=>{
          this.allTour = data.tours;
        })
      }
    }
    this.getAllCate();
  }
  getAllCate(){
    this.cateSer.getAll().subscribe((data:any)=>{
      this.allCate = data.categories;
    })
  }
  getAllTour(favor:any = null): void {
    this.tourSer.getAll(favor).subscribe((allTour:any) => {
      this.allTour = allTour.tours;
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
    })
  }
  deleteFavorite(tour_id:number){
    this.favorSer.delete(tour_id,this.acc_login.id).subscribe(() =>{
      if(this.acc_login){
        this.getAllTour(this.acc_login.id);
      }else{
        this.getAllTour();
      }
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorSer.totalFavor.next(data);
      })
    })
  }
  search(){
    if(!this.acc_login){
      this.tourSer.search(this.keyword).subscribe((data:any)=>{
        this.allTour = data.tours;
      });
    }else{
      this.tourSer.search(this.keyword, this.acc_login.id).subscribe((data:any)=>{
        this.allTour = data.tours;
      });
    }
    
  }
  getListTourByCategory(value:any){
    if(value == 'all'){
        this.router.navigate([`/list`])
    }else{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.getStart();
        this.router.navigate([`/list/${value}`])
      });
    }
  }
}
