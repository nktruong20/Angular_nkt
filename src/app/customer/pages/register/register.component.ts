import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  term:boolean = true;
  formCreate =  new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    email: new FormControl('',[
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
    role: new FormControl('customer')
  })
  duplicateEmail:any;
  constructor(private accSer: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  create(){
    console.log(this.formCreate.value);
    this.accSer.create(this.formCreate.value).subscribe((data:any)=>{
      this.accSer.getAll().subscribe((item:any)=>{
      })
      if(data.err){
        this.duplicateEmail = 'Địa chỉ email của bạn đã tồn tại';
        return
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your account has been created',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/login']);
      }
     
      
    })
  }
  get form():any{
    return this.formCreate.controls;
  }
}
