import { TourService } from './../../../services/tour.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {
  currentFile:any;
  cateId:any;
  formCreate =  new FormGroup({
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
  imageCreate:any;
  categories:any = []
  constructor(private cateSer: CategoryService, private tourSer: TourService  ,private router: Router) { }
 
  ngOnInit(): void {
    this.getCategories();
    this.form.status.setValue('0');
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
      this.form.image.value = file[0].name;
      this.imageCreate = reader.result;
    }
    this.currentFile = event.target.files[0];
    
  }
  getCategory(value:any){
    this.cateId = parseInt(value);
  }
  create(){
    let data = this.formCreate.value;
    this.tourSer.upload(this.currentFile).subscribe((res: any) => {
      let file_name: any = res.result;
      data.image = file_name;
      data.category_id = this.cateId;
      this.tourSer.create(data).subscribe((data) => {
          this.router.navigate(['/admin/tour'])
      })
    })
  }
  get form():any{
    return this.formCreate.controls;
  }

}
