import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API = "http://localhost:3000/api";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(`${API}/category`);
  }
  getItem(id:any){
    return this.http.get(`${API}/category/${id}`);
  }
  create(data:any){
    return this.http.post(`${API}/category`,data)
  }
  update(data:any, id:number){
    return this.http.put(`${API}/category/${id}`,data)
  }
  delete(id:any){
    return this.http.delete(`${API}/category/${id}`)
  }
}
