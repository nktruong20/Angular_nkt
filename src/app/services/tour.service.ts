import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API = "http://localhost:3000/api";
@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }
  getAll(accountId:any = null){
    if(accountId){
      return this.http.get(`${API}/tour?favor=${accountId}`);
    }else{
      return this.http.get(`${API}/tour`);
    }
  }
  getByCate(cate_id:any, accountId:any = null){
    if(accountId){
      
      return this.http.get(`${API}/tourByCategory/${cate_id}?favor=${accountId})`);
    }else{
      return this.http.get(`${API}/tourByCategory/${cate_id}`);
    }
  }
  search(keyword:string, accountId:any = null){
    if(accountId){
      return this.http.get(`${API}/tour/${keyword}?favor=${accountId})`);
    }else{
      return this.http.get(`${API}/tour/${keyword}`)
    }
    
  }
  orderBy(column:string, orderBy:string){
    return this.http.get(`${API}/new-tour`);
  }
  getNew(){
    return this.http.get(`${API}/new-tour`);
  }
  getSale(){
    return this.http.get(`${API}/sale-tour`);
  }
  getItem(id:number){
    return this.http.get(`${API}/tour/${id}`);
  }
  create(data:any){
    return this.http.post(`${API}/tour`,data)
  }
  upload(file: any) {
    const formData: FormData = new FormData();
    formData.append('image', file);
    return this.http.post(`${API}/upload`, formData);
  }
  update(data:any, id:number){
    return this.http.put(`${API}/tour/${id}`,data)
  }
  delete(id:any){
    return this.http.delete(`${API}/tour/${id}`)
  }
  
}
