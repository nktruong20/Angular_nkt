import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const API = "http://localhost:3000/api";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(`${API}/account`);
  }
  getItem(id:any){
    return this.http.get(`${API}/account/${id}`);
  }
  login(data:any){
    return this.http.post(`${API}/account/login`,data);
  }
  create(data:any){
    return this.http.post(`${API}/account`,data)
  }
  update(data:any, id:number){
    return this.http.put(`${API}/account/${id}`,data)
  }
  delete(id:any){
    return this.http.delete(`${API}/account/${id}`)
  }
}
