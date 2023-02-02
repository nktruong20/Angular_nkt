import { FavoriteService } from './../../../services/favorite.service';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: any;
  acc_login: any;
  constructor(private cateSer: CategoryService, private accountSer: AccountService, private router: Router, private favorSer: FavoriteService) { }
  categories:any;
  favorties:any;
  favorTotal:number = 0;
  totalFavor?:number;
  ngOnInit(): void {
    this.acc_login = sessionStorage.getItem('acc_login');
    this.acc_login = JSON.parse(this.acc_login);
    
    this.accountSer.isUserLoggedIn.subscribe((value:boolean) =>{
      this.isUserLoggedIn = value;
      this.acc_login = sessionStorage.getItem('acc_login');
      this.acc_login = JSON.parse(this.acc_login);
    })
    this.favorSer.totalFavor.subscribe((data:any) => {
      this.totalFavor = data.favorites.length;
      this.favorties = data.favorites;
    })

    if(this.acc_login){
      this.accountSer.isUserLoggedIn.next(true);
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorties = data.favorites;
        this.favorSer.totalFavor.next(data);
      })
    }
    this.cateSer.getAll().subscribe((categories:any) => {
      this.categories = categories.categories; 
    })
  }
  logout(){
    sessionStorage.removeItem('acc_login');
    this.router.navigate(['/login']);
  }
  deleteFavorite(tour_id:number){
    this.favorSer.delete(tour_id,this.acc_login.id).subscribe(() =>{
      this.favorSer.getAllByAccId(this.acc_login.id).subscribe((data:any)=>{
        this.favorSer.totalFavor.next(data);
      })
    })
  }
}
