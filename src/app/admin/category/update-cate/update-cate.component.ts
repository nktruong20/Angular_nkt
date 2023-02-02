import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-cate',
  templateUrl: './update-cate.component.html',
  styleUrls: ['./update-cate.component.css']
})
export class UpdateCateComponent implements OnInit {
  formUpdate =  new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    status: new FormControl('',[
      Validators.pattern('[0,1]{1}'),
      Validators.required
    ])
  })
  constructor(private cateSer: CategoryService, private router: Router, private actRoute: ActivatedRoute) { }
 
  ngOnInit(): void {
    var id = this.actRoute.snapshot.params['id'];
    this.cateSer.getItem(id).subscribe((data:any)=>{
      this.formUpdate.patchValue(data.categories[0])
      this.formUpdate.patchValue({status:`${this.form.status.value}`});
    })
    
  }
  updateCate(){
    var id = this.actRoute.snapshot.params['id'];
    this.cateSer.update(this.formUpdate.value, id).subscribe((data:any) => {
      this.router.navigate(['/admin/category']);
    });
  }
  get form():any{
    return this.formUpdate.controls;
  }

}
