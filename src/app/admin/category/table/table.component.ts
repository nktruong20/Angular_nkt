import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  listCate: any;
  constructor(private cateSer: CategoryService) { }

  ngOnInit(): void {
    this.getCate();
  }
  getCate(){
    this.cateSer.getAll().subscribe((cate:any) => {
      this.listCate = cate.categories;
    })
  }
  delete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.cateSer.delete(id).subscribe(()=>{
          this.getCate();
        });
      }
    })
  }
}
