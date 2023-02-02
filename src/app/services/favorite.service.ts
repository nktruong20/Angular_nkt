import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const API = "http://localhost:3000/api";
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  totalFavor =  new Subject;
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(`${API}/favorite`);
  }
  getAllByAccId(accId:any){
    return this.http.get(`${API}/favorite?account_id=${accId}`);
  }
  create(data:any){
    return this.http.post(`${API}/favorite`,data)
  }
  update(data:any, id:number){
    return this.http.put(`${API}/favorite/${id}`,data)
  }
  checkTour(tour_id:any, acc_id:any){
    return this.http.get(`${API}/favorite/check?tour_id=${tour_id}&account_id=${acc_id}`)
  }
  delete(tour_id:any, acc_id:any){
    return this.http.delete(`${API}/favorite/delete?tour_id=${tour_id}&account_id=${acc_id}`)
  }
}
