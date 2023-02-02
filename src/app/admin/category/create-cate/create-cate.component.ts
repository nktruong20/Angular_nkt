import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-create-cate',
  templateUrl: './create-cate.component.html',
  styleUrls: ['./create-cate.component.css']
})
export class CreateCateComponent implements OnInit {
  formCreate =  new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    status: new FormControl(0,[
      Validators.pattern('[0,1]{1}'),
      Validators.required
    ])
  })

  constructor(private cateSer: CategoryService, private router: Router) { }
 
  ngOnInit(): void {
    this.form.status.setValue('0');
  }
  createCate(){
    this.cateSer.getAll().subscribe((data: any) => {
      let myCat = data.categories.find((item: any) => {
        return this.form.name.value === item.name;
      })
      if (myCat == null) {
        this.cateSer.create(this.formCreate.value).subscribe(() => {
          this.router.navigate(['/admin/category']);
        });
      } else {
        let nameDuplicate = document.getElementById('nameDuplicate') as HTMLDivElement | null;
        nameDuplicate?.classList.remove('d-none');
      }
    })
  }
  get form():any{
    return this.formCreate.controls;
  }
}
