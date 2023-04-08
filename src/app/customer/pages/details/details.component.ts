import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  tour:any;

  constructor(private actRoute: ActivatedRoute, private tourSer: TourService) { }

  ngOnInit(): void {
    this.getItem();
  }
  getItem(){
    let id = this.actRoute.snapshot.params['id'];
    this.tourSer.getItem(id).subscribe((item:any) => {
      this.tour = item.tours[0];
      console.log(id);
    })
  }

}
