import { Router, ActivatedRoute } from '@angular/router';
import { TourService } from './../../../services/tour.service';
import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-tour',
  templateUrl: './update-tour.component.html',
  styleUrls: ['./update-tour.component.css']
})
export class UpdateTourComponent implements OnInit {

  formUpdate =  new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    status: new FormControl(0,[
      Validators.pattern('[0,1]{1}'),
      Validators.required
    ]),
    price: new FormControl('',[
      Validators.required,
    ]),
    sale_price: new FormControl('',[
      Validators.required,
    ]),
    description: new FormControl('',[
      Validators.required,
    ]),
    category_id: new FormControl('',[
      Validators.required,
    ]),
    image: new FormControl('',[
      Validators.required,
    ])
  })
  categories:any = [];
  imageCreate:any;
  constructor(private cateSer: CategoryService, private tourSer: TourService  ,private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getCategories();
    var id = this.actRoute.snapshot.params['id'];
    this.tourSer.getItem(id).subscribe((data:any)=>{
      this.formUpdate.patchValue(data.categories[0])
      this.formUpdate.patchValue({status:this.form.status.value});
    })
  }
  getCategories(){
    this.cateSer.getAll().subscribe((categories:any)=>{
      this.categories = categories.categories;
    })
  }
  changeImage(event:any){
    const reader = new FileReader();
    const file = event.target.files;
    reader.readAsDataURL(file[0]);
    reader.onload = ()=>{
      this.form.image.value = file.name;
      this.imageCreate = reader.result;
    }
  }
  update(){
    
  }
  get form():any{
    return this.formUpdate.controls;
  }
}
