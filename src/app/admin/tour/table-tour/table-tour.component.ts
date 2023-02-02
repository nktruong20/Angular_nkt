import Swal from 'sweetalert2';
import { TourService } from './../../../services/tour.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-tour',
  templateUrl: './table-tour.component.html',
  styleUrls: ['./table-tour.component.css']
})
export class TableTourComponent implements OnInit {
  tours:any;
  constructor(private tourSer: TourService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.tourSer.getAll().subscribe((tours:any) => {
      this.tours = tours.tours;
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
        this.tourSer.delete(id).subscribe(()=>{
          this.getAll();
        });
      }
    })
  }
}
